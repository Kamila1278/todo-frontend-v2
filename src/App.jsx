import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom';

import Home from './pages/Home';
import NewTask from './pages/NewTask';
import TaskDetails from './pages/TaskDetails';

import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <header className="navbar">
        <Link className="logo" to="/">
          ✓ TaskFlow
        </Link>

        <nav>
          <Link to="/">Басты бет</Link>
          <Link to="/new">Жаңа тапсырма</Link>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/new"
            element={<NewTask />}
          />

          <Route
            path="/tasks/:id"
            element={<TaskDetails />}
          />
        </Routes>
      </main>

      <footer>
        TaskFlow • Бақылау жұмысы • 2-нұсқа
      </footer>
    </BrowserRouter>
  );
}