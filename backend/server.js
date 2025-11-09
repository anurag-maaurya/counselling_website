import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes.js";

// 1. IMPORT dotenv and initialize it FIRST to load all environment variables, 
// including MONGO_URI and GEMINI_API_KEY
import dotenv from 'dotenv';
dotenv.config(); 

// 2. IMPORT the Google Gen AI SDK
import { GoogleGenAI } from "@google/genai";


const app = express();

// ✅ Allow specific origin for frontend communication
app.use(
  cors({
    origin: "http://localhost:5173", // your frontend
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);


// ✅ Parse JSON requests
app.use(express.json());

// 3. Initialize the Gemini client using the API key from the .env file
// The key is accessed via process.env.GEMINI_API_KEY
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


// --- NEW: Route for College Review AI ---
app.post('/api/gemini-college-review', async (req, res) => {
    // Get the prompt (college name + instructions) from the frontend
    const { prompt } = req.body;
    
    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required in the request body.' });
    }

    // Define system instructions for reliable, factual output
    const systemInstruction = 
        "Act as a professional college counselor specializing in Indian engineering admissions. Provide a concise, objective, and factual review of the institution. Focus on NIRF ranking (if available), top branches, placement statistics (average CTC), and location advantage. Format the output using clear headings and markdown.";

    try {
        // Call the Gemini API
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash", 
            contents: prompt,
            config: {
                systemInstruction: systemInstruction,
            },
        });
        
        // Send the AI-generated text back to the React frontend
        res.json({ text: response.text });
        
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        res.status(500).json({ message: 'Failed to retrieve AI review. Check backend logs.' });
    }
});


// ✅ Connect MongoDB - NOW USING ATLAS URI from Environment Variables
mongoose
  .connect(process.env.MONGO_URI) // <--- CRUCIAL CHANGE HERE
  .then(() => console.log("✅ MongoDB Atlas Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ✅ Existing Routes
app.use("/api/students", studentRoutes);

// ✅ Root route
app.get("/", (req, res) => {
  res.send("Server working fine ✅");
});

// ✅ Start server
const PORT = 5001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));