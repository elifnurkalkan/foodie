import React from 'react';
import { GiFoodTruck } from 'react-icons/gi';
import { NavLink } from 'react-router-dom';
import './Logo.css';

function Logo() {
  return (
    <div className="logoPart">
      <NavLink style={{ textDecoration: 'none' }} to={'/'}>
        <div className="logo">
          <GiFoodTruck
            className="logoIcon"
            style={{ fontSize: '7rem', color: 'green' }}
          />
          <h2>foodie</h2>
        </div>
      </NavLink>
    </div>
  );
}

export default Logo;
