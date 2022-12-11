import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AddBookPage from "./pages/addBookPage";
import AddBorrowPage from "./pages/addBorrowPage";
import AddReaderPage from "./pages/addReaderPage";
import BookPage from "./pages/bookPage";
import BorrowPage from "./pages/borrowPage";
import EditBookPage from "./pages/editBookPage";
import EditBorrowPage from "./pages/editBorrowPage";
import LoginPage from "./pages/loginPage";
import EditReaderPage from "./pages/editReaderPage";
import ReaderListPage from "./pages/readerListPage";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/addBook",
    element: <AddBookPage />,
  },
  {
    path: "/addBorrow",
    element: <AddBorrowPage />,
  },
  {
    path: "/addReader",
    element: <AddReaderPage />,
  },
  {
    path: "/bookList",
    element: <BookPage />,
  },
  {
    path: "/borrow",
    element: <BorrowPage />,
  },
  {
    path: "/editBook",
    element: <EditBookPage />,
  },
  {
    path: "/editBorrow",
    element: <EditBorrowPage />,
  },
  {
    path: "/editReader",
    element: <EditReaderPage />,
  },
  {
    path: "/readerList",
    element: <ReaderListPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* // <Provider store={store}> */}
    {/* // <Provider> */}
    <RouterProvider router={router} />
    {/* <App /> */}
    {/* // </Provider>, */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
