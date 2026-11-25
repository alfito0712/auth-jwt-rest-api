# Authentication, Authorization, dan JWT REST API

REST API demo dengan Express, JSON file storage (tanpa database native), bcrypt, dan JWT.

## Fitur
- Register dan hashing password bcrypt
- Login dengan JWT (default expiry 1 jam)
- Middleware verifikasi token
- Role authorization: `user` dan `admin`
- Endpoint profil terlindungi
- Endpoint daftar pengguna untuk Admin

## Instalasi
Pastikan Node.js telah terpasang.

```bash
npm.cmd install
```
Buat file `.env` dengan menyalin `.env.example` dan isi `JWT_SECRET` dengan secret yang kuat. Jangan upload `.env`.

## Jalankan
```bash
npm.cmd start
```
Server: http://localhost:3000

## Endpoint
| Method | Endpoint | Akses |
|---|---|---|
| GET | `/` | Publik |
| POST | `/api/auth/register` | Publik |
| POST | `/api/auth/login` | Publik |
| GET | `/api/users/profile` | Token valid |
| GET | `/api/admin/users` | Admin |

## Contoh Register
POST `/api/auth/register`
```json
{ "name": "Fidz", "email": "fidz@example.com", "password": "password123" }
```

## Contoh Login
POST `/api/auth/login`
```json
{ "email": "fidz@example.com", "password": "password123" }
```
Ambil token dari respons, lalu gunakan header `Authorization: Bearer TOKEN`.

## Jadikan akun Admin
Setelah akun didaftarkan, hentikan server lalu jalankan:
```bash
node -e "const db=require('./src/db'); console.log(db.setRole('fidz@example.com','admin')?'Admin set':'Email tidak ditemukan')"
```
Ubah email dengan email akunmu. Start server kembali dan login ulang supaya token memuat role terbaru.

## Kode status
- 201: registrasi sukses
- 200: berhasil
- 400: input kurang
- 401: token/kredensial salah atau tidak ada
- 403: role tidak diizinkan
- 409: email duplikat

Data user disimpan pada `database.json` lokal. File ini di-ignore Git.
