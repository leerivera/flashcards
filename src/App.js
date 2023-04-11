import { Route, Switch, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import FlashcardManager from './components/FlashcardManager';

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/cards">Flashcard Manager</Link>
      </nav>

      <Switch>
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/cards" component={FlashcardManager} />
      </Switch>
    </div>
  );
}

export default App;

