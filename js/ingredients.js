//adding ingredients

function getImage(name) {
  const img = new Image();
  img.src = `images/${name}`;
  return img;
}

class Ingredients {
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
    this.maxX = canvas.width - this.width;
    this.maxY = canvas.height - this.height;
    this.addRandomIngredient();
  }

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
    //this.ingredients = this.ingredients.map(({y, ...props}) => ({...props, y: y + 1}));
  }

  draw() {
    console.log("draw");
    this.ingredients.forEach((ing) => {
      switch (ing.type) {
        case "image":
          // console.log(ing);
          this.ctx.drawImage(ing.img, ing.x, ing.y, this.width, this.height);
          break;
        default:
          break;
      }
    });
  }

  static intersects(obj, ingr) {
    const minX = obj.x;
    const minY = obj.y;
    const maxX = obj.x + obj.width;
    const maxY = obj.y + obj.height;
    const withinX = minX <= ingr.x && ingr.x + ingr.width <= maxX;
    const withinY = minY <= ingr.y && ingr.y + ingr.height <= maxY;
    console.log({ minX, minY, maxX, maxY, withinX, withinY, ingr });
    if (withinX && withinY) {
      console.debug("intersect");
    }
    return withinX && withinY;
  }
}
