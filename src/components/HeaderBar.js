import React from "react";
import {Navbar} from "react-bootstrap";
import "./myStyles.css";

class HeaderBar extends React.Component {
    render() {
        return (
            <div className="topnav">
                <Navbar
                    fixed="top"
                    expand="lg"
                    bg="dark"
                    variant="dark"
                    className="topnav"
                >
                    <Navbar.Brand href="">Đại học bách khoa Hà Nội</Navbar.Brand>
                </Navbar>
            </div>
        );
    }
}

export default HeaderBar;
