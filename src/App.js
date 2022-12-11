import logo from "./logo.svg";
import "./App.css";
import { Routes, BrowserRouter, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import AddBookPage from "./pages/addBookPage";
import AddBorrowPage from "./pages/addBorrowPage";
import AddReaderPage from "./pages/addReaderPage";
import BookPage from "./pages/bookPage";
import BorrowPage from "./pages/borrowPage";
import EditBookPage from "./pages/editBookPage";
import EditBorrowPage from "./pages/editBorrowPage";
import EditReaderPage from "./pages/editReaderPage";
import ReaderListPage from "./pages/readerListPage";
import LoginPage from "./pages/loginPage";
import { Container } from "react-bootstrap";

function App() {
  return (
    <Container>
      <HomePage />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/addBook" element={<AddBookPage />} />
          <Route path="/addBorrow" element={<AddBorrowPage />} />
          <Route path="/addReader" element={<AddReaderPage />} />
          <Route path="/bookList" element={<BookPage />} />
          <Route path="/borrow" element={<BorrowPage />} />
          <Route path="/editBook" element={<EditBookPage />} />
          <Route path="/editBorrow" element={<EditBorrowPage />} />
          <Route path="/editReader" element={<EditReaderPage />} />
          <Route path="/readerList" element={<ReaderListPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
