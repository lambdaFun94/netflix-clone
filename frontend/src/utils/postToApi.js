import axios from "axios";

const postRequestToAPI = (API_ENDPOINT) => async (
  { ...requestBody },
  { rejectWithValue }
) => {
  try {
    const { data } = await axios.post(API_ENDPOINT, {
      ...requestBody,
    });
    return data;
  } catch (err) {
    return rejectWithValue(err);
  }
};
export default postRequestToAPI;
