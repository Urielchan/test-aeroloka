import VerifyEmail from "../../components/Auth/VerifyEmail";
import AuthLayout from "../../components/Auth/AuthLayout";

const VerifyEmailView = () => {
  return (
    <AuthLayout title="Reset Password">
      <VerifyEmail />
    </AuthLayout>
  );
};

export default VerifyEmailView;
