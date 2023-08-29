const slides = document.getElementsByClassName("a1-client");
const slideBtns = document.getElementsByClassName("a1-dot");

slides[0].style.display = "block";
slideBtns[0].classList.add("active");

const numberOfButtons = slideBtns.length;

for (let i = 0; i < numberOfButtons; i++) {
  slideBtns[i].addEventListener("click", handleSlide);
  console.log(slideBtns[i]);
}

function handleSlide(e) {
  if (e.target.id === "a1") {
    slides[0].style.display = "block";
    slideBtns[0].classList.add("active");
    slides[1].style.display = "none";
    slideBtns[1].classList.remove("active");
    slides[2].style.display = "none";
    slideBtns[2].classList.remove("active");
  } else if (e.target.id === "a2") {
    slides[1].style.display = "block";
    slideBtns[1].classList.add("active");
    slides[0].style.display = "none";
    slideBtns[0].classList.remove("active");
    slides[2].style.display = "none";
    slideBtns[2].classList.remove("active");
  } else {
    slides[2].style.display = "block";
    slideBtns[2].classList.add("active");
    slides[0].style.display = "none";
    slideBtns[0].classList.remove("active");
    slides[1].style.display = "none";
    slideBtns[1].classList.remove("active");
  }
}
