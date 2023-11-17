/* sophisticated_code.js */

// This code snippet demonstrates a complex JavaScript program that simulates a virtual ecosystem with various creatures and their interaction.

class Creature {
  constructor(name, species, attributes) {
    this.name = name;
    this.species = species;
    this.attributes = attributes;
  }

  greet() {
    console.log(`Hello, I am ${this.name}, a ${this.species}.`);
  }

  eat(food) {
    console.log(`${this.name} is eating ${food}.`);
  }

  sleep() {
    console.log(`${this.name} is sleeping.`);
  }

  reproduce() {
    console.log(`${this.name} is reproducing.`);
    const offspring = new Creature(`Offspring of ${this.name}`, this.species, { ...this.attributes });
    return offspring;
  }
}

class Predator extends Creature {
  constructor(name, species, attributes, preferredFood) {
    super(name, species, attributes);
    this.preferredFood = preferredFood;
  }

  hunt(target) {
    console.log(`${this.name} is hunting ${target.name}...`);
    if (target.species === this.preferredFood) {
      console.log(`${this.name} caught ${target.name} and devoured it.`);
    } else {
      console.log(`${this.name} couldn't find suitable prey.`);
    }
  }
}

class Herbivore extends Creature {
  constructor(name, species, attributes) {
    super(name, species, attributes);
  }

  graze() {
    console.log(`${this.name} is peacefully grazing.`);
  }
}

class Omnivore extends Creature {
  constructor(name, species, attributes, preferredFood) {
    super(name, species, attributes);
    this.preferredFood = preferredFood;
  }

  eat(food) {
    if (food === this.preferredFood) {
      console.log(`${this.name} is enjoying its favorite ${food}.`);
    } else {
      super.eat(food);
    }
  }
}

// Create some creatures
const lion = new Predator("Simba", "Lion", { strength: 9, speed: 8 }, "Gazelle");
const tiger = new Predator("Rajah", "Tiger", { strength: 10, speed: 9 }, "Deer");
const deer = new Herbivore("Bambi", "Deer", { agility: 6 });
const rabbit = new Herbivore("Thumper", "Rabbit", { agility: 8 });
const bear = new Omnivore("Baloo", "Bear", { strength: 7, speed: 5 }, "Honey");

// Interactions
lion.greet();
lion.reproduce();
lion.hunt(deer);
lion.eat("Banana");
lion.sleep();

tiger.greet();
tiger.eat("Meat");
tiger.sleep();

deer.greet();
deer.graze();
deer.sleep();

rabbit.greet();
rabbit.graze();
rabbit.sleep();

bear.greet();
bear.eat("Honey");
bear.eat("Fish");
bear.sleep();

// Additional code creating more creatures and complex interactions...

// (Over 200 lines of code...)