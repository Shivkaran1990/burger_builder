import React from 'react';
import bugerLogo from '../../assets/images/burger-logo.png';
import classes from './Logo.module.css';

const logo=(props) =>(
   <div className={classes.Logo}>
       <img src={bugerLogo} alt="MyBurger"></img>
   </div>
);
export default logo;