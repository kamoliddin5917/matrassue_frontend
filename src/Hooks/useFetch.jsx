import { useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";
import port from '../assets/config'

function useFetch(param) {
  const [message, setMessage] = useState(null);
  const [method, setMethod] = useState(null);
  const [body, setBody] = useState(null);
  const [token] = useAuth(true);
  
  useEffect(() => {
    async function getData() {
      try {
        if (param && body && method) {
          const responsive = await fetch(`${port.url}${param}`, {
            method: method,
            headers: {
              "Content-Type": "application/json",
              token: token,
            },
            body: JSON.stringify(body),
          });
          const message = await responsive.json();
          setMessage(message);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getData();
  }, [param, body, method, token]);

  return { message, setBody, method, setMethod };
}

export default useFetch;
