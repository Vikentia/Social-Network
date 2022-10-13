import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../redux/users-reducer";
import { getUsersFilter } from "../../redux/users-selectors";
import { useSelector } from "react-redux";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};
type FriendFormType = "true" | "false" | "null";
type FormType = {
    term: string;
    friend: FriendFormType;
};

const validate = (values: FormType) => {
    const errors = {};
    return errors;
};

const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
    const filter = useSelector(getUsersFilter);

    const submit = (
        values: FormType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        // @ts-ignore
        onFilterChanged(values);
        setSubmitting(false);
    };
    return (
        <div>
            <Formik
                initialValues={{
                    term: filter.term,
                    friend: String(filter.friend) as FriendFormType,
                }}
                validate={validate}
                onSubmit={submit}
                enableReinitialize
            >
                {({ isSubmitting }) => (
                    <Form>
                        <Field type="text" name="term" />
                        <Field name="friend" as="select">
                            <option value="null">All</option>
                            <option value="true">Only followed</option>
                            <option value="false">Only unfollowed</option>
                        </Field>
                        <button type="submit" disabled={isSubmitting}>
                            Find
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default React.memo(UsersSearchForm);

// const submit = (
//     values: FormType,
//     { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
// ) =>
//     {
//         const filter: FilterType = {
//             term: values.term,
//             friend:
//                 values.friend === "null"
//                     ? null
//                     : values.friend === "true"
//                     ? true
//                     : false,
//         };

//         onFilterChanged(filter);
//         setSubmitting(false);
//     };
