import React from "react";
import Register from "../../components/Auth/Register";
import AuthLayout from "../../components/Auth/AuthLayout";

const RegisterView = () => {
  return (
    <>
      <AuthLayout title="Daftar">
        <Register />
      </AuthLayout>
    </>
  );
};

export default RegisterView;
