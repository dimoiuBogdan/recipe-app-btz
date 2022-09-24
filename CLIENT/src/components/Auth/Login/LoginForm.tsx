import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { SchemaOf } from "yup";

type FormProperties = {
  email: string;
  password: string;
};

const LoginForm: FC<any> = () => {
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
    email: string,
    password: string,
    setSubmitting: (state: boolean) => void
  ) => {
    setSubmitting(false);
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
        const { email, password } = values;

        handleEmailAndPasswordLogin(email, password, setSubmitting);
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
            className="my-4 text-white text-lg font-medium w-full bg-gradient-to-r from-btz-teal to-purple-500 rounded-full py-1.5 shadow-sm hover:shadow-md disabled:opacity-40"
            type="submit"
            disabled={isSubmitting}
          >
            LOGIN
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
