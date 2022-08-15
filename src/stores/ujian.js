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
    soalList: [],
  }),
  getters: {
    getIsUjianAktif: (state) => state.isUjianAktif,
    getUjianAktif: (state) => state.ujianAktif,
    getUjianList: (state) => state.ujianList,
    getUjianListKategori: (state) => state.ujianListKategori,
    getSoalList: (state) => state.soalList,
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
  },
});