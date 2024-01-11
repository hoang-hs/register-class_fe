// import "@trendmicro/react-sidenav/dist/react-sidenav.css";

// import SideNav, {
//     NavItem,
//     NavIcon,
//     NavText
// } from "@trendmicro/react-sidenav";
import { useState } from 'react';

import { routes_by_role } from '../../constants';
import logo from './logo.png';
import './Sidebar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthenication } from '../../hooks/useAuthenication';

const SideNavBar = (props) => {
    const location = useLocation();
    const { logout, getRole } = useAuthenication();
    const role = getRole();

    return (
        <nav id='sidebar' className='nav flex-column border-end'>
            <div className='logo-container px-3 py-4'>
                <img src={logo} alt='logo' className='w-100' />
            </div>
            {routes_by_role[role]?.map(({ path, title, hidden }, idx) => (
                <li key={idx} className={`nav-item ${hidden ? 'd-none' : ''}`}>
                    <Link
                        className={`nav-link ${
                            location?.pathname.includes(path) ? 'active' : ''
                        }`}
                        to={path}
                    >
                        {title}
                    </Link>
                </li>
            ))}

            <li className='logout nav-item' onClick={logout}>
                <a className='nav-link'>
                    <i className='fas fa-sign-out-alt me-2' />
                    Đăng xuất
                </a>
            </li>
        </nav>
    );
};

export default SideNavBar;
