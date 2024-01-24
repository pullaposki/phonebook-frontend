import { useContext } from "react";
import { ErrorContext } from "./ErrorContext";

export default function useErrorContext() {
  const context = useContext(ErrorContext);

  if (!context) {
    throw new Error("useErrorContext must be used within a ErrorProvider");
  }

  return context;
}
