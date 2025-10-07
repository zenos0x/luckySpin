function spin() {
  const spinButton = document.querySelector('.spin');
  spinButton.disabled = true;

  wheel.play();
  const box = document.getElementById("box");
  const element = document.getElementById("mainbox");

  // Angles for the center of each of the 4 wheel segments (90 degrees each)
  const prize_map = {
    "bao": 0,
    "momos": 90,
    "better luck next time": 180,
    "French fries": 270
  };

  const prizes = Object.keys(prize_map);
  const selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];

  const prizeAngleCenter = prize_map[selectedPrize];
  // Add or subtract a random value between 0 and 45 degrees
  const offset = (Math.random() * 45) * (Math.random() < 0.5 ? 1 : -1);
  const prizeAngle = prizeAngleCenter + offset;

  console.log(selectedPrize, prizeAngle);

  // The arrow is at the top, pointing to 0 degrees
  const arrowPosition = 0;
  let finalRotation = arrowPosition - prizeAngle;
  finalRotation += 360 * (Math.floor(Math.random() * 5) + 5);

  box.style.setProperty("transition", "all ease 5s");
  box.style.transform = "rotate(" + finalRotation + "deg)";
  element.classList.remove("animate");

  setTimeout(function () {
    element.classList.add("animate");
  }, 5000);

  setTimeout(function () {
    selectedPrize === "better luck next time" ? betterLuck.play() : applause.play();
    swal(
      selectedPrize === "better luck next time" ? "Try Again" : "Congratulations",
      selectedPrize === "better luck next time" ? "Better luck next time!" : "You Won " + selectedPrize + ".",
      selectedPrize === "better luck next time" ? "error" : "success"
    ).then(() => {
      spinButton.disabled = false;
    });
  }, 6000);

  setTimeout(function () {
    box.style.setProperty("transition", "initial");
    box.style.transform = "rotate(90deg)";
  }, 6500);
}
