//require("dotenv").config();

const port = process.env.REACT_APP_API_SERVER_PORT;
let baseUrl = `${process.env.REACT_APP_API_SERVER_URL}`;
if (port) {
  baseUrl = `${baseUrl}:${port}`;
}
const CONFIG = {
  baseUrl: baseUrl + "/api/v1",
};

export default CONFIG;
