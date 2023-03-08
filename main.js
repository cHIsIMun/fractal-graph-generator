const TRILHA = new Trilha({x:0,y:0},null);


function setup(display){
    TRILHA.display = display;
    display.cam.focus = TRILHA.main
}

var time0 = 0;
var time1 = 0

function draw(display){
    time0 += 0.05;
    time1 += 0.07;
}

function update(display){
    TRILHA.update();
    draw(display);
}

