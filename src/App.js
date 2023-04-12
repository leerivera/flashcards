import { Route, Routes, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FlashcardManager from './components/FlashcardManager';
import CreateFlashcard from './components/CreateFlashcard';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/cards">Flashcard Manager</Link>
        <Link to="/create">Create Flashcard</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cards" element={<FlashcardManager />} />
        <Route path="/create" element={<CreateFlashcard />} />
      </Routes>
    </div>
  );
}

export default App;



