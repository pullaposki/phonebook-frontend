import { useState } from "react";
import { ErrorContext } from "./ErrorContext";

export const ErrorProvider = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
};
