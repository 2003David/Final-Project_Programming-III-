var LivingCreature = require("./LivingCreature.js");

module.exports = class Bomb extends LivingCreature {
    constructor(x, y, index) {
        super(x,y,index);
        this.cores = 80;
    }
    getNewCoordinates_move() {
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
    chooseCellforMove(character) {
        this.getNewCoordinates_move();
        return super.chooseCell(character);
    }
    chooseCellforEat(character) {
        this.getNewCoordinates_eat();
        return super.chooseCell(character);
    }
    move() {

        var newCell = random(this.chooseCellforMove(0))

        if (newCell) {
            this.cores -= 1;
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.index;
            this.x = newX;
            this.y = newY;
        }
    }
    die() {
        if (this.cores <= 0) {
            matrix[this.y][this.x] = 0;
            for (var i in bombArr) {
                if (this.x == bombArr[i].x && this.y == bombArr[i].y) {
                    bombArr.splice(i, 1);
                }
            }
        }
    }
}