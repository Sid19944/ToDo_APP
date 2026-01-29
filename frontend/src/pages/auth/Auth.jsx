import { Link } from "react-router-dom";
import { userUrl } from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import Loading from "../../utils/Loading";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../store/slice/user.slice";

function Auth() {
  const handleGoogleLogin = async (e) => {
    window.location.href = "http://localhost:3000/auth/google";
    e.preventDefault();
    await userUrl.get("/google");
  };

  const handleGithubLogin = async (e) => {
    window.location.href = "http://localhost:3000/auth/github";
    e.preventDefault();
    await userUrl.get("/github");
  };

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispacth = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (Object.keys(user).length == 0) dispacth(getUser());
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  return (
    <div className=" h-screen font-serif flex">
      <div className="w-full md:1/2 lg:w-2/5 flex justify-around items-center">
        <form className="rounded-lg w-[95%] md:w-4/5 lg:w-3/4 shadow-[1px_1px_5px_5px] shadow-white p-4">
          <div className="mb-4 flex gap-3 flex-col">
            <p className="text-4xl tracking-[3px]">TODO APP</p>
            <p className="text-xl tracking-[2px">
              Login/ Register into your account
            </p>
          </div>
          <div className="flex flex-col gap-3 mb-2">
            <Link
              onClick={handleGoogleLogin}
              className="w-full border-2 rounded-lg p-2 flex justify-center bg-white text-black font-semibold gap-2 active:bg-blue-500 active:text-white"
            >
              Continue With <GoogleIcon />
            </Link>
            <Link
              onClick={handleGithubLogin}
              className="w-full border-2 rounded-lg p-2 flex justify-center bg-white text-black font-semibold gap-2 active:bg-blue-500 active:text-white"
            >
              Continue With <GitHubIcon />
            </Link>
          </div>
          <div className="relative flex items-center">
            <div className="bg-black z-20 px-2">
              <p className="animate-pulse">Thank you for Choose us </p>
            </div>
            <span className="w-full border inline-block absolute border-blue-500"></span>
          </div>
        </form>
      </div>

      <img
        src="/todoB.jpeg"
        alt="Image"
        className="md:1/2 lg:w-3/5 object-cover hidden lg:block"
      />
      <ToastContainer />
    </div>
  );
}

export default Auth;
