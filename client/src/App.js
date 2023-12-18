import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { UserProvider } from './components/User/UserStates/UserContext';
import { ChatProvider } from './components/Chats/ChatStates/ChatContext';
import Home from './components/Home/Home';
import Signup from './components/User/UserSignup/Signup';
import Chat from './components/Chats/Chat';
import Login from './components/User/UserLogin/Login';
import Sidebar from './components/Chats/ChatSidebar/Sidebar';

function App() {
  return (
  <BrowserRouter>
    <UserProvider>
      <ChatProvider>
          <Routes>
            <Route path="/" element={<Home />} />          
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/Chat" element={<Chat />} />
            <Route path="/Sidebar" element={<Sidebar/>} />  
          </Routes>
      </ChatProvider>
    </UserProvider>
  </BrowserRouter>
  );
}

export default App;
