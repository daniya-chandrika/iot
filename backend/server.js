const express = require("express");
const cors = require("cors");
const path = require('path');
app.use(express.static(path.join(__dirname, '../frontend')));

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Serve static frontend files (one level above backend)
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// ✅ Root route -> serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// ✅ Example API endpoint
app.get("/api/status", (req, res) => {
  res.json({ message: "Backend connected ✅" });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
