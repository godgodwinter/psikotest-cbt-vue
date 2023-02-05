import Api from "@/axios/axios";
// import jwt_decode from "jwt-decode";
import Toast from "@/components/lib/Toast.js";
import { useStoreUjian } from "@/stores/ujian";
import { useStoreAuth } from "@/stores/auth";
import { LocalStorage } from "quasar";
const storeUjian = useStoreUjian();
const storeAuth = useStoreAuth();

const token = storeAuth.getToken;

const doMulaiUjian = async (
  ujian_proses_kelas_id,
  ujian_paketsoal_kategori_id
) => {
  try {
    console.log('====================================');
    console.log(ujian_proses_kelas_id, ujian_paketsoal_kategori_id);
    console.log('====================================');
    const response = await Api.post(
      `siswa/data/dataujian/${ujian_proses_kelas_id}/paketsoal/${ujian_paketsoal_kategori_id}/mulai_ujian`,
      {
        token: token,
      }
    );
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

const doGetSoal = async (
  ujian_proses_kelas_id,
  ujian_paketsoal_kategori_id,
  ujian_proses_kategori_id
) => {
  try {
    const response = await Api.post(
      `siswa/data/dataujian/${ujian_proses_kelas_id}/paketsoal/${ujian_paketsoal_kategori_id}/getsoal/${ujian_proses_kategori_id}`,
      {
        token: token,
      }
    );
    const { data, success } = response;
    if (success) {
      // save data to local storage
      localStorage.setItem("soal", JSON.stringify(data));
      storeUjian.setSoalList(data);
      if (localStorage.getItem("soalAktif")) {
        console.log(localStorage.getItem("soalAktif"));
      } else {
        localStorage.setItem("soalAktif", JSON.stringify(0));
        storeUjian.setSoalAktif(0);
      }

      return true;
    }
    return false;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server 0!`);
    console.error(error);
    return false;
  }
};
const doInsertJawaban = async (
  ujian_proses_kategori_id,
  ujian_paketsoal_soal_id,
  kode_soal,
  ujian_paketsoal_soal_pilihanjawaban_id,
  kode_jawaban
) => {
  let dataForm = {
    ujian_paketsoal_soal_id,
    kode_soal,
    ujian_paketsoal_soal_pilihanjawaban_id,
    kode_jawaban,
  };
  // console.log(ujian_proses_kategori_id, dataForm);
  try {
    const response = await Api.post(
      `siswa/data/dataujian/proses/kategori/${ujian_proses_kategori_id}/insertjawaban`,
      dataForm
    );
    const { data, success } = response;
    if (success) {
      console.log(data);
      return true;
    }
    console.log(response);
    return false;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server 0!`);
    console.error(error);
    return false;
  }
};

const doFinish = async (ujian_proses_kategori_id) => {
  try {
    const response = await Api.post(
      `siswa/data/dataujian/proses/finish/${ujian_proses_kategori_id}`
    );
    const { data, success } = response;
    if (success) {
      //remove data soal
      //remove data soalAktif
      return true;
    }
    return false;
  } catch (error) {
    Toast.danger("Error", `Gagal menghubungkan ke Server Finish!`);
    console.error(error);
    return false;
  }
};
const apiUjianProses = {
  doMulaiUjian,
  doGetSoal,
  doInsertJawaban,
  doFinish,
};
export default apiUjianProses;
