import React, { createContext, useContext } from 'react'
import swal from "sweetalert";

export const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {

    const showError = (message) => {
        swal({
            title: "Lỗi",
            text: message,
            icon: "error",
            button: "Close",
          });
    }

    const showSuccess = (message) => {
        swal({
            title: "Thành công",
            text: message,
            icon: "success",
            button: "Close",
          });
    }

  return (
    <ErrorContext.Provider value={{ showError, showSuccess }}>
        {children}
    </ErrorContext.Provider>
  );
}
