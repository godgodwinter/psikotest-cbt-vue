import Api from "@/axios/axios";
// import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { useStoreAuth } from "@/stores/auth";
const storeAuth = useStoreAuth();

const doLogin = async (username, password) => {
  try {
    const response = await Api.post("siswa/auth/login", {
      email: username,
      password: password,
    });
    console.log(response);
    if (response.code === 200) {
      const { token } = response;
      localStorage.setItem("token", token);
      localStorage.setItem("isLogin", true);
      console.log("Login berhasil");
      storeAuth.setIsLogin(true);
      storeAuth.setToken(token);
      // let decoded = jwt_decode(token);
      //   storeAuth.commit("setDataAuth", decoded);
      // console.log(decoded);
      Toast.success("Success", "Login Berhasil!");
    } else {
      Toast.danger("Warning", "Login gagal!");
    }
    return true;
  } catch (error) {
    console.error(error);
    Toast.danger("Warning", "Login gagal!");
  }
};

const doCheckToken = async (token) => {
  try {
    const response = await Api.post(`siswa/auth/profile`, {
      token: token,
    });
    // console.log(response.hasOwnProperty("data"));
    // eslint-disable-next-line no-prototype-builtins
    if (response.hasOwnProperty("data")) {
      const newToken = response.data.newToken;
      localStorage.setItem("token", newToken);
      //   storeAdminAuth.setToken(newToken);
      // console.log(response.data.me.nama);

      //   const dataMe = {
      //     id: response.data.me.id,
      //     nama: response.data.me.nama,
      //     username: response.data.me.username,
      //     email: response.data.me.email,
      //   };
      //   storeAdminAuth.setMe(dataMe);
      // console.log(dataMe);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};

const doLogout = async (alert = true) => {
  try {
    localStorage.removeItem("token");
    localStorage.removeItem("isLogin");
    // storeAdminAuth.setToken("");
    // storeAdminAuth.setIsLogin(false);
    if (alert) {
      Toast.success("Info", "Logout berhasil!");
    }
    return true;
  } catch (error) {
    console.error(error);
  }
};

const API = {
  doLogin,
  doCheckToken,
  doLogout,
};
export default API;
