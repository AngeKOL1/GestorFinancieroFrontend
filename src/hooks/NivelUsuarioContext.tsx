import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  type ReactNode,
} from "react";

import type { NivelUsuarioResponse } from "../modelos/NivelUsuarioResponse";
import { getNivelUsuario } from "../service/UsuarioService";

interface State {
  nivelActual: number;
  xpActual: number;
  xpNecesaria: number;
  xpRestante: number;
  banner: string;
  loading: boolean;
  error: string | null;
}

type Action =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: NivelUsuarioResponse }
  | { type: "FETCH_ERROR"; payload: string };

const initialState: State = {
  nivelActual: 0,
  xpActual: 0,
  xpNecesaria: 1,
  xpRestante: 0,
  banner: "",
  loading: true,
  error: null,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, ...action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
}

const NivelUsuarioContext = createContext<any>(null);

export const NivelUsuarioProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadNivel = async () => {
    dispatch({ type: "FETCH_START" });

    try {
      const data = await getNivelUsuario();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (e: any) {
      dispatch({ type: "FETCH_ERROR", payload: e.message });
    }
  };

  useEffect(() => {
    loadNivel(); 
  }, []);

  return (
    <NivelUsuarioContext.Provider value={{ state, loadNivel }}>
      {children}
    </NivelUsuarioContext.Provider>
  );
};

export const useNivelUsuario = () => {
  const ctx = useContext(NivelUsuarioContext);
  if (!ctx) throw new Error("NivelUsuarioProvider faltante");
  return ctx;
};
