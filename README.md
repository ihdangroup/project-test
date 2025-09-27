# Project Test - User & Employee Management

## Overview

Project ini merupakan **User & Employee Management System** menggunakan stack:

- **Backend:** Node.js + Express.js + MySQL
- **Frontend:** Next.js + Bootstrap 5

Fitur utama:

- CRUD User
- CRUD Employee
- Autentikasi login/logout



---

## Setup Backend

1. Masuk ke folder backend:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Buat database di MySQL (misal `project_test`)
4. Import database:

```bash
mysql -u root -p project_test < database.sql
```

5. Setup environment variables:

- Copy file `example.env` menjadi `.env`:

```bash
copy example.env .env  # Windows
# atau
cp example.env .env    # Linux/Mac
```

- Edit `.env` sesuai konfigurasi MySQL dan secret key kamu:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=project_test
```

6. Jalankan backend:

```bash
npm run dev
```

Biasanya backend berjalan di: `http://localhost:4000`

---

## Setup Frontend

1. Masuk ke folder frontend:

```bash
cd my-app
```

2. Install dependencies:

```bash
npm install
```

3. Jalankan frontend:

```bash
npm run dev
```

Biasanya frontend berjalan di: `http://localhost:3000`

---

---

## Commands Summary

**Backend**

```bash
cd backend
npm install
npm run dev
```

**Frontend**

```bash
cd my-app
npm install
npm run dev
```

**Database**

```bash
mysql -u root -p project_test < backend/database.sql
```

**Setup .env**

```bash
copy backend/example.env backend/.env
```

---

## Author

Nama: Ikhdan Maghfuron\
Email: [maghikhdan@gmail.com](mailto\:maghikhdan@gmail.com)\
GitHub: ihdangroup

