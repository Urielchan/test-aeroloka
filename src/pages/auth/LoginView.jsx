import React from "react";
import Login from "../../components/Auth/Login";
import AuthLayout from "../../components/Auth/AuthLayout";

const LoginView = () => {
  return (
    <>
      <AuthLayout title="Masuk">
        <Login />
      </AuthLayout>
    </>
  );
};

export default LoginView;
