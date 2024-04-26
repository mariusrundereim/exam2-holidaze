import logo from "../../assets/logo/brand-logo.svg";
import { useNavigate } from "react-router-dom";
function LogoBrand() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };
  return (
    <>
      <img
        src={logo}
        alt="Logo Home"
        onClick={goHome}
        style={{
          cursor: "pointer",
          width: "150px",
          height: "100%",
        }}
      />
    </>
  );
}

export default LogoBrand;
