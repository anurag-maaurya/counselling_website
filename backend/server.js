import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();
const app = express();

// ✅ CORS setup
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // frontend
      "http://localhost:5173", // local dev
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// ✅ MongoDB Connection (DO NOT TOUCH)
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err.message));

// ✅ Student Routes
app.use("/api/students", studentRoutes);

// ✅ Gemini Route (fully isolated)
app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) return res.status(400).json({ message: "Prompt required" });

  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("Gemini API Key missing!");
      return res.status(500).json({ message: "Missing Gemini API Key" });
    }

    const r = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Give a short structured review (Ranking, Courses, Placements, Location) for the Indian college: ${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await r.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, no response from Gemini API.";

    res.json({ text });
  } catch (err) {
    console.error("Gemini Error:", err.message);
    res.status(500).json({ message: "Server Error" });
  }
});

// ✅ Health check
app.get("/", (req, res) => res.send("Server up ✅"));

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Backend running on ${PORT}`));
