import { defineStore } from "pinia";
export const useStoreUjian = defineStore({
  id: "storeUjian",
  state: () => ({
    isUjianAktif: false,
    ujianAktif: {
      id: "",
      nama: "",
      waktu: "",
      tgl_mulai: "",
      tgl_selesai: "",
      soal: [],
    },
    ujianList: [], //ujian utama sebelum daftar tapi di atur di admin untuk kelas nya
    ujianListKategori: [], // sudah daftar ujian utama
    //get data soal dan pilihan jawaban from LocalStorage jika ada jika tidak ada ambil dari server kemudian simpan  ke local storage
    //where ujian aktif
    soalList: localStorage.getItem("soal") ? JSON.parse(localStorage.getItem("soal")) : [],
    soalAktif: localStorage.getItem("soalAktif") ? localStorage.getItem("soalAktif") : 0,
    soalAktifDetail: null,
    tempJawabanTerpilih: null,
    timer: null,
  }),
  getters: {
    getIsUjianAktif: (state) => state.isUjianAktif,
    getUjianAktif: (state) => state.ujianAktif,
    getUjianList: (state) => state.ujianList,
    getUjianListKategori: (state) => state.ujianListKategori,
    getSoalList: (state) => state.soalList,
    getSoalAktif: (state) => state.soalAktif,
    getSoalAktifDetail: (state) => state.soalAktifDetail,
    getTempJawabanTerpilih: (state) => state.tempJawabanTerpilih,
    getTimer: (state) => state.timer,
  },
  actions: {
    setIsUjianAktif(isUjianAktif) {
      this.isUjianAktif = isUjianAktif;
    },
    setUjianAktif(ujianAktif) {
      this.ujianAktif = ujianAktif;
    },
    setUjianList(ujianList) {
      this.ujianList = ujianList;
    },
    setUjianListKategori(ujianListKategori) {
      this.ujianListKategori = ujianListKategori;
    },
    setSoalList(soalList) {
      this.soalList = soalList;
    },
    setSoalAktif(soalAktif) {
      this.soalAktif = soalAktif;
    },
    setSoalAktifDetail(soalAktifDetail) {
      this.soalAktifDetail = soalAktifDetail;
    },
    setTempJawabanTerpilih(tempJawabanTerpilih) {
      this.tempJawabanTerpilih = tempJawabanTerpilih;
    },
    setTimer(timer) {
      this.timer = timer;
    },
  },
});
