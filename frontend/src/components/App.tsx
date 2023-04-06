// import PingPong from "./game/Game"
import Chat from "./chat/Chat"
import astroman from './img/littleman.png';
import {
    BrowserRouter as Router,
    Route,
    Routes,
    Link
  } from "react-router-dom";
// import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import GameView from "./game/GameView"
import Test from "./Test"
import './App.css';
import Basic from './basic';
import NewChat from './NewChat';
import ChatRooms from './ChatRooms';
import Login from "./auth/login/Login";
import Users from "./users/users";
import Settings from "./settings/settings1";
import TwoFactorAuth from "./auth/login/TwoFactorAuth";
import Settings2 from "./settings/settings2";
import User from './users/users';

export default function App() {
    return (
        <>
        <Router>
          <header>
            <div>
              <img src={astroman} alt="little astronout"></img>
            </div>
            <p>42 SPACE-PONG</p>
          </header>
          <main>
            <Routes>
                <Route path="/"  element={<Basic />}/>
                <Route path="/gameview" element={<GameView/>}/>
                <Route path="/chatrooms" element={<ChatRooms/>}/>
                <Route path="/chat" element={<Chat/>}/>
                {/* <Route path="/newchat" element={<NewChat/>}/> */}
                <Route path="/test" element={<Test/>}/>
                <Route path="/auth" element={<Login/>}/>
                <Route path="/auth/2FA" element={<TwoFactorAuth/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/settings" element={<Settings2/>}/>
            </Routes>
            <aside>
                {/* <Login /> */}
                {/* <User /> */}
                <h3 style={{color:"white"}}>Here will put the loged in user and maybe even the active chats?</h3>
                {/* <Groupabout /> */}
            </aside>
          </main>
          <footer>
            <nav>
              <Link className="newpostlink" to="/">
                    <button className='navbutton'>Home</button>
                </Link>
              <Link className="newpostlink" to="/chatrooms">
                    <button className='navbutton'>ChatRooms</button>
              </Link>
              <Link className="newpostlink" to="/gameview">
                    <button className='navbutton'>WatchGame</button>
              </Link>
              <Link className="newpostlink" to="/users">
                    <button className='navbutton'>Users</button>
                </Link>
                <Link className="newpostlink" to="/test">
                    <button className='navbutton'>Friends</button>
                </Link>
                <Link className="newpostlink" to="/settings">
                    <button className='navbutton'>Settings</button>
                </Link>
            </nav>
          </footer>
        </Router>
      </>
    );
}
