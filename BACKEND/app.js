// // import authRoutes from "./routes/auth.js";


// // app.use("/api/auth", authRoutes);


// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// import chatRoutes from "./routes/chat.js";

// const app = express();

// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "DELETE", "OPTIONS"],
//   })
// );

// app.use(express.json());

// app.get("/", (req, res) => {
//   res.send("✅ Backend running (Firebase)");
// });

// app.use("/api", chatRoutes);

// export default app;



import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

// ✅ 1. UNCOMMENTED the auth routes
import authRoutes from "./routes/auth.js";
import chatRoutes from "./routes/chat.js";

const app = express();

// ✅ 2. UPDATED CORS to allow both localhost (for testing) and your live Render frontend
app.use(
  cors({
    origin: ["http://localhost:5173", "https://esec-gpt-2.onrender.com"], 
    methods: ["GET", "POST", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("✅ Backend running (Firebase)");
});

// ✅ 3. UNCOMMENTED the API route
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

export default app;

