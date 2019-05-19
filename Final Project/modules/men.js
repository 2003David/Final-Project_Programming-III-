var LivingCreature = require("./LivingCreature.js");

module.exports = class Men extends LivingCreature  {
    constructor(x, y, index) {
        super(x,y,index);
        this.energy = 50;
    }
    getNewCoordinates_mul() {
        this.directions = [
            [this.x, this.y - 1],
            [this.x - 1, this.y],                          //  0 0 1 0 0
            [this.x + 1, this.y],                          //  0 1 8 1 0
            [this.x, this.y + 1]                           //  0 0 1 0 0

        ];
    }
    getNewCoordinates_move() {
        this.directions = [
            [this.x - 2, this.y - 2],                 //  0 0 0 0 0 0 0 
            [this.x + 2, this.y - 2],                 //  0 1 0 0 0 1 0 
            [this.x - 1, this.y - 1],                 //  0 0 1 0 1 0 0
            [this.x + 1, this.y],                 //  0 0 0 8 0 0 0 
            [this.x - 1, this.y + 1],                 //  0 0 1 0 1 0 0 
            [this.x + 1, this.y + 1],                 //  0 1 0 0 0 1 0
            [this.x - 2, this.y + 2]                  //  0 0 0 0 0 0 0     
        ];
    }
    getNewCoordinates_eat() {
        this.directions = [
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2]
        ];
    }
    getNewCoordinates_die() {
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

    chooseCellforMul(character) {
        this.getNewCoordinates_mul();
        return super.chooseCell(character);
    }
    chooseCellforEat(character) {
        this.getNewCoordinates_eat();
        return super.chooseCell(character);
    }
    chooseCellforMove(character) {
        this.getNewCoordinates_move();
        return super.chooseCell(character);
    }
    
    move() {

        var newCell = random(this.chooseCellforMove(0))

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
        var predator = random(this.chooseCellforEat(3));
        if (predator) {
            var newX = predator[0];
            var newY = predator[1];
            matrix[newY][newX] = this.index;
            matrix[this.y][this.x] = 0;
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1);
                    break;
                }
            }
            this.x = newX;
            this.y = newY;
            this.energy += 10;
        }
    }
    mul() {
        var newCell = random(this.chooseCellforMul(0));
        if (this.energy >= 55 && newCell) {
            var newMen = new Men(newCell[0], newCell[1], this.index);
            menArr.push(newMen);
            matrix[newCell[1]][newCell[0]] = this.index;
            this.energy = 50;
        }
    }
    die() {
        if (this.energy <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in menArr) {
                if (this.x == menArr[i].x && this.y == menArr[i].y) {
                    menArr.splice(i, 1);
                }
            }
        }
    }
}