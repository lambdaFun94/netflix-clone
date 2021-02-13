import { rawString } from "./rawData.js";
import fs from "fs";

const seriesRe = /firebase.firestore\(\)\.collection\('series'\)\.add\(\{/g;
const filmsRe = /firebase.firestore\(\)\.collection\('films'\)\.add\(\{/g;

const processData = (rawString, outputFileName) => {
  const film = "{type: 'film',";
  const series = "{type: 'series',";
  const nothing = "";
  const parensRe = /\)\;/g;
  const comma = ",";
  const UUID = /id:\ getUUID\(\),/g;

  const cleansedString = rawString
    .replace(seriesRe, series)
    .replace(filmsRe, film)
    .replace(parensRe, comma)
    .replace(UUID, nothing);

  const stringAsExport = `export const ${outputFileName} = [ ${cleansedString} ]`;

  fs.writeFileSync(`../${outputFileName}.js`, stringAsExport);
};

processData(rawString, "dataForSeeding");
