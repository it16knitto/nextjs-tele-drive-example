import {
  useState,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode
} from 'react';

type GlobalStateType = {
  selectedChat: any;
  setSelectedChat: Dispatch<SetStateAction<any>>;
};

const GlobalStateContext = createContext<GlobalStateType | undefined>(
  undefined
);

interface GlobalStateProviderProps {
  children: ReactNode;
}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({
  children
}) => {
  const [selectedChat, setSelectedChat] = useState<any>(null);

  return (
    <GlobalStateContext.Provider value={{ selectedChat, setSelectedChat }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = <K extends keyof GlobalStateType>(
  key: K
): [GlobalStateType[K], Dispatch<SetStateAction<GlobalStateType[K]>>] => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    return [null, () => {}];
  }
  return [
    context[key],
    context[
      `set${
        key.charAt(0).toUpperCase() + key.slice(1)
      }` as keyof GlobalStateType
    ] as Dispatch<SetStateAction<GlobalStateType[K]>>
  ];
};
