import React from "react";
import s from "./Header.module.scss";
import { NavLink } from "react-router-dom";
import { Button, Avatar, Row, Col, Layout } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from "../../redux/redux-store";
import { logout } from "../../redux/auth-reducer";

export const Header: React.FC = () => {
    const isAuth = useSelector<AppStateType>((state) => state.auth.isAuth);
    const login = useSelector<AppStateType>((state) => state.auth.login);
    const dispatch = useDispatch();
    const logOutFunc = () => {
        //@ts-ignore
        dispatch(logout());
    };

    const { Header } = Layout;

    return (
        <Header className={s.header}>
            <Row>
                <>
                    {isAuth && (
                        <Col span={22}>
                            <><Avatar
                                style={{ backgroundColor: "#1890ff" }}
                                icon={<UserOutlined />}
                            />
                            {login}
                            </>
                        </Col>
                    )}
                    <Col span={2}>
                        {isAuth ? (
                            <Button type="primary" onClick={logOutFunc}>
                                Logout
                            </Button>
                        ) : (
                            <Button type="primary">
                                <NavLink to="/login">Login</NavLink>
                            </Button>
                        )}
                    </Col>
                </>
            </Row>
        </Header>
    );
};
