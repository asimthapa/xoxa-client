import './App.css';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NotFound404Page from './pages/NotFound404Page';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/home" element={<HomePage/>} />
        <Route exact path="/chat" element={<ChatPage/>} />
        <Route path="*" element={<NotFound404Page/>} />
      </Routes>
    </Router>
  )
}

export default App;
