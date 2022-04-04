//adding ingredients
/* const ingredients [
  {name:cheese,
  img:"images\cheese.png",
  good: true,
},
{name:bread,
  img:"images\bread.png",
  good: true,
},
{name:tomatoe,
  img:"images\tomatoe.png",
  good: true,
},
{name:meat,
  img:"images\meat.png",
  good: true,
}

// add bad elements
] */

class Ingredients {
  constructor(canvas, ctx, ingredients) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.ingredients = this.ingredients;
    this.pickedIngredients = [];
    this.image = null;
    this.ingredientsSpeed = 2;
    this.width = 30;
    this.height = 80;
    this.y = this.canvas.height;
    this.x = this.canvas.width;
    this.init();
  }

  // method for ingredients that will fall randomly
  fallingIngredients() {
    let randomIngredients = [];
    for (let i = 0; i < this.ingredients.length; i++) {
      pickRandom = Math.floor(Math.random() * this.ingredients[i].length);
      randomIngredients.push(pickRandom);
    }
  }

  // ingredients will only move along y
  move() {
    this.y += this.moveSpeed;
  }
  /* pickingIngredients() {
    for (let i = 0; i < ingredients.length; i++) {
      // will push the picked ingredients to the array, if they touch the plate

      this.pickedIngredients.push(this.ingredients[i]);
    }
  }*/
}
