import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";
import type { ReactNode } from "react"; 
import { getMisMetas } from "../service/MetaService";
import type { Meta } from "../modelos/Meta";

interface MetaState {
  metas: Meta[];
  loading: boolean;
  error: string | null;
}

type MetaAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Meta[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_META"; payload: Meta }
  | { type: "UPDATE_META"; payload: Meta }
  | { type: "DELETE_META"; payload: number };

const initialState: MetaState = {
  metas: [],
  loading: true,
  error: null,
};

function metasReducer(state: MetaState, action: MetaAction): MetaState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true };

    case "FETCH_SUCCESS":
      return { ...state, loading: false, metas: action.payload };

    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };

    case "ADD_META":
      return { ...state, metas: [...state.metas, action.payload] };

    case "UPDATE_META":
      return {
        ...state,
        metas: state.metas.map((m) =>
          m.idMeta === action.payload.idMeta ? action.payload : m
        ),
      };

    case "DELETE_META":
      return {
        ...state,
        metas: state.metas.filter((m) => m.idMeta !== action.payload),
      };

    default:
      return state;
  }
}

interface MetasContextType {
  state: MetaState;
  reloadMetas: () => Promise<void>;
  addMeta: (meta: Meta) => void;
}

const MetasContext = createContext<MetasContextType | undefined>(undefined);

export const MetasProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(metasReducer, initialState);

  const reloadMetas = async () => {
    dispatch({ type: "FETCH_START" });
    try {
      const data = await getMisMetas();
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err: any) {
      dispatch({
        type: "FETCH_ERROR",
        payload: err.message ?? "Error desconocido",
      });
    }
  };

  const addMeta = (meta: Meta) => {
    dispatch({ type: "ADD_META", payload: meta });
  };

  useEffect(() => {
    reloadMetas();
  }, []);

  return (
    <MetasContext.Provider
      value={{
        state,
        reloadMetas,
        addMeta,
      }}
    >
      {children}
    </MetasContext.Provider>
  );
};

export const useMetasContext = () => {
  const ctx = useContext(MetasContext);
  if (!ctx) throw new Error("useMetasContext debe usarse dentro de MetasProvider");
  return ctx;
};
