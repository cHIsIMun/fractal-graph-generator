//relacionando canvas
const display = {
    canvas:document.querySelector('canvas'),
    ctx:document.querySelector('canvas').getContext('2d'),
    color:'black',
    cam : {
        position:{
            x : 0,
            y : 0
        },
        target:{
            x : 0,
            y : 0
        },
        scale : 0,
        targscale : 1,
        focus : null
    }
}
const mouse = {
    position:{
        x:0,
        y:0
    },
    state:false
}
addEventListener("mousemove",function(event){
    var rect = display.canvas.getBoundingClientRect();
    console.clear()
    console.log(mouse.position);    
    mouse.position.x = ((event.clientX - rect.left)-display.cam.position.x)/display.cam.scale ;
    mouse.position.y = ((event.clientY - rect.top)-display.cam.position.y)/display.cam.scale;
},false)
addEventListener("mousedown",function(event){
    mouse.state = true
},false)
addEventListener("mouseup",function(event){
    mouse.state = false
},false)

setup(display)
async function construir(No, cont = 0){
    if(cont > 5){
        return null
    }
    for(let i = 0; i < 8; i++){
        No.insertChildren({x:0,y:0},1)
        await sleep(30);
        construir(No.children[i],cont + 1)
    }
}
function constr(No,geracao = 0){
    if(geracao > 4){
        return null
    }
    let base = 7
    if(geracao == 0){base += 2}
    for(let i = 0; i < base; i++){
        No.insertChildren({x:0,y:0},1)
    }
    No.children.map(function(child){
        constr(child,geracao+1)
    })
}
function sleep(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

function animate(){
    display.canvas.width = innerWidth;
    display.canvas.height = innerHeight;
    display.ctx.fillStyle = display.color;
    display.ctx.fillRect(0,0,display.canvas.width,display.canvas.height)
    requestAnimationFrame(animate);

    let camxerror = display.cam.target.x-display.cam.position.x
    let camyerror = display.cam.target.y-display.cam.position.y
    display.cam.position.x += camxerror*0.1;
    display.cam.position.y += camyerror*0.1;

    let camscalerror = display.cam.targscale-display.cam.scale
    display.cam.scale += camscalerror*0.1;

    update(display);
    draw(display);
    

}
display.canvas.width = innerWidth;
display.canvas.height = innerHeight;
display.cam.target.x = display.canvas.width/2
display.cam.target.y = display.canvas.height/2
constr(TRILHA.main)
animate();

