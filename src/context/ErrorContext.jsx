import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";

export const ErrorContext = React.createContext();

export default function ErrorProvider({ children }) {
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {}, [errorMessage]);

  return (
    <ErrorContext.Provider value={{ errorMessage, setErrorMessage }}>
      {children}
    </ErrorContext.Provider>
  );
}

ErrorProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
