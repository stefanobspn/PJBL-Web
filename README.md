# Proyek eCommerce "Aura" (Vanilla JS)

Ini adalah proyek web e-commerce front-end yang sepenuhnya fungsional, dibangun hanya dengan HTML, CSS, dan JavaScript vanilla. Proyek ini tidak menggunakan framework atau library eksternal (selain Google Fonts & Font Awesome) dan tidak memerlukan build step. Semua data disimpan secara lokal di browser menggunakan `localStorage`.

## Fitur

-   **Desain Minimalis & Responsif**: Tampilan yang bersih, modern, dan beradaptasi di berbagai ukuran layar (mobile, tablet, desktop).
-   **Katalog Produk**: Halaman utama menampilkan produk unggulan, dan halaman produk menampilkan semua item.
-   **Detail Produk**: Halaman individual untuk setiap produk dengan deskripsi, harga, dan gambar.
-   **Sistem Pengguna**: Pengguna dapat mendaftar dan login. Status login mereka akan diingat.
-   **Keranjang Belanja**: Fungsionalitas penuh untuk menambah, menghapus, dan mengubah jumlah produk di keranjang.
-   **Proses Checkout**: Alur checkout sederhana dengan ringkasan pesanan dan form informasi pengguna.
-   **Penyimpanan Client-Side**: `localStorage` digunakan sebagai database untuk produk, pengguna, dan keranjang.

## Struktur Proyek

```
/
├── index.html              # Halaman utama (Home)
├── pages/                  # Berisi semua halaman HTML lainnya
│   ├── products.html
│   ├── product-detail.html
│   ├── login.html
│   ├── register.html
│   ├── cart.html
│   └── checkout.html
│
├── assets/
│   ├── css/
│   │   └── style.css       # Stylesheet utama
│   ├── js/
│   │   ├── main.js         # Entry point, "router", dan event handler utama
│   │   ├── db.js           # "Database" produk dan inisialisasi localStorage
│   │   ├── auth.js         # Logika autentikasi pengguna
│   │   ├── cart.js         # Logika keranjang belanja
│   │   └── ui.js           # Fungsi helper untuk merender elemen HTML
│   └── img/
│       └── (kosong)        # Tempat untuk menaruh gambar produk Anda
│
└── README.md
```

## Cara Menjalankan Proyek

Tidak ada instalasi yang diperlukan. Cukup ikuti langkah-langkah ini:

1.  Unduh atau clone semua file proyek ini ke komputer Anda, pastikan struktur foldernya tetap sama.
2.  **Rekomendasi**: Gunakan web server lokal untuk menghindari masalah dengan path file dan request. Cara termudah adalah menggunakan ekstensi **Live Server** di Visual Studio Code.
    -   Buka folder proyek di VS Code.
    -   Klik kanan pada file `index.html`.
    -   Pilih "Open with Live Server".
3.  **Alternatif**: Anda juga bisa langsung membuka file `index.html` di browser Anda. Namun, navigasi antar halaman mungkin memerlukan penyesuaian path secara manual jika tidak menggunakan server.

## Penjelasan Alur Kerja & Logika

### 1. Inisialisasi & Routing
-   Saat halaman dimuat, `assets/js/main.js` akan dieksekusi.
-   Fungsi `initApp()` akan pertama kali memperbarui header (menampilkan jumlah item di keranjang dan status login/logout) lalu memanggil fungsi `route()`.
-   Fungsi `route()` bertindak sebagai "router" sisi klien yang sederhana. Ia memeriksa URL path (`window.location.pathname`) untuk menentukan halaman mana yang sedang aktif.
-   Berdasarkan halaman yang aktif, ia akan memanggil fungsi yang sesuai untuk memuat data dan mengatur event listener (misalnya `loadHomePage()`, `setupLoginForm()`, dll).

### 2. Alur Data (LocalStorage)
Aplikasi menggunakan `localStorage` untuk menyimpan tiga jenis data utama:
-   **`products`**: Disalin dari array di `db.js` saat pertama kali dimuat.
-   **`users`**: Sebuah array objek pengguna yang terdaftar.
-   **`cart`**: Sebuah array objek yang merepresentasikan item di keranjang (`{ id, qty }`).
-   **`currentUser`**: Sebuah objek yang menyimpan data pengguna yang sedang login. Kehadiran objek ini menandakan sesi aktif.

