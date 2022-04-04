//adding ingredients
/* const ingredients [
  {name:cheese
},
{name:bread
},
{name:tomatoe
},
{name:meat
}

// add bad elements
] */

document.querySelector(".start-button").addEventListener("click", startGame);

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
console.log("Hey");

let avatar;
let intervalId;
function startGame() {
  avatar = new Avatar(canvas, ctx);
  createEventListeners();
  update();
}

function update() {
  clear();
  avatar.draw();
  intervalId = requestAnimationFrame(update);
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function createEventListeners() {
  document.addEventListener("keydown", (e) => {
    switch (e.key) {
      case "ArrowRight":
        avatar.moveRight();
        break;
      case "ArrowLeft":
        avatar.moveLeft();
        break;
      default:
        break;
    }
  });
}
