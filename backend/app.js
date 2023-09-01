import dotenv from "dotenv";
import express from "express";
import axios from "axios";

const app = express();
dotenv.config();
app.use(express.json());

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post("/api/newsletter", (req, res) => {
  res.json({
    message: "Newsletter",
  });
});

app.post("/api/prediction", async (req, res) => {
  const preferences = req.body;
  console.log(preferences);
  const setPredict = async () => {
    try {
      const res = await axios.post("http://127.0.0.1:8000/predict", {
        Gender: preferences.gender,
        Age: Number(preferences.age),
        Study_year: Number(preferences.studyYear),
        Living: preferences.living,
        Scholarship: preferences.scholarship,
        Part_time_job: preferences.jobs,
        Transporting: preferences.transporting,
        Smoking: preferences.smoking,
        Drinks: preferences.drinks,
        Games_Hobbies: preferences.hobbies,
        Cosmetics_Self_Care: preferences.cosmetics,
        Monthly_Subscription: preferences.sub,
      });
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  const predictedBudget = await setPredict();

  res.json({
    message: predictedBudget,
  });
});

app.post("/api/contact", (req, res) => {
  res.json({
    message: "Prediction",
  });
});

app.use((req, res) => {
  res.status(404).json({
    message:
      "Ohh you are lost, read the API documentation to find your way back home :)",
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});
