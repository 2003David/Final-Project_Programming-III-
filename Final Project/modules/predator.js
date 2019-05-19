var LivingCreature = require("./LivingCreature.js");

module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 40;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y + 2],
            [this.x + 2, this.y + 2]

        ];
    }
    chooseCell(character) {
        this.getNewCoordinates();
        return super.chooseCell(character)
    }
    move() {

        var newCell = random(this.chooseCell(0))

        if (newCell) {
            this.energy -= 1;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
        }
    }
    eat() {
        var grasseater = random(this.chooseCell(2));
        if (grasseater) {
            var newX = grasseater[0];
            var newY = grasseater[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            for (var i in grasseaterArr) {
                if (newX == grasseaterArr[i].x && newY == grasseaterArr[i].y) {
                    grasseaterArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 4;
        }
    }
    mul() {
        var newCell = random(this.chooseCell(0));
        if (this.energy >= 41 && newCell) {
            var newpredator = new Predator(newCell[0], newCell[1], this.index);
            predatorArr.push(newpredator);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 40;
        }
    }
    die() {
        if (this.energy <= 5) {
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (this.x == predatorArr[i].x && this.y == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                }
            }
        }
    }
}