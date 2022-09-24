import { NextPage } from "next";
import React from "react";
import AuthModal from "../../src/components/Auth/AuthModal";
import LoginForm from "../../src/components/Auth/Login/LoginForm";

const LoginPage: NextPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <AuthModal>
        <LoginForm />
      </AuthModal>
    </div>
  );
};

export default LoginPage;
