/*
 * Data written to rawData.js will require manual manipulation
 * before processing by processData.js.
 *
 */

import axios from "axios";
import fs from "fs";

// Thanks to Karl Hadwen @ https://github.com/karlhadwen
const URL =
  "https://raw.githubusercontent.com/karlhadwen/netflix/master/src/seed.js";

const fetchAndWriteData = async (URL) => {
  const { data } = await axios.get(URL);
  // fs.writeFileSync("./rawData.js", data);
};

fetchAndWriteData(URL);
