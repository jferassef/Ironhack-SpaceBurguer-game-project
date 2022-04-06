//adding ingredients

function getImage(name) {
  const img = new Image();
  img.src = `images/${name}`;
  return img;
}

class Ingredients {
  ingredientsModel = [
    { type: "image", name: "tomatoe", img: getImage("tomatoe.png") },
    { type: "image", name: "cheese", img: getImage("cheese.png") },
    { type: "image", name: "bread", img: getImage("bread.png") },
  ];

  width = 30;
  height = 30;

  constructor(canvas, ctx, moveSpeed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ingredients = [];
    this.moveSpeed = moveSpeed;
    this.maxX = canvas.width - this.width;
    this.maxY = canvas.height - this.height;
    this.addRandomIngredient();
  }

  addRandomIngredient() {
    const idx = Math.floor(Math.random() * this.ingredientsModel.length);
    const x = Math.floor(Math.random() * this.maxX);
    const ing = {
      ...this.ingredientsModel[idx],
      x,
      y: -this.height,
    };
    this.ingredients.push(ing);
  }

  move() {
    console.log("move");
    this.ingredients = this.ingredients.map((ing) => ({
      ...ing,
      y: ing.y + this.moveSpeed,
    }));
    // this.ingredients = this.ingredients.map(({y, ...props}) => ({...props, y: y + 1}));
  }

  draw() {
    console.log("draw");
    this.ingredients.forEach((ing) => {
      switch (ing.type) {
        case "image":
          console.log(ing);
          this.ctx.drawImage(ing.img, ing.x, ing.y, this.width, this.height);
          break;

        default:
          break;
      }
    });
  }

  // ingredients will only move along y
}
