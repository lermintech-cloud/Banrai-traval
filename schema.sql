-- ฐานข้อมูลใหม่ของระบบเบิกค่าเดินทางไปราชการ (Cloudflare D1)
CREATE TABLE IF NOT EXISTS trips(id TEXT PRIMARY KEY, data TEXT NOT NULL, updated INTEGER);
CREATE TABLE IF NOT EXISTS settings(k TEXT PRIMARY KEY, v TEXT);
