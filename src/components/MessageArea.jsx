import { useEffect, useState } from "react";
import serverHandler from "../services/serverHandler";

const MessageArea = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    serverHandler.create().catch((error) => {
      console.log("error getting data ", error);
      setMessage("Error getting data from server");
    });
  }, []);

  return <div>{message}</div>;
};

export default MessageArea;
