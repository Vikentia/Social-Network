import React, { lazy, Suspense, useState } from "react";
import { Route, Routes, Navigate, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {Header} from "../Header/Header";
import { initializeApp } from "../../redux/app-reducer";
import { Preloader } from "../common/Preloader/Preloader";
import { AppStateType } from "../../redux/redux-store";
import { UsersPage } from "../Users/UsersPage";
import { LoginPage } from "../Login/LoginPage";

import s from "./App.module.scss";
import 'antd/dist/antd.css'
import { TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";

const ProfileContainer = lazy(() => import("../Profile/ProfileContainer"));
const DialogsContainer = lazy(() => import("../Dialogs/DialogsContainer"));
// const Login = lazy(() => import("../Login/LoginPage"));
// const UsersPage = lazy(() => import("../Users/UsersPage"));

const App: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const { Content, Footer, Sider } = Layout;
    const { SubMenu } = Menu;

    const dispatch = useDispatch();
    const initialized = useSelector<AppStateType>(
        (state) => state.app.initialized
    );
    const initializeAppCB = () => {
        //@ts-ignore
        dispatch(initializeApp());
    };

    const catchAllUnhandledError = (e: PromiseRejectionEvent) => {
        // alert("Some error");
    };

    React.useEffect(() => {
        // initializeApp();
        window.addEventListener("unhandledrejection", catchAllUnhandledError);
        return () => {
            window.removeEventListener(
                "unhandledrejection",
                catchAllUnhandledError
            );
        };
    }, []);
    React.useEffect(() => {
        if (!initialized) {
            initializeAppCB();
        }
    }, [initialized]);

    if (!initialized) {
        return <Preloader />;
    }

    return (
        <Layout style={{ minHeight: "100vh" }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className={s.logo} />
                <Menu theme="dark" mode="inline">
                    <SubMenu
                        key="sub1"
                        icon={<UserOutlined />}
                        title="My Profile"
                    >
                        <Menu.Item key="1">
                            <NavLink to="/profile">Profile</NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/dialogs">Messages</NavLink>
                        </Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" icon={<TeamOutlined />} title="Users">
                        <Menu.Item key="3">
                            <NavLink to="/users">Users</NavLink>
                        </Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
            <Layout className={s.siteLayout}>
                <Header />
                <Content style={{ margin: "0 16px" }}>
                    <div
                        className={s.siteLayoutBackground}
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        <div className={s.content}>
                            <Suspense fallback={<div>Loading...</div>}>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={<Navigate to={"/profile"} />}
                                    />
                                    <Route
                                        path="/dialogs"
                                        element={<DialogsContainer />}
                                    />
                                    <Route
                                        path="/profile"
                                        element={<ProfileContainer />}
                                    >
                                        <Route
                                            path=":userId"
                                            element={<ProfileContainer />}
                                        />
                                    </Route>
                                    <Route
                                        path="/users"
                                        element={<UsersPage />}
                                    />
                                    <Route
                                        path="/login"
                                        element={<LoginPage />}
                                    />
                                    <Route
                                        path="/*"
                                        element={<div> 404 NOT FOUND </div>}
                                    />
                                </Routes>
                            </Suspense>
                        </div>
                    </div>
                </Content>
                <Footer style={{ textAlign: "center" }}>
                    Ant Design ©2022 Created by Victoria Kovaliova
                </Footer>
            </Layout>
        </Layout>
    );
};

export default App;
