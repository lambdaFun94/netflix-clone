import { useState, useEffect } from "react";
import axios from "axios";

export default function Test() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/test");
      setMovies(data);
    })();
  }, []);

  return <div>{JSON.stringify(movies)}</div>;
}
