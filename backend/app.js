import express from "express";

const app = express();

const PORT = 5005;

app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});
