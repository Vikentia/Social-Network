import { Field, Form, Formik } from "formik";
import React from "react";
import { FilterType } from "../../redux/users-reducer";

type PropsType = {
    onFilterChanged: (filter: FilterType) => void;
};
type FormType = {
    term: string;
    friend: "true" | "false" | "null";
};

const validate = (values: any) => {
    const errors = {};
    return errors;
};

const UsersSearchForm: React.FC<PropsType> = ({ onFilterChanged }) => {
    const submit = (
        values: FilterType,
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        onFilterChanged(values);
        setSubmitting(false);
    };
    return (
        <div>
            <Formik
                initialValues={{ term: "", friend: null }}
                validate={validate}
                onSubmit={submit}
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
