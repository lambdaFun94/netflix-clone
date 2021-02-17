import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getFilms } from "../redux/slices/filmSlice";
import BrowseContainer from "../containers/browse";
import { genTitles } from "../utils/generateGenreList";

export default function Browse() {
  const allFilms = useSelector((state) => state.films.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFilms());
  }, [dispatch]);

  let films = allFilms && allFilms.filter((datum) => datum.type === "film");
  let series = allFilms && allFilms.filter((datum) => datum.type === "series");

  films = { name: "films", data: genTitles(films) };
  series = { name: "series", data: genTitles(series) };

  return (
    <>
      <BrowseContainer series={series} films={films} />
    </>
  );
}
