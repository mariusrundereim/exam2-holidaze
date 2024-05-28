import { useNavigate } from "react-router-dom";
import RegisterForm from "../../components/forms/RegisterForm";
import { Container } from "@mantine/core";
function RegisterPage() {
  const navigate = useNavigate();

  const handleRegistrationSuccess = () => {
    navigate("/login");
  };
  return (
    <>
      <Container>
        <RegisterForm onSuccess={handleRegistrationSuccess} />
      </Container>
    </>
  );
}

export default RegisterPage;
