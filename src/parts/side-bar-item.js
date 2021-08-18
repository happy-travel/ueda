import React from 'react';
import { NavLink } from 'react-router-dom';

const SideBarItem = ({ children, url }) => {

    return (
        <NavLink activeClassName="selected" to={url}>
            <div className="sidebar-item">{children}</div>
        </NavLink>
    )
}

export default SideBarItem;