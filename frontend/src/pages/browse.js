import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFilms } from "../redux/slices/filmSlice";
import BrowseContainer from "../containers/browse";
import sortIntoCategories from "../utils/generateGenreList";

export default function Browse() {
  const allFilms = useSelector((state) => state.films.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilms());
  }, []);

  const films = allFilms && allFilms.filter((datum) => datum.type === "film");
  const series =
    allFilms && allFilms.filter((datum) => datum.type === "series");

  const arr = sortIntoCategories(series, films);

  return <>{JSON.stringify(arr)}</>;
}
