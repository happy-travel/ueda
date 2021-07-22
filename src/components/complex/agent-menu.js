import React from 'react';
import { observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import $auth from 'stores/auth';

const AgentMenu = observer(() => (
    <div className="agent-menu">
        <span className="agent-link">
            <span className="avatar" />
            { ($auth.information?.firstName || '') + ' ' + ($auth.information?.lastName || '') }
        </span>
        <Link to="/logout" className="button">
            Logout
        </Link>
    </div>
));

export default AgentMenu;
