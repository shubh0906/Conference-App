import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = () => (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/users/anon">Guest Login</NavigationItem>
            <NavigationItem link="/users/login">Login</NavigationItem>
            <NavigationItem link="/admin">Admin</NavigationItem>
        </ul>
);

export default navigationItems;