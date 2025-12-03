import React, { createContext, useContext, useReducer, useEffect } from "react";
import { obtenerUltimoTrofeo, obtenerMisTrofeos } from "../service/TrofeosService";
import type { Trofeo } from "../modelos/Trofeos";


interface UltimoTrofeo {
  nombre: string;
  xp: number;
  fecha: string;
}

interface State {
  trofeos: Trofeo[];
  ultimoTrofeo: UltimoTrofeo | null;
  loading: boolean;
}

const initialState: State = {
  trofeos: [],
  ultimoTrofeo: null,
  loading: true,
};

type Action =
  | { type: "SET_TROFEOS"; payload: Trofeo[] }
  | { type: "SET_ULTIMO_TROFEO"; payload: UltimoTrofeo | null }
  | { type: "SET_LOADING"; payload: boolean };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TROFEOS":
      return { ...state, trofeos: action.payload };

    case "SET_ULTIMO_TROFEO":
      return { ...state, ultimoTrofeo: action.payload };

    case "SET_LOADING":
      return { ...state, loading: action.payload };

    default:
      return state;
  }
}

const TrofeosContext = createContext<any>(null);

export const TrofeosProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const cargarTrofeos = async () => {
    dispatch({ type: "SET_LOADING", payload: true });

    try {
      const lista = await obtenerMisTrofeos();
      dispatch({ type: "SET_TROFEOS", payload: lista });

      const ultimo = await obtenerUltimoTrofeo();
      dispatch({ type: "SET_ULTIMO_TROFEO", payload: ultimo });

    } catch (e) {
      console.error("Error cargando trofeos", e);
    }

    dispatch({ type: "SET_LOADING", payload: false });
  };

  useEffect(() => {
    cargarTrofeos();
  }, []);

  return (
    <TrofeosContext.Provider value={{ state }}>
      {children}
    </TrofeosContext.Provider>
  );
};

export const useTrofeos = () => useContext(TrofeosContext);
