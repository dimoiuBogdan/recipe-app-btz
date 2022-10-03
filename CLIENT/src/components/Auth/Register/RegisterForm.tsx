import { Formik, Form, Field, ErrorMessage } from "formik";
import { FC, useState } from "react";
import * as Yup from "yup";
import { SchemaOf } from "yup";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { AxiosError } from "axios";
import { NotificationActions } from "../../../redux/reducers/notificationReducer";
import { NotificationTypes } from "../../../models/NotificationModel";
import { useDispatch } from "react-redux";
import { getSubmitButtonLabel } from "../../../services/AuthService";
import useAxiosRequest from "../../../services/AxiosService";

type FormProperties = {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterForm: FC<any> = () => {
  const dispatch = useDispatch();
  const { axiosRequest } = useAxiosRequest();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formProperties: FormProperties = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const SignupSchema: SchemaOf<FormProperties> = Yup.object().shape({
    username: Yup.string()
      .min(5, "Too Short!")
      .max(20, "Too Long!")
      .required("Required"),
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .required("Required")
      .min(7, "Too Short!")
      .max(20, "Too Long!")
      .matches(
        /^.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?].*$/,
        "Need at least one special character"
      ),
    confirmPassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password"), null], "Passwords don't match"),
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const signupUser = (
    values: FormProperties,
    setSubmitting: (isSubmitting: boolean) => void
  ) => {
    const { email, password, username } = values;
    const data = {
      username,
      email,
      password,
    };

    const successAction = () => {
      dispatch(
        NotificationActions.setPopupProperties({
          content: "Account created successfuly! You can now login.",
          type: NotificationTypes.Success,
        })
      );
    };

    const errorAction = (err: AxiosError) => {
      dispatch(
        NotificationActions.setPopupProperties({
          content: "There was a problem creating your account!",
          type: NotificationTypes.Error,
        })
      );
      console.log(err);
    };

    const finallyAction = () => {
      setSubmitting(false);
    };

    axiosRequest(
      "post",
      "http://localhost:5000/api/users/register",
      data,
      successAction,
      errorAction,
      finallyAction
    );
  };

  const errorMessageClassName = "text-sm text-red-400 font-medium";
  const fieldWrapperClassName = "w-full my-6";
  const fieldClassName =
    "w-full bg-transparent border-b-2 py-1 outline-none hover:shadow-md focus:shadow-md px-1";
  const labelClassName = "text-sm font-medium px-1";
  const showPasswordIconClassName =
    "absolute top-1/2 transform -translate-y-1/2 right-4 text-lg text-gray-500 cursor-pointer hover:scale-110";

  return (
    <Formik
      initialValues={formProperties}
      validationSchema={SignupSchema}
      onSubmit={(values, { setSubmitting }) => {
        signupUser(values, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-2/3 mx-auto">
          <div className={fieldWrapperClassName}>
            <div className={labelClassName}>Username</div>
            <Field
              placeholder="Enter your username"
              className={fieldClassName}
              name="username"
              autoComplete="username"
            />
            <ErrorMessage
              component="div"
              className={errorMessageClassName}
              name="username"
            />
          </div>
          <div className={fieldWrapperClassName}>
            <div className={labelClassName}>Email</div>
            <Field
              placeholder="Enter your email"
              className={fieldClassName}
              name="email"
              type="email"
              autoComplete="email"
            />
            <ErrorMessage
              component="div"
              className={errorMessageClassName}
              name="email"
            />
          </div>
          <div className={fieldWrapperClassName}>
            <div className={labelClassName}>Password</div>
            <div className="relative">
              <Field
                placeholder="Enter your password"
                className={fieldClassName}
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="password"
              />
              {showPassword ? (
                <FaEyeSlash
                  onClick={toggleShowPassword}
                  className={showPasswordIconClassName}
                />
              ) : (
                <FaEye
                  onClick={toggleShowPassword}
                  className={showPasswordIconClassName}
                />
              )}
            </div>
            <ErrorMessage
              component="div"
              className={errorMessageClassName}
              name="password"
            />
          </div>
          <div className={fieldWrapperClassName}>
            <div className={labelClassName}>Confirm Password</div>
            <Field
              className={fieldClassName}
              name="confirmPassword"
              type={showPassword ? "text" : "password"}
              placeholder="Confirm your password"
              autoComplete="confirm-passowrd"
            />
            <ErrorMessage
              component="div"
              className={errorMessageClassName}
              name="confirmPassword"
            />
          </div>
          <button
            className="my-4 text-white text-lg font-medium w-full bg-gradient-to-r from-btz-teal to-purple-500 rounded-full py-1.5 shadow-sm hover:shadow-md disabled:opacity-40"
            type="submit"
            disabled={isSubmitting}
          >
            {getSubmitButtonLabel(isSubmitting, "REGISTER..", "REGISTER")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
