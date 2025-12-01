import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  type ReactNode,
} from "react";

import {
  listarTransaccionesUsuario,
  listarTransaccionesPorMeta,
  crearTransaccion,
  actualizarTransaccion,
  eliminarTransaccion,
} from "../service/TransaccionesService";

import type { Transaccion } from "../modelos/Transaccion";
import type { CrearTransaccionDTO } from "../dto/CrearTransaccionDTO";
import type { EditarTransaccionDTO } from "../dto/EditarTransaccionDTO";


interface State {
  transacciones: Transaccion[];
  loading: boolean;
  error: string | null;

  selectedMetaId: number | null;
  selectedMetaName: string | null;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Transaccion[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "SET_META"; id: number | null; name: string | null }
  | { type: "ADD"; payload: Transaccion }
  | { type: "UPDATE"; payload: Transaccion }
  | { type: "DELETE"; id: number };


const initialState: State = {
  transacciones: [],
  loading: true,
  error: null,
  selectedMetaId: null,
  selectedMetaName: null,
};


function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, transacciones: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "SET_META":
      return {
        ...state,
        selectedMetaId: action.id,
        selectedMetaName: action.name,
      };

    case "ADD":
      return {
        ...state,
        transacciones: [...state.transacciones, action.payload],
      };

    case "UPDATE":
      return {
        ...state,
        transacciones: state.transacciones.map((t) =>
          t.idTransaccion === action.payload.idTransaccion ? action.payload : t
        ),
      };

    case "DELETE":
      return {
        ...state,
        transacciones: state.transacciones.filter(
          (t) => t.idTransaccion !== action.id
        ),
      };

    default:
      return state;
  }
}


const TransaccionesContext = createContext<{
  state: State;
  selectMeta: (idMeta: number | null, name: string | null) => void;
  addTransaccion: (dto: CrearTransaccionDTO) => Promise<void>;
  updateTransaccion: (id: number, dto: EditarTransaccionDTO) => Promise<void>;
  removeTransaccion: (id: number) => Promise<void>;
} | null>(null);


export const TransaccionesProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadAll = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const data = await listarTransaccionesUsuario();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      console.log("📌 Transacciones (todas):", data);
    } catch (e: any) {
      dispatch({ type: "FETCH_ERROR", payload: e.message });
    }
  };

  const loadByMeta = async (idMeta: number) => {
    dispatch({ type: "FETCH_START" });

    try {
      const data = await listarTransaccionesPorMeta(idMeta);
      dispatch({ type: "FETCH_SUCCESS", payload: data });
      console.log("📌 Transacciones por meta:", idMeta, data);
    } catch (e: any) {
      dispatch({ type: "FETCH_ERROR", payload: e.message });
    }
  };

  const selectMeta = (idMeta: number | null, name: string | null) => {
    dispatch({ type: "SET_META", id: idMeta, name });

    if (idMeta === null) loadAll();
    else loadByMeta(idMeta);
  };

  const addTransaccion = async (dto: CrearTransaccionDTO) => {
    const nueva = await crearTransaccion(dto);
    dispatch({ type: "ADD", payload: nueva });
  };

  const updateTransaccion = async (id: number, dto: EditarTransaccionDTO) => {
    const updated = await actualizarTransaccion(id, dto);
    dispatch({ type: "UPDATE", payload: updated });
  };

  const removeTransaccion = async (id: number) => {
    await eliminarTransaccion(id);
    dispatch({ type: "DELETE", id });
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <TransaccionesContext.Provider
      value={{
        state,
        selectMeta,
        addTransaccion,
        updateTransaccion,
        removeTransaccion,
      }}
    >
      {children}
    </TransaccionesContext.Provider>
  );
};


export const useTransaccionesContext = () => {
  const ctx = useContext(TransaccionesContext);
  if (!ctx) throw new Error("TransaccionesProvider faltante");
  return ctx;
};
