export const setPref = catchAyncErrors(async (req, res, next) => {
  const preferences = req.body;
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
  // res.status(200).json({
  //   messege: predictedBudget.prediction,
  // });
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { preferences: preferences, pBudget: predictedBudget.prediction },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );
  await user.save();
  res.status(200).json({
    messege: predictedBudget.prediction,
  });
});
