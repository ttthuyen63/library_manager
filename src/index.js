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
import store from "./redux/store";
import ProtectRouter from "./components/ProtectRouter";
import BookDetail from "./pages/bookDetail";
import ReaderDetail from "./pages/readerDetail";
import BorrowDetail from "./pages/borrowDetail";

const router = createBrowserRouter([
  {
    path: "/home",
    element: (
      <ProtectRouter>
        <HomePage />,
      </ProtectRouter>
    ),
  },
  {
    path: "/addBook",
    element: (
      <ProtectRouter>
        <AddBookPage />,
      </ProtectRouter>
    ),
  },
  {
    path: "/addBorrow/:borrowId",
    element: (
      <ProtectRouter>
        <AddBorrowPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/addReader",
    element: (
      <ProtectRouter>
        <AddReaderPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/bookList",
    element: (
      <ProtectRouter>
        <BookPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/borrow",
    element: (
      <ProtectRouter>
        <BorrowPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/editBook/:bookId",
    element: (
      <ProtectRouter>
        <EditBookPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/editBorrow",
    element: (
      <ProtectRouter>
        <EditBorrowPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/editReader",
    element: (
      <ProtectRouter>
        <EditReaderPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/readerList",
    element: (
      <ProtectRouter>
        <ReaderListPage />
      </ProtectRouter>
    ),
  },
  {
    path: "/bookList/:bookId",
    element: (
      <ProtectRouter>
        <BookDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/readerList/:readId",
    element: (
      <ProtectRouter>
        <ReaderDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/borrow/:borrowId",
    element: (
      <ProtectRouter>
        <BorrowDetail />
      </ProtectRouter>
    ),
  },
  {
    path: "/",
    element: <LoginPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/* // <Provider> */}
    <RouterProvider router={router} />
    {/* <App /> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
