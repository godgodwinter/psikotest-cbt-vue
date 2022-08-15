import Api from "@/axios/axios";
// import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { useStoreUjian } from "@/stores/ujian";
import { useStoreAuth } from "@/stores/auth";
const storeUjian = useStoreUjian();
const storeAuth = useStoreAuth();

const token = storeAuth.getToken;

const doPeriksaUjianSaya = async (token) => {
  try {
    const response = await Api.get(`siswa/data/periksa/ujianaktif`, {
      token: token,
    });
    const { data, success } = response;
    if (success) {
      storeUjian.setIsUjianAktif(true);
      storeUjian.setUjianAktif(data);
    } else {
      storeUjian.setIsUjianAktif(false);
      storeUjian.setUjianAktif(data);
    }
    // console.log(data, message, success);
    return true;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};

const doGetUjianList = async () => {
  try {
    const response = await Api.get(`siswa/data/ujian`, {
      token,
    });
    const { data, success } = response;
    if (success) {
      storeUjian.setUjianList(data);
      console.log(data);
    }
    // console.log(data, message, success);
    return true;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};

const apiUjian = {
  doPeriksaUjianSaya,
  doGetUjianList,
};
export default apiUjian;
