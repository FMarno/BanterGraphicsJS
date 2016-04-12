canvas = document.getElementById("canvas");
var WIDTH = 100;
var HEIGHT = 100;
var P = 0.5;
var white = {
    R: 255,
    G: 255,
    B: 255,
    A: 255
};
var black = {
    R: 0,
    G: 0,
    B: 0,
    A: 255
};
canvas.width = WIDTH;
canvas.height = HEIGHT;
ctx = canvas.getContext("2d");

function init() {
    var graph = [];
    for (var i = 0; i < WIDTH; i++) {
        graph.push([]);
        for (var j = 0; j < HEIGHT; j++) {
            graph[i].push((Math.random() < P ?
                1 : 0));
        }
    }

    smooth(graph);

    var ImDat = ctx.createImageData(WIDTH, HEIGHT);
    augmentImageData(ImDat);

    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
            ImDat.setPixel(x, y, (graph[x][y] ?
                black: white));
        }
    }

    ctx.putImageData(ImDat, 0, 0);
}

function augmentImageData(o) {
    o.getPixel = function(x, y) {
        var i = (x + y * this.width) * 4;
        return {
            R: this.data[i],
            G: this.data[i + 1],
            B: this.data[i + 2],
            A: this.data[i + 3]
        }
    }
    o.setPixel = function(x, y, c) {
        var i = (x + y * this.width) * 4;
        this.data[i] = c.R;
        this.data[i + 1] = c.G;
        this.data[i + 2] = c.B;
        this.data[i + 3] = c.A;
    }
}

function smooth(graph) {
    for (var x = 0; x < WIDTH; x++) {
        for (var y = 0; y < HEIGHT; y++) {
            graph[x][y] = countNeighbours(graph, x, y) < 4 ? 0 : graph[x][y];
        }
    }
}

function countNeighbours(graph, x, y) {
    var s = 0;
    for (var i = x - 1; i <= x + 1; i++) {
        for (var j = y - 1; j <= y + 1; j++) {
            if (i != x || j != y) {
                if (graph[i] != undefined && graph[i][j]) {
                    s++;
                }
            }
        }
    }
    return s;
}
