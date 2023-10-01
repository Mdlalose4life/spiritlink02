import './App.css';
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Chat from './pages/Chat';
import Login from './pages/Login';
import { UserProvider } from './UserContext';
import { ChatProvider } from './ChatContext';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <ChatProvider>
        <Navigation />
          <Routes>
            <Route path="/" element={<Home />} />          
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/chat" element={<Chat />} />
            </Routes>
      </ChatProvider>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;
