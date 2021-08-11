import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

const SideBarItem = ({ children, url }) => {

    const [select, setSelect] = useState(false);

    const selectHandler = () => {
        console.log(select);
        setSelect(!select)
    };

    return (
        <NavLink activeClassName="selected" to={url}>
            <div className="sidebar-item">{children}</div>
        </NavLink>
    )
}

export default SideBarItem;