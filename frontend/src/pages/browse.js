import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import { getFilms } from "../redux/slices/filmSlice";
import BrowseContainer from "../containers/browse";
import { genTitles } from "../utils/generateGenreList";

export default function Browse() {
  const allFilms = useSelector((state) => state.films.data);
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilms(user.token));
  }, [dispatch, user]);

  let films = allFilms && allFilms.filter((datum) => datum.type === "film");
  let series = allFilms && allFilms.filter((datum) => datum.type === "series");

  films = films && { name: "films", data: genTitles(films) };
  series = series && { name: "series", data: genTitles(series) };

  return (
    <>
      <BrowseContainer series={series} films={films} />
    </>
  );
}
