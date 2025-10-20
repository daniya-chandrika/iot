
-- SQLite DB init for Hospital Monitoring prototype
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE,
  password TEXT,
  role TEXT,
  display_name TEXT
);

CREATE TABLE IF NOT EXISTS doctors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  specialization TEXT,
  status TEXT -- e.g., 'available', 'in_surgery', 'off'
);

CREATE TABLE IF NOT EXISTS patients (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  contact TEXT
);

CREATE TABLE IF NOT EXISTS check_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  doctor_id INTEGER,
  status TEXT,
  timestamp TEXT,
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

CREATE TABLE IF NOT EXISTS appointments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  patient_id INTEGER,
  doctor_id INTEGER,
  datetime TEXT,
  status TEXT,
  FOREIGN KEY (patient_id) REFERENCES patients(id),
  FOREIGN KEY (doctor_id) REFERENCES doctors(id)
);

-- Seed data
INSERT INTO users (username, password, role, display_name) VALUES ('director1', 'pass123', 'director', 'Director One');
INSERT INTO users (username, password, role, display_name) VALUES ('doctor1', 'docpass', 'doctor', 'Dr. Alice');
INSERT INTO users (username, password, role, display_name) VALUES ('patient1', 'patientpass', 'patient', 'John Doe');

INSERT INTO doctors (name, specialization, status) VALUES ('Dr. Alice', 'Cardiology', 'available');
INSERT INTO doctors (name, specialization, status) VALUES ('Dr. Bob', 'Orthopedics', 'off');
INSERT INTO doctors (name, specialization, status) VALUES ('Dr. Carol', 'Pediatrics', 'in_surgery');

INSERT INTO patients (name, contact) VALUES ('John Doe', '9999999999');
INSERT INTO patients (name, contact) VALUES ('Mary Jane', '8888888888');

-- One sample log
INSERT INTO check_logs (doctor_id, status, timestamp) VALUES (1, 'available', datetime('now'));
