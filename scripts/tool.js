const formElement = document.getElementById("toolform");

const submitBtn = document.getElementById("tool-submit-btn");

submitBtn.addEventListener("click", async () => {
  const gender = document.getElementById("gender").value;
  const age = document.getElementById("age").value;
  const studyYear = document.getElementById("studyYear").value;
  const living = document.getElementById("living").value;
  const transporting = document.getElementById("transporting").value;
  const smoking = document.getElementById("smoking").value;
  const drinks = document.getElementById("drinks").value;
  const hobbies = document.getElementById("hobbies").value;
  const jobs = document.getElementById("jobs").value;
  const scholarship = document.getElementById("scholarship").value;
  const cosmetics = document.getElementById("cosmetics").value;
  const sub = document.getElementById("sub").value;
  console.log(`${gender} ${age} ${studyYear} ${living} ${transporting}`);
  console.log(`${smoking} ${drinks} ${hobbies} ${cosmetics} ${sub}`);
  const response = await postData("http://localhost:5005/api/prediction", {
    gender,
    age,
    studyYear,
    living,
    transporting,
    smoking,
    drinks,
    hobbies,
    jobs,
    scholarship,
    cosmetics,
    sub,
  });
  const predictionElement = document.getElementById("prediction-result");
  predictionElement.style.visibility = "visible";
  predictionElement.innerHTML = ` <h4>Your Predicted Monthly Budget is ${response.message.prediction}</h4>`;
  console.log(response.message);
});

async function postData(url, data) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  try {
    const response = await fetch(url, options);
    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.error("Error:", error);
  }
}
