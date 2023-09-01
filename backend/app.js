import dotenv from "dotenv";
import express from "express";
import axios from "axios";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

// Connect Mongno
const connectDB = async () => {
  mongoose.connect(process.env.MONGO_URI).then((conn) => {
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  });
};

await connectDB();

// Newsletter
const newsletterSubscriberSchema = new mongoose.Schema(
  {
    subscriber: {
      type: String,
      required: [true, "Please enter your email"],
      lowercase: true,
      trim: true,
    },

    isSubscribed: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const NewsletterSubscriber = mongoose.model(
  "NewsletterSubscriber",
  newsletterSubscriberSchema
);

app.get("/api/hello", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.post("/api/newsletter", async (req, res) => {
  const { email } = req.body;

  const isValidEmail = (email) => {
    const regEx = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regEx.test(email);
  };

  if (!email || !isValidEmail(email)) {
    res.status(400).json({
      success: false,
      message: "Please enter a valid  email",
    });
    return;
  }

  const newsletterSubscriber = await NewsletterSubscriber.findOne({
    subscriber: email,
  });

  if (newsletterSubscriber) {
    res.status(400).json({
      success: false,
      message: "Email already exists",
    });
    return;
  }

  await NewsletterSubscriber.create({
    subscriber: email,
  });

  res.status(200).json({
    success: true,
    message: "Newsletter subscription successful",
  });
  return;
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

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});
