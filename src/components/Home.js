import React, { useState } from 'react';
import Player from './Player';
import { RiLogoutCircleRLine } from 'react-icons/ri';
import { MdWindow } from 'react-icons/md';

const Home = ({ onLogout }) => {
  const [active, setActive] = useState(true);

  const handleCLick = () => {
    setActive(!active);
  }

  return (
    <div className="containerStyle">
      <div className="sidebarStyle">
        <div className="sidebar">
          <div className="sidebarContent">
            <h1>LOGO</h1>
            <ul>
              <li 
              onClick={handleCLick} className="menuItem"
              style={active ? { backgroundColor: "#c2c2c2"} : {}}>
                <MdWindow />
                Songs
              </li>
            </ul>
          </div>
          <div className="logoutButtonContainer" onClick={onLogout}>
            <RiLogoutCircleRLine />
            <span>LogOut</span>
          </div>
        </div>
      </div>
      {active && (
        <div className="playerStyle">
          <Player />
        </div>
      )}
    </div>
  );
};

export default Home;
