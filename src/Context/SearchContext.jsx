import { createContext, useEffect, useState } from "react";
import useAuth from "../Hooks/useAuth";

const SearchContext = createContext();

function SearchProvider({ children }) {
  const [data, setData] = useState([]);
  const [dataBackup, setDataBackup] = useState([]);
  const [param, setParam] = useState("");
  const [seachedItem, setSeachedItem] = useState("");
  const [name, setName] = useState("");
  const [token] = useAuth(true);

  useEffect(() => {
    if (seachedItem.length) {
      const searchRegExp = new RegExp(seachedItem, "gi");
      const searchResult = data.filter((e) => e[name].match(searchRegExp));
      if (searchResult.length) {
        setData(searchResult);
      } else {
        setData(dataBackup);
      }
    } else {
      setData(dataBackup);
    }
  }, [dataBackup, name, seachedItem]);

  useEffect(() => {
    async function getData() {
      if (param) {
        const response = await fetch(`https://mattrassue.herokuapp.com${param}`, {
          headers: {
            token: token,
          },
        });
        const data = await response.json();
        setData(await data);
        setDataBackup(await data);
      }
    }

    getData();
  }, [param, token]);

  return (
    <SearchContext.Provider value={{ data, setParam, setSeachedItem, setName }}>
      {children}
    </SearchContext.Provider>
  );
}

export { SearchContext, SearchProvider };
