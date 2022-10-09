import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SchemaOf } from "yup";
import { getSubmitButtonLabel } from "../../../services/AuthService";
import { AxiosError, AxiosResponse } from "axios";
import { useDispatch } from "react-redux";
import { NotificationActions } from "../../../redux/reducers/notificationReducer";
import { NotificationTypes } from "../../../models/NotificationModel";
import { useRouter } from "next/router";
import { OVERVIEW_PAGE_ROUTE } from "../../../constants/routes";
import useAxiosRequest from "../../../hooks/useAxiosRequest";
import { AuthActions } from "../../../redux/reducers/authReducer";

type FormProperties = {
  email: string;
  password: string;
};

const LoginForm: FC<any> = () => {
  const router = useRouter();
  const { axiosRequest } = useAxiosRequest();
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const formProperties: FormProperties = {
    email: "",
    password: "",
  };

  const LoginSchema: SchemaOf<FormProperties> = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required"),
  });

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleEmailAndPasswordLogin = (
    values: FormProperties,
    setSubmitting: (state: boolean) => void
  ) => {
    const { email, password } = values;

    const data = {
      email,
      password,
    };

    const successAction = (res: AxiosResponse) => {
      const { userId, token } = res.data as { userId: string; token: string };

      console.log(res);

      dispatch(
        AuthActions.setAuthProperties({
          token,
          userId,
        })
      );

      dispatch(
        NotificationActions.setPopupProperties({
          content: "Logged in successfully! You will now be redirected",
          type: NotificationTypes.Success,
        })
      );

      router.push(OVERVIEW_PAGE_ROUTE);
    };

    const errorAction = (err: AxiosError) => {
      console.log(err);
      const { message } = err.response?.data as { message: string };

      dispatch(
        NotificationActions.setPopupProperties({
          content: message || "There was a problem logging you in.",
          type: NotificationTypes.Error,
        })
      );
    };

    const finallyAction = () => {
      setSubmitting(false);
    };

    axiosRequest(
      "post",
      "http://localhost:5000/api/users/login",
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
      validationSchema={LoginSchema}
      onSubmit={(values, { setSubmitting }) => {
        handleEmailAndPasswordLogin(values, setSubmitting);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="w-2/3 mx-auto">
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
          <button
            className="my-4 text-white text-lg font-medium w-full bg-gradient-to-r from-orange-300 to-orange-600 rounded-full py-1.5 shadow-sm hover:shadow-md disabled:opacity-40"
            type="submit"
            disabled={isSubmitting}
          >
            {getSubmitButtonLabel(isSubmitting, "LOGGING IN..", "LOGIN")}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
