import useErrorContext from "../context/useErrorContext";

const errorStyle = {
  color: "red",
  background: "lightgrey",
  fontSize: "20px",
  borderStyle: "solid",
  borderRadius: "5px",
  padding: "10px",
  marginBottom: "10px",
};

const MessageArea = () => {
  const { errorMessage } = useErrorContext;

  if (!errorMessage) return null;

  return <h4 style={errorStyle}>{errorMessage}</h4>;
};

export default MessageArea;
