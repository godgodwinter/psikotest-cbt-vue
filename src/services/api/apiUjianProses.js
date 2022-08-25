import Api from "@/axios/axios";
// import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { useStoreUjian } from "@/stores/ujian";
import { useStoreAuth } from "@/stores/auth";
const storeUjian = useStoreUjian();
const storeAuth = useStoreAuth();

const token = storeAuth.getToken;

const doMulaiUjian = async (ujian_proses_kelas_id, ujian_paketsoal_kategori_id) => {
  try {
    const response = await Api.post(`siswa/data/dataujian/${ujian_proses_kelas_id}/paketsoal/${ujian_paketsoal_kategori_id}/mulai_ujian`, {
      token: token,
    });
    const { data, success } = response;
    if (success) {
      return true;
    }
    return false;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};

const doGetSoal = async (ujian_proses_kelas_id, ujian_paketsoal_kategori_id, ujian_proses_kategori_id) => {
  try {
    const response = await Api.post(`siswa/data/dataujian/${ujian_proses_kelas_id}/paketsoal/${ujian_paketsoal_kategori_id}/getsoal/${ujian_proses_kategori_id}`, {
      token: token,
    });
    const { data, success } = response;
    if (success) {
      console.log('====================================');
      console.log(data, 'aa');
      console.log('====================================');
    }
    return false;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server!`);
    console.error(error);
    return false;
  }
};


const apiUjianProses = {
  doMulaiUjian,
  doGetSoal,
};
export default apiUjianProses;
