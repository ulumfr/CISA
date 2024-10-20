import React, { useEffect, useState } from "react";
import LogoLogin from "../../assets/svg/logo.svg";
import InputField from "../../components/form/inputfield";
import { FiUser } from "react-icons/fi";
import { CgLock } from "react-icons/cg";
import Button from "../../components/ui/button";
import { NavLink } from "react-router-dom";
import { toast } from "react-hot-toast";
import LoadingSpinner from "../../components/loading/loadingspinner";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const LoginPage = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    document.title = "Cita Sakinah | Login";
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!formData.username || !formData.password) {
      toast.error("Username dan Password wajib diisi");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/user/auth/login", formData);
      if (response.status === 200) {
        await login({ token: response.data.token });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast.error(error.response.data.message);
            break;
          case 404:
            toast.error(error.response.data.message);
            break;
          case 500:
            toast.error(error.response.data.message);
            break;
          default:
            toast.error("Terjadi kesalahan. Silakan coba lagi.");
        }
      } else if (error.request) {
        toast.error(
          "Tidak ada respons yang diterima dari server. Harap periksa koneksi internet Anda."
        );
      } else {
        toast.error("Terdapat Error, Silahkan Coba Lagi!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-main h-screen flex items-center justify-center">
      <div className="bg-white w-[350px] sm:w-[466px] h-[540px] rounded-3xl">
        <form
          className="flex flex-col items-center justify-between h-full py-11 px-10 sm:px-[61px]"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-center">
            <NavLink to="/">
              <img
                src={LogoLogin}
                alt="logo-login"
                draggable="false"
                width="172px"
              />
            </NavLink>
            <h1 className="text-main text-2xl font-semibold mt-8 mb-5">
              Login Administrator
            </h1>
            <div className="flex flex-col gap-[15px] sm:w-[344px]">
              <InputField
                icon={<FiUser />}
                type="text"
                placeholder="Username"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <InputField
                icon={<CgLock />}
                type="password"
                placeholder="Password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                passwordInput={true}
              />
            </div>
          </div>
          <Button
            id="login"
            name={loading ? "Logging in..." : "Login"}
            width="w-full"
            color="bg-button"
            icon={loading ? <LoadingSpinner /> : null}
            disabled={loading}
          />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
