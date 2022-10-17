import React, { lazy, Suspense, useState } from "react";
import s from "./App.module.scss";
import { Header as HeaderFC } from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "../../redux/app-reducer";
import { Preloader } from "../common/Preloader/Preloader";
import { AppStateType } from "../../redux/redux-store";
import { UsersPage } from "../Users/UsersPage";
import { LoginPage } from "../Login/LoginPage";

import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Breadcrumb, Layout, Menu } from "antd";

const ProfileContainer = lazy(() => import("../Profile/ProfileContainer"));
const DialogsContainer = lazy(() => import("../Dialogs/DialogsContainer"));
// const Login = lazy(() => import("../Login/LoginPage"));
// const UsersPage = lazy(() => import("../Users/UsersPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

const [collapsed, setCollapsed] = useState(false);

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem("Option 1", "1", <PieChartOutlined />),
    getItem("Option 2", "2", <DesktopOutlined />),
    getItem("User", "sub1", <UserOutlined />, [
        getItem("Tom", "3"),
        getItem("Bill", "4"),
        getItem("Alex", "5"),
    ]),
    getItem("Team", "sub2", <TeamOutlined />, [
        getItem("Team 1", "6"),
        getItem("Team 2", "8"),
    ]),
    getItem("Files", "9", <FileOutlined />),
];

class App extends React.Component<MapPropsType & DispatchPropsType> {
    catchAllUnhandledError = (e: PromiseRejectionEvent) => {
        // alert("Some error");
    };
    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener(
            "unhandledrejection",
            this.catchAllUnhandledError
        );
    }
    componentWillUnmount() {
        window.removeEventListener(
            "unhandledrejection",
            this.catchAllUnhandledError
        );
    }

    render() {
        if (!this.props.initialized) {
            return <Preloader />;
        }
        return (
            <Layout style={{ minHeight: "100vh" }}>
                <Sider
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                >
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        defaultSelectedKeys={["1"]}
                        mode="inline"
                        items={items}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Header
                        className="site-layout-background"
                        style={{ padding: 0 }}
                    />
                    <Content style={{ margin: "0 16px" }}>
                        <Breadcrumb style={{ margin: "16px 0" }}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        <div
                            className="site-layout-background"
                            style={{ padding: 24, minHeight: 360 }}
                        >
                            Bill is a cat.
                        </div>
                    </Content>
                    <Footer style={{ textAlign: "center" }}>
                        Ant Design ©2018 Created by Ant UED
                    </Footer>
                </Layout>
            </Layout>
            // <div className={s.App}>
            //     <HeaderContainer />
            //     <Navigation />

            //     <div className={s.content}>
            //         <Suspense fallback={<div>Loading...</div>}>
            //             <Routes>
            //                 <Route
            //                     path="/"
            //                     element={<Navigate to={"/profile"} />}
            //                 />
            //                 <Route
            //                     path="/dialogs"
            //                     element={<DialogsContainer />}
            //                 />
            //                 <Route
            //                     path="/profile"
            //                     element={<ProfileContainer />}
            //                 >
            //                     <Route
            //                         path=":userId"
            //                         element={<ProfileContainer />}
            //                     />
            //                 </Route>
            //                 <Route path="/users" element={<UsersPage />} />
            //                 <Route path="/login" element={<LoginPage />} />
            //                 <Route
            //                     path="/*"
            //                     element={<div> 404 NOT FOUND </div>}
            //                 />
            //             </Routes>
            //         </Suspense>
            //     </div>
            // </div>
        );
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