### 3. Alur Login & Registrasi (`auth.js`)
-   **Registrasi**: Saat form registrasi disubmit, `registerUser()` memeriksa apakah email sudah ada. Jika tidak, ia menambahkan pengguna baru ke array `users` di `localStorage`.
-   **Login**: `loginUser()` mencari pengguna berdasarkan email dan password di array `users`. Jika cocok, data pengguna disimpan ke `currentUser` di `localStorage`, dan pengguna dianggap login.
-   **Status Login**: Fungsi `isLoggedIn()` hanya memeriksa apakah `currentUser` ada di `localStorage`.

### 4. Alur Keranjang Belanja (`cart.js` & `ui.js`)
-   **Menambah Item**: `addToCart(productId)` akan mengambil array `cart` dari `localStorage`, menambahkan atau memperbarui kuantitas produk, lalu menyimpannya kembali.
-   **Menampilkan Keranjang**: Pada halaman keranjang, `getCartItems()` menggabungkan data dari `cart` dan `products` untuk mendapatkan detail lengkap setiap item. Kemudian, `renderCartPage()` dari `ui.js` menghasilkan HTML untuk ditampilkan.
-   Setiap aksi pada keranjang (tambah, hapus, update) akan selalu memanggil `saveCart()` yang kemudian memperbarui `localStorage` dan ikon jumlah di header.

## Kustomisasi & Modifikasi

### Menambah/Mengubah Produk
1.  Buka file `assets/js/db.js`.
2.  Edit array `products` di bagian atas file. Tambahkan objek produk baru atau modifikasi yang sudah ada. Pastikan setiap produk memiliki `id` yang unik.
3.  Tambahkan file gambar yang sesuai ke dalam folder `assets/img/` dan pastikan path `image` di objek produk benar.
4.  Untuk menerapkan perubahan, Anda mungkin perlu membersihkan `localStorage` di browser Anda agar aplikasi kembali mengambil data dari `db.js`. Caranya: buka Developer Tools (F12) > Application > Local Storage > klik kanan pada domain Anda > Clear.

### Mengubah Tampilan & Gaya
1.  Buka file `assets/css/style.css`.
2.  **Warna, Font, Spasi**: Ubah nilai variabel CSS di dalam blok `:root` di bagian atas file. Ini adalah cara tercepat untuk mengubah skema desain secara global.
3.  **Layout & Komponen**: Edit kelas CSS yang sesuai untuk mengubah tampilan komponen tertentu seperti `.product-card`, `.btn`, atau `.header`.

## Saran Peningkatan Lanjutan

Proyek ini adalah fondasi yang solid. Berikut adalah beberapa ide untuk mengembangkannya lebih lanjut:
-   **Fungsi Pencarian & Filter**: Tambahkan input pencarian untuk mencari produk berdasarkan nama, dan tombol filter untuk menyaring berdasarkan kategori.
-   **Wishlist**: Buat sistem wishlist yang mirip dengan sistem keranjang.
-   **Halaman Admin**: Buat halaman admin terproteksi (dengan login khusus) untuk mengelola produk (CRUD - Create, Read, Update, Delete) langsung dari UI, bukan melalui kode.
-   **Integrasi Backend**: Ganti `localStorage` dengan database sungguhan (seperti MongoDB, PostgreSQL) dan buat API menggunakan Node.js/Express atau platform backend lainnya. Ini akan memungkinkan data persist across devices dan membuka jalan untuk fitur seperti riwayat pesanan.
-   **Animasi Lanjutan**: Tambahkan animasi yang lebih canggih menggunakan library seperti GSAP atau sekadar transisi CSS yang lebih kompleks untuk page load atau saat item ditambahkan ke keranjang.
-   **Dark Mode**: Implementasikan tombol untuk beralih antara tema terang dan gelap dengan mengubah variabel warna CSS via JavaScript.
