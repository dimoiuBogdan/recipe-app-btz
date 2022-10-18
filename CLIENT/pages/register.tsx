import { NextPage } from "next";
import React from "react";
import AuthModal from "../src/components/Auth/AuthModal";
import RegisterForm from "../src/components/Auth/Register/RegisterForm";

const RegisterPage: NextPage = () => {
  return (
    <div className="h-screen flex items-center justify-center">
      <AuthModal>
        <RegisterForm />
      </AuthModal>
    </div>
  );
};

export default RegisterPage;
