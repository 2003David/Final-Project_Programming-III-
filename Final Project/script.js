var side = 20;
var socket = io();

 //setup
 function setup() {
    createCanvas(20 * side , 20 * side);
    background('blue');  
 }
 
 //nuyn draw functiony uxaki serveric ekac matrixi hashvin 
  function drawMatrix(matrix){
    background('#33FFFF')

      for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
            }
            else if (matrix[y][x] == 0) {
                fill('#acacac');
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
            }
            else if (matrix[y][x] == 3) {
               // if (grassArr.length <= 0) {
                    fill("red");
               // }
            }
            else if (matrix[y][x] == 4) {
                
                    fill("#515A5A");
                
            }
            else if (matrix[y][x] == 5) {
                if (predatorArr.length <= 0) {
                    fill("black");
                }
            }
            rect(x * side, y * side, side, side);
            //Rect Cordinates
            // fill(89, 114, 255);
            // text(x + " " + y, x * side + side / 2, y * side + side / 2)

        }
    }
  }


//yndunuma serveric matrixy ev kanchuma drawMatrix
socket.on("matrix", drawMatrix);

//function event kisata grac serverum el code petqa grvi sa vorpes hushum
//  function mousePressed() {
//     var x = Math.floor(mouseX / side);
//     var y = Math.floor(mouseY / side);
//     arr = [x, y];
//     console.log(arr);
//     socket.emit("Sxmvec", arr)

// }


























