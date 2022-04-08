//adding ingredients

// will call later this function to display images
function getImage(name) {
  const img = new Image();
  img.src = `images/${name}`;
  return img;
}

class Ingredients {
  // Variables of the class(Ingredients)
  // array of ingredients inside the bread, to make the order logic after
  ingredientsInsideBreadModel = [
    {
      type: "image",
      name: "tomatoe",
      img: getImage("tomatoe.png"),
      width: 30,
      height: 30,
    },
    {
      type: "image",
      name: "cheese",
      img: getImage("cheese.png"),
      width: 30,
      height: 30,
    },
    {
      type: "image",
      name: "burguer",
      img: getImage("meat.png"),
      width: 30,
      height: 30,
    },
  ];

  // all the ingredients in game to draw them and make them fall
  ingredientsModel = [
    ...this.ingredientsInsideBreadModel,
    {
      type: "image",
      name: "bread",
      img: getImage("bread.png"),
      width: 30,
      height: 30,
    },
  ];

  constructor(canvas, ctx, moveSpeed) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ingredients = [];
    this.moveSpeed = moveSpeed;
    this.addRandomIngredient();
  }

  reset() {
    this.ingredients = [];
  }

  // Creating the burguer goal with ingredients inside the bread
  createGoalBread(amountOfIng) {
    const insideIng = [];
    insideIng.push(this.ingredientsModel[this.ingredientsModel.length - 1]);
    for (let i = 0; i < amountOfIng; i++) {
      const idx = Math.floor(
        Math.random() * this.ingredientsInsideBreadModel.length
      );
      insideIng.push(this.ingredientsModel[idx]);
    }
    insideIng.push(this.ingredientsModel[this.ingredientsModel.length - 1]);
    return insideIng;
  }

  addRandomIngredient() {
    const percent = 0.8; // % of the canvas
    const idx = Math.floor(Math.random() * this.ingredientsModel.length); // index of the random ing
    const baseIng = this.ingredientsModel[idx]; // random ing
    const maxX = this.canvas.width - baseIng.width; // creating boundries
    const x = Math.floor((Math.random() * percent + (1 - percent) / 2) * maxX); // centralizing the choosen percent of the canvas where the ingredients will fall, margin
    const ing = {
      ...baseIng,
      x,
      y: -baseIng.height,
    };
    this.ingredients.push(ing);
  }

  // moving ing along y
  move() {
    this.ingredients = this.ingredients.map((ing) => ({
      ...ing,
      y: ing.y + this.moveSpeed,
    }));
  }

  // drawing ingredients, iterate and draw each one
  draw() {
    console.log("draw");
    this.ingredients.forEach((ing) => {
      switch (ing.type) {
        case "image":
          // console.log(ing);
          this.ctx.drawImage(ing.img, ing.x, ing.y, ing.width, ing.height);
          break;
        default:
          break;
      }
    });
  }

  // collision logic, checking if ingredient is at some point in-beteewn the avatar rect
  static intersects(obj, ingr) {
    const minX = obj.x;
    const minY = obj.y;
    const maxX = obj.x + obj.width;
    const maxY = obj.y + obj.height;
    const withinX = minX <= ingr.x && ingr.x + ingr.width <= maxX;
    const withinY = minY <= ingr.y && ingr.y + ingr.height <= maxY;
    //  console.log({ minX, minY, maxX, maxY, withinX, withinY, ingr });
    /*  if (withinX && withinY) {
      console.debug("intersect");
    } */
    return withinX && withinY;
  }
}
