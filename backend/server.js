import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import studentRoutes from "./routes/studentRoutes.js";

dotenv.config();

const app = express();

// ✅ CORS setup (works for Chrome, Safari, mobile)
app.use(
  cors({
    origin: [
      "https://stbg1.vercel.app", // frontend deployed domain
      "http://localhost:5173",    // for local testing
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// 🧠 Gemini Route — uses fetch (not SDK)
app.post("/api/gemini-college-review", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt || prompt.trim() === "") {
    return res.status(400).json({ message: "Prompt is required." });
  }

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" +
        process.env.GEMINI_API_KEY,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Act as a college counselor for Indian engineering colleges. Provide an objective review in markdown format with sections like Ranking, Courses, Placements, Location. College: ${prompt}`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't fetch the review right now. Please try again later or refine your college name.";

    res.json({ text });
  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({
      message:
        "Sorry, I couldn't fetch the review right now. Please try again later or refine your college name.",
    });
  }
});

// ✅ MongoDB Connection (unchanged)
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Routes
app.use("/api/students", studentRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Server working fine ✅");
});

// ✅ Start server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
