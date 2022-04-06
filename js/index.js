//adding ingredients
const ingredients = [
  { name: "tomatoe", img: "tomatoe.png" },
  { name: "cheese", img: "cheese.png" },
  { name: "bread", img: "bread.png" },
];

// add bad elements

document.querySelector(".start-button").addEventListener("click", () => {
  const game = new Game();
  game.start();
});

class Game {
  constructor() {
    this.canvas = document.getElementById("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.fps = 60;
    this.moveSpeed = 1;
    this.spawnInterval = (4 * 80) / this.moveSpeed;
    this.avatar = new Avatar(this.canvas, this.ctx);
    this.ingr = new Ingredients(this.canvas, this.ctx, this.moveSpeed);
  }

  start() {
    console.log("start");
    this.createEventListeners();
    setInterval(() => this.update(), 1000 / this.fps);
  }

  update() {
    console.log("update");
    this.clear();
    this.avatar.draw();
    this.ingr.draw();
    this.ingr.move();
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  createEventListeners() {
    document.addEventListener("keydown", (e) => this.avatar.move(e.key));
  }
}

function pickIngredients() {
  let pickedIng = [];
  let picked = false;
  for (let i = 0; i < ingredients.length; i++) {
    const ing = ingredients[i];
    const withinX =
      avatar.x + avatar.width > ingr.x && avatar.x < ingr.x + ingr.width;
    const withinY =
      ingr.y + ingr.height > avatar.y && ingr.y < ingr.y + ingr.height;

    picked = withinX && withinY;

    if (picked) {
      break;
    }
  }
  return picked;
}
