import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { TodoList } from "./components/TodoList";
import { Record } from "./components/TempSubmit";
import { RecordList } from "./components/Record";
import "./App.css";

function App() {
  return (
    <>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div> */}
      <BrowserRouter>
        <nav>
          <ul>
            <li>
              <Link to="/">Todo List</Link>
            </li>
            <li>
              <Link to="/record">Record</Link>
            </li>
            <li>
              <Link to="/record/list">Record List</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<TodoList />} />
          <Route path="/record" element={<Record />} />
          <Route path="/record/list" element={<RecordList />} />
        </Routes>
      </BrowserRouter>
      {/* <TodoList />
      <Record /> */}
    </>
  );
}

export default App;
