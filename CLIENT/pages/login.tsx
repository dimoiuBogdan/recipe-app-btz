import { NextPage } from "next";
import React from "react";
import { useEffect } from "react";
import { useContext } from "react";
import AuthModal from "../src/components/Auth/AuthModal";
import LoginForm from "../src/components/Auth/Login/LoginForm";
import { AuthContext } from "../src/redux/AuthContext";

const LoginPage: NextPage = () => {
  const { logoutUser } = useContext(AuthContext);

  useEffect(() => {
    logoutUser();
  }, [logoutUser]);

  return (
    <div className="h-screen flex items-center justify-center">
      <AuthModal>
        <LoginForm />
      </AuthModal>
    </div>
  );
};

export default LoginPage;
