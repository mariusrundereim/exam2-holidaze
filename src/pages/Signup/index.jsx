import { IconLogin, IconUserPlus } from "@tabler/icons-react";
import RegisterForm from "../../components/forms/RegisterForm";
import { Title, Tabs, rem } from "@mantine/core";
import LoginForm from "../../components/forms/LoginForm";
import { useState } from "react";
function Signup() {
  const iconStyle = { width: rem(20), height: rem(20) };
  const [activeTab, setActiveTab] = useState("login");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleRegistrationSuccess = () => {
    setRegistrationSuccess(true);
  };
  return (
    <>
      <Title>Sign up or login for a good holiday!</Title>
      <Tabs
        variant="pills"
        defaultValue="login"
        value={activeTab}
        onChange={setActiveTab}
      >
        <Tabs.List>
          <Tabs.Tab value="login" leftSection={<IconLogin style={iconStyle} />}>
            Login
          </Tabs.Tab>
          <Tabs.Tab
            value="register"
            leftSection={<IconUserPlus style={iconStyle} />}
          >
            Register
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="register">
          {registrationSuccess ? (
            <p>Success</p>
          ) : (
            <RegisterForm onSuccess={handleRegistrationSuccess} />
          )}
        </Tabs.Panel>

        <Tabs.Panel value="login">
          <LoginForm />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default Signup;
