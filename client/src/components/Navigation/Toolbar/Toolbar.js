import React from 'react';

import classes from './Toolbar.css';
import NavigationItems from '../NavigationItems/NavigationItems';

const toolbar = ( props ) => (
    <header className={classes.Toolbar}>
         <p><a href="/">CEWIT Conference 2018</a></p>
        <nav className={classes.DesktopOnly}>
            <NavigationItems />
        </nav>
       
    </header>
);

export default toolbar;