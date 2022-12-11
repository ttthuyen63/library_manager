import axios from "axios";

//config cho tất cả api
export const customAxios = axios.create({
  baseURL: "https://librarymanager-acdc7-default-rtdb.firebaseio.com",
  timeout: 10000, //nếu quá 10s không có phản hồi thì api lỗi luôn
  //   hearders: { "X-Custom-Header": "foobar" },
});
