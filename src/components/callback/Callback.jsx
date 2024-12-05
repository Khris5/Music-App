import { useEffect, useContext } from "react";
import { useNavigate } from "react-router";
import { ApiContext } from "../../ApiContext/Apicontext";

const Callback = () => {
  const navigate = useNavigate();
  const { accessToken } = useContext(ApiContext);

  useEffect(() => {
    // Only navigate once we have the token
    if (accessToken) {
      navigate("/home");
    }
  }, [navigate, accessToken]);

  return <div>Loading...</div>;
};

export default Callback;
