var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require('fs');


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, function () {
    console.log("port is running");
});
weather = "summer";
weatherinit = 1;
//Kapum enq mer classery
Grass = require("./modules/grass.js");
GrassEater = require("./modules/grassEater.js");
Predator = require("./modules/predator.js");
Men = require("./modules/men.js");
Bomb = require("./modules/bomb.js");

//haytararum en qzangvacnery
grassArr = [];
grasseaterArr = [];
predatorArr = [];
menArr = [];
bombArr = [];

//stexcum enq matrica generacnox function
var w = 50;
var h = 50;

function genMatrix(w, h) {
    var matrix = [];
    for (var y = 0; y < h; y++) {
        matrix[y] = [];
        for (var x = 0; x < w; x++) {
            var r = Math.floor(Math.random() * 75);
            if (r < 20) r = 0;
            else if (r < 40) r = 1;
            else if (r > 40 && r < 60) r = 2;
            matrix[y][x] = r;
        }
    }
    return matrix;
}
///weather functian
function draw_weather(){
    weatherinit++;
    if(weatherinit ==5){
        weatherinit = 1;
    }
}


///zangvacic patahakan andam tvox function
Random = function (arr) {
    return arr[Math.floor(Math.random() * arr.lenght)];
}

//kanchum enq gen Matrix function ev talis enq matrixi popoxakannery
matrix = genMatrix(w, h);

//stex pttvum enq matrix-i mejov u stexcum enq objectnery
for (var y = 0; y < matrix.lenght; y++) {
    matrix[y] = [];
    for (var x = 0; x < matrix.lenght; x++) {
        if (matrix[y][x] == 1) {
            grassArr.push(new Grass(x, y, 1));
            //Grassinit++;
        }
        else if (matrix[y][x] == 2) {
            grasseaterArr.push(new GrassEater(x, y, 2));
        }
        else if (matrix[y][x] == 3) {
            predatorArr.push(new Predator(x, y, 3));
        }
        else if (matrix[y][x] == 4) {
            menArr.push(new Men(x, y, 4));
        }
        else if (matrix[y][x] == 5) {
            bombArr.push(new Bomb(x, y, 5))
        }
    }
}
//// 
function drawserver() {

    for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grasseaterArr) {
        grasseaterArr[i].mul();
        grasseaterArr[i].move();
        grasseaterArr[i].eat();
        //grasseaterArr[i].die();
    }

    for (var i in predatorArr) {
        predatorArr[i].move();
        predatorArr[i].eat();
        predatorArr[i].mul();
        predatorArr[i].die();
    }

    for (var i in menArr) {
        menArr[i].move();
        menArr[i].eat();
        menArr[i].mul();
        menArr[i].die();
    }

    if (predatorArr.length <= 0) {

        for (var i in bombArr) {
            bombArr[i].move();
            bombArr[i].die();
        }
    }
    io.sockets.emit("matrix", matrix)
}

//connectiona stexcum scriptic ekac infoi himan vra script.js i het mousePressed i jamanak
// io.on('connection', function (socket) {
//     socket.on("Sxmvec", function (arr) {
//         //stexi code y chem grel esel duq greq))
//         //sranic avel chem hushelu
//         //ba
//     });
// });


setInterval(drawserver, 2000);







