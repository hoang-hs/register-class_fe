import React from "react";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";

import SideNav, {
    NavItem,
    NavIcon,
    NavText
} from "@trendmicro/react-sidenav";

class SideNavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        fetch('http://localhost:8080/api/students')
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
            });
    }

    render() {
        return (
            <SideNav expanded={this.state.isVisible}>
                <SideNav.Toggle
                    onClick={() => {
                        this.setState({isVisible: !this.state.isVisible});
                    }}
                />
                <SideNav.Nav defaultSelected="home">
                    <NavItem eventKey="home">
                        <NavIcon>
                            <i className="fa fa-fw fa-home" style={{fontSize: "1.75em"}}/>
                        </NavIcon>
                        <NavText>Home</NavText>
                    </NavItem>
                    <NavItem onClick={this.handleClick}>
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-line-chart"
                                style={{fontSize: "1.75em"}}
                            />
                        </NavIcon>
                        <NavText>Sinh viên</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-line-chart"
                                style={{fontSize: "1.75em"}}
                            />
                        </NavIcon>
                        <NavText>Giảng viên</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-line-chart"
                                style={{fontSize: "1.75em"}}
                            />
                        </NavIcon>
                        <NavText>Phòng học</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-line-chart"
                                style={{fontSize: "1.75em"}}
                            />
                        </NavIcon>
                        <NavText>Khóa học</NavText>
                    </NavItem>
                    <NavItem>
                        <NavIcon>
                            <i
                                className="fa fa-fw fa-line-chart"
                                style={{fontSize: "1.75em"}}
                            />
                        </NavIcon>
                        <NavText>Lớp học</NavText>
                    </NavItem>
                </SideNav.Nav>
            </SideNav>
        );
    }
}

export default SideNavBar;
