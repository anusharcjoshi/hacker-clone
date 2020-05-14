import React, { Fragment } from 'react';
import Logo from '../../../assets/logo.png';
import './style.css';

const Header = () => (
  <Fragment>
    <div className="header">
      <img src={Logo} alt="logo" />
    </div>
  </Fragment>
);

export default Header;
