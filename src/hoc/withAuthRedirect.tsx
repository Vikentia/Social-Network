import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { AppStateType } from "../redux/redux-store";

type MapPropsType = {
    isAuth: boolean;
};
type DispatchPropsType = {};

let mapStateToPropsForRedirect = (state: AppStateType) =>
    ({ isAuth: state.auth.isAuth } as MapPropsType);

export function withAuthRedirect<WCP extends object>(
    Component: React.ComponentType<WCP>
) {
    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (
        props
    ) => {
        let { isAuth, ...restProps } = props;
        if (!isAuth) return <Navigate to="/login" />;
        return <Component {...(restProps as WCP)} />;
    };

    let ConnectedAuthRedirectComponent = connect<
        MapPropsType,
        DispatchPropsType,
        WCP,
        AppStateType
    >(
        mapStateToPropsForRedirect,
        {}
    )(RedirectComponent);

    return ConnectedAuthRedirectComponent;
}
