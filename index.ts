import express from "express";
import cors from "cors";

const app = express();

app.use(
  express.json({
    limit: "20kb",
  })
);
const PORT = 8000;

app.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      const allowedOrigins = ["http://localhost:3000", "*"];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.get("/", (req, res) => {
  res.send("Hello, World i'm niraj!");
});

app.listen(PORT, () => {
  console.log(`Server is running in port ${PORT}`);
});
