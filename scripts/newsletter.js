const emailInput = document.querySelector(".a1-newsletter input");

const subscribeBtn = document.querySelector(".a1-newsletter button");

const messageElement = document.querySelector(".a1-newsletter div");

subscribeBtn.addEventListener("click", async function () {
  const email = emailInput.value;
  if (email === "") {
    messageElement.textContent = "Please enter your email";
    setTimeout(() => {
      messageElement.textContent = "";
    }, 1500);
  } else {
    const response = await postData("https://rara.cnarmy.in/api/newsletter", {
      email,
    });
    messageElement.textContent = response.message;
    setTimeout(() => {
      messageElement.textContent = "";
    }, 1500);
  }
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
