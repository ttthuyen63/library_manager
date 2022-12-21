import axios from "axios";

//config cho tất cả api
export const customAxios = axios.create({
  baseURL: "https://635a75b46f97ae73a62d386d.mockapi.io",
  timeout: 10000, //nếu quá 10s không có phản hồi thì api lỗi luôn
  //   hearders: { "X-Custom-Header": "foobar" },
});
