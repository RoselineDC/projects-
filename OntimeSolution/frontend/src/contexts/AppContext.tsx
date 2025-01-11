import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import { useQuery } from "react-query";
import * as apiClient from "../api-client";

//
type ToastMessage = {
  message: string;
  type: "SUCCESS" | "ERROR";
};

type AppContextType = {
  showToast: (toastMessage: ToastMessage) => void;
  isLoggedIn: boolean;
};

const AppContext = React.createContext<AppContextType | undefined>(undefined);

// create provider to give componets access to context

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // DELARE STATE Object to record tost message
  const [toast, setToast] = useState<ToastMessage | undefined>(undefined);

  //   use validate token to validate token through api endpoint
  const { isError } = useQuery("validateToken", apiClient.validateToken, {
    retry: false,
  });

  return (
    <AppContext.Provider
      value={{
        showToast: (toastMessage) => {
          // change toast state whenever called
          setToast(toastMessage);
        },
        isLoggedIn: !isError,
      }}
    >
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(undefined)}
        />
      )}
      {children}
    </AppContext.Provider>
  );
};

// accept hook
export const useAppContext = () => {
  const context = useContext(AppContext);

  return context as AppContextType;
};
