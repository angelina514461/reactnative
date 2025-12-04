# 📘 README — LANTARI (Laku Ngesti Tari)

## 📛 Nama Produk

**LANTARI – Laku Ngesti Tari**
Aplikasi Pemetaan Sanggar Tari Berbasis Mobile (React Native + Firebase)

---

## 📝 Deskripsi Produk

LANTARI merupakan aplikasi pemetaan sanggar tari berbasis digital yang dirancang untuk mendata, menampilkan, dan mengelola informasi lokasi sanggar tari secara interaktif. Aplikasi ini bertujuan mendukung pelestarian budaya melalui pemanfaatan teknologi geospasial, sehingga masyarakat dapat menemukan sanggar tari terdekat dengan mudah.

Aplikasi ini menyediakan fitur untuk menambahkan lokasi sanggar, mengedit data yang sudah ada, menghapus lokasi, serta menampilkan persebaran titik sanggar tari pada peta digital yang terintegrasi secara real-time dengan Firebase.

---

## 🧩 Komponen Pembangun Produk

### 1. **Frontend**

Dibangun menggunakan:

* React Native (Expo)
* TypeScript
* React Native Maps (menampilkan peta dan marker sanggar)
* Expo Router (navigasi)
* Expo Image (penampilan logo dan gambar)

### 2. **Backend**

Menggunakan:

* Firebase Realtime Database

  * Menyimpan data sanggar tari (nama, koordinat, akurasi)
  * Mendukung CRUD (Create, Read, Update, Delete)
* Firebase SDK untuk integrasi langsung dengan aplikasi

### 3. **Komponen Halaman Utama**

* **Home (`index.tsx`)** — Halaman sambutan dan logo aplikasi.
* **Explore (`explore.tsx`)** — Menjelaskan deskripsi aplikasi dan fitur.
* **Lokasi (`lokasi.tsx`)** — Menampilkan daftar lokasi sanggar, termasuk fitur edit dan hapus.
* **Peta (`gmap.tsx`)** — Menampilkan titik persebaran sanggar tari pada peta.
* **Form Input Lokasi (`forminputlocation.tsx`)** — Menambahkan data sanggar baru ke database.

### 4. **Fitur Utama**

* Menampilkan peta interaktif berisi marker sanggar tari
* Menambahkan, mengedit, menghapus data lokasi
* Mengambil koordinat otomatis menggunakan GPS
* Navigasi ke Google Maps
* Pembaruan data secara real-time dari Firebase
* Daftar lokasi dalam tampilan list terstruktur

---

## 📄 Form Input Lokasi (forminputlocation.tsx)

Komponen ini digunakan untuk menginput data sanggar tari ke Firebase. Halaman menyediakan form dengan fitur pengambilan koordinat otomatis.

### 🎯 Fungsi Utama

* Input nama sanggar, koordinat, dan akurasi
* Pengambilan lokasi terkini menggunakan Expo Location
* Penyimpanan data melalui Firebase push()
* Validasi input sebelum penyimpanan

### ⚙️ Komponen dan Teknologi

* React Native components (TextInput, ScrollView, TouchableOpacity)
* Expo Location untuk GPS
* Firebase Realtime Database untuk penyimpanan data
* Expo Router untuk navigasi

### 🧭 Alur Kerja

1. Pengguna mengisi nama sanggar
2. Menekan tombol **Ambil Lokasi Sekarang** → aplikasi meminta izin, mengambil koordinat, dan akurasi
3. Pengguna menekan **Simpan Sanggar**
4. Data tervalidasi → dikirim ke Firebase
5. Notifikasi sukses atau gagal muncul

### 🎨 Tema

* Merah budaya (#8E1616)
* Emas tradisional (#FFD700)
* Biru klasik (#2E5EAA)
* Nuansa krem dan putih

### 🔒 Validasi Form

Semua kolom wajib diisi:

* Nama Sanggar
* Koordinat
* Akurasi
  Jika salah satu kosong → muncul alert *"Semua kolom wajib diisi"*.

---

## Tangkapan Layar

<img src="https://github.com/user-attachments/assets/0fd28fe0-0f6b-432a-b51a-97b71fef2a6b" width="180" />

<img src="https://github.com/user-attachments/assets/a5b59d8a-4813-4897-915e-1f22e78eb4ed" width="180" />

<img src="https://github.com/user-attachments/assets/a336bc47-8fe7-4f46-bb33-991fce3886d5" width="180" />

<img src="https://github.com/user-attachments/assets/86467c2f-bce7-4435-9b3d-13ebe8ccbc97" width="180" />

<img src="https://github.com/user-attachments/assets/a6c0ad8b-2859-4baf-abd1-eda4ad1e3f94" width="180" />



## 📚 Sumber Data

Data sanggar tari diambil dari:

1. **Firebase Realtime Database**
   Struktur data:

   ```json
   points/
      └── id_lokasi
           ├── name
           ├── coordinates
           └── accuration
   ```

2. **Koordinat Lokasi**

   * Diinput manual atau diambil otomatis menggunakan GPS
   * Format: "latitude, longitude"

3. **Google Maps**
   Digunakan untuk menampilkan rute ke lokasi sanggar.

---

## 📌 Penutup
README ini menjelaskan struktur, fitur, dan komponen utama aplikasi LANTARI sebagai aplikasi pemetaan sanggar tari berbasis digital.
