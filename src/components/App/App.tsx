import React, { lazy, Suspense } from "react";
import s from "./App.module.scss";
import HeaderContainer from "../Header/HeaderContainer";
import Navigation from "../Navigation/Navigation";
import { Route, Routes, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { initializeApp } from "../../redux/app-reducer";
import { Preloader } from "../common/Preloader/Preloader";
import { AppStateType } from "../../redux/redux-store";
import { UsersPage } from "../Users/UsersPage";
import { LoginPage } from "../Login/LoginPage";
const ProfileContainer = lazy(() => import("../Profile/ProfileContainer"));
const DialogsContainer = lazy(() => import("../Dialogs/DialogsContainer"));
// const Login = lazy(() => import("../Login/LoginPage"));
// const UsersPage = lazy(() => import("../Users/UsersPage"));

type MapPropsType = ReturnType<typeof mapStateToProps>;
type DispatchPropsType = {
    initializeApp: () => void;
};

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
            <div className={s.App}>
                <HeaderContainer />
                <Navigation />

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
                            <Route path="/users" element={<UsersPage />} />
                            <Route path="/login" element={<LoginPage />} />
                            <Route
                                path="/*"
                                element={<div> 404 NOT FOUND </div>}
                            />
                        </Routes>
                    </Suspense>
                </div>
            </div>
        );
    }
}
const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized,
});

export default connect(mapStateToProps, { initializeApp })(App);
