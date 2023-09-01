import dotenv from "dotenv";
import express from "express";

const app = express();
dotenv.config();

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});
