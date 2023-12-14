// import "@trendmicro/react-sidenav/dist/react-sidenav.css";

// import SideNav, {
//     NavItem,
//     NavIcon,
//     NavText
// } from "@trendmicro/react-sidenav";
import { useState } from "react";

import { routes } from "../../constants";
import logo from './logo.png';
import './Sidebar.scss';
import { Link } from "react-router-dom";

const SideNavBar = props => {
    const [tab, setTab] = useState('/sinh-vien');

    // return (
    //     <SideNav expanded={expanded}>
    //         <SideNav.Toggle onClick={() => setExpanded(state => !state)}/>
    //         <SideNav.Nav defaultSelected="home">
    //             <NavItem eventKey="home">
    //                 <NavIcon>
    //                     <i className="fa fa-fw fa-home" style={{fontSize: "1.75em"}}/>
    //                 </NavIcon>
    //                 <NavText>Home</NavText>
    //             </NavItem>
    //             <NavItem onClick={() => null}>
    //                 <NavIcon>
    //                     <i
    //                         className="fa fa-fw fa-line-chart"
    //                         style={{fontSize: "1.75em"}}
    //                     />
    //                 </NavIcon>
    //                 <NavText>Sinh viên</NavText>
    //             </NavItem>
    //             <NavItem>
    //                 <NavIcon>
    //                     <i
    //                         className="fa fa-fw fa-line-chart"
    //                         style={{fontSize: "1.75em"}}
    //                     />
    //                 </NavIcon>
    //                 <NavText>Giảng viên</NavText>
    //             </NavItem>
    //             <NavItem>
    //                 <NavIcon>
    //                     <i
    //                         className="fa fa-fw fa-line-chart"
    //                         style={{fontSize: "1.75em"}}
    //                     />
    //                 </NavIcon>
    //                 <NavText>Phòng học</NavText>
    //             </NavItem>
    //             <NavItem>
    //                 <NavIcon>
    //                     <i
    //                         className="fa fa-fw fa-line-chart"
    //                         style={{fontSize: "1.75em"}}
    //                     />
    //                 </NavIcon>
    //                 <NavText>Khóa học</NavText>
    //             </NavItem>
    //             <NavItem>
    //                 <NavIcon>
    //                     <i
    //                         className="fa fa-fw fa-line-chart"
    //                         style={{fontSize: "1.75em"}}
    //                     />
    //                 </NavIcon>
    //                 <NavText>Lớp học</NavText>
    //             </NavItem>
    //         </SideNav.Nav>
    //     </SideNav>
    // )
    return (
        <nav 
            id="sidebar"
            className="nav flex-column border-end"
        >   
            <div className="logo-container px-3 py-4">
                <img src={logo} alt='logo' className="w-100" />
            </div>
            {routes.map(({ path, title }) => (
                <li className="nav-item">
                    <Link 
                        className={`nav-link ${tab === path ? 'active' : ''}`}
                        to={path}
                        onClick={() => setTab(path)}
                    >{title}</Link>
                </li>
            ))}
        </nav>
    );
}

export default SideNavBar;
