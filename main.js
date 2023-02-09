const TRILHA = new Trilha({X:0,Y:0},null);


function setup(display){
    TRILHA.display = display;
}

var time0 = 0;
var time1 = 0

function draw(display){
    time0 += 0.05;
    time1 += 0.07;
}

function update(display){
    TRILHA.main.target = {x:(display.canvas.width/2)+display.cam.position.x ,y:(display.canvas.height/2)+display.cam.position.y};
    TRILHA.update();
    draw(display);
}

