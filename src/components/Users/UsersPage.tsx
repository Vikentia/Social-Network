import React from "react";
import Users from "./Users";
import { useSelector } from "react-redux";
import { Preloader } from "../common/Preloader/Preloader";
import { getIsFetching } from "../../redux/users-selectors";

export const UsersPage: React.FC = () => {
    const isFetching = useSelector(getIsFetching);
    return (
        <>
            {isFetching && <Preloader />}
            <Users />
        </>
    );
};

