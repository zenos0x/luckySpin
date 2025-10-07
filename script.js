function shuffle(array) {
  var currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

function spin() {
  const spinButton = document.querySelector('.spin');
  spinButton.disabled = true;

  wheel.play();
  const box = document.getElementById("box");
  const element = document.getElementById("mainbox");

  // Angles for the center of each of the 10 wheel segments.
  // Assumes even distribution (36 degrees per segment).
  // Item 1 (French Fries) is assumed to be centered at 18 degrees.
  const prize_map = {
    "French fries": [18, 198],
    "bao": [54, 234],
    "milk shake": [90, 270],
    "momos": [126, 306],
    "wings": [162, 342],
  };

  const prizes = Object.keys(prize_map);
  const selectedPrize = prizes[Math.floor(Math.random() * prizes.length)];

  const angles = prize_map[selectedPrize];
  const prizeAngle = angles[Math.floor(Math.random() * angles.length)];

  // The arrow is on the left side, pointing to the 180-degree mark.
  const arrowPosition = 0;
  
  // We rotate the wheel so the prizeAngle aligns with the arrowPosition.
  let finalRotation = arrowPosition - prizeAngle;

  // Add full rotations for the spinning effect.
  finalRotation += 360 * (Math.floor(Math.random() * 5) + 5);

  box.style.setProperty("transition", "all ease 5s");
  box.style.transform = "rotate(" + finalRotation + "deg)";
  element.classList.remove("animate");

  setTimeout(function () {
    element.classList.add("animate");
  }, 5000);

  setTimeout(function () {
    applause.play();
    swal(
      "Congratulations",
      "You Won " + selectedPrize + ".",
      "success"
    ).then(() => {
      // spinButton.disabled = false;
    });
  }, 5500);

  setTimeout(function () {
    box.style.setProperty("transition", "initial");
    box.style.transform = "rotate(90deg)";
  }, 6000);
}
