//relacionando canvas
const display = {
    canvas:document.querySelector('canvas'),
    ctx:document.querySelector('canvas').getContext('2d'),
    color:'black',
    cam : {
        position:{
            x : 0,
            y : 0
        }
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
    mouse.position.x = event.clientX - rect.left;
    mouse.position.y = event.clientY - rect.top;
},false)
addEventListener("mousedown",function(event){
    mouse.state = true;
},false)
addEventListener("mouseup",function(event){
    mouse.state = false;
},false)

setup(display)
function construir(No, cont = 0){
    if(cont > 3){
        return null
    }
    for(let i = 0; i < 5; i++){
        No.insertChildren({x:3,y:0},1)
        construir(No.children[i],cont + 1)
    }
}

function animate(){
    display.canvas.width = innerWidth;
    display.canvas.height = innerHeight;
    display.ctx.fillStyle = display.color;
    display.ctx.fillRect(0,0,display.canvas.width,display.canvas.height)
    requestAnimationFrame(animate);
    update(display);
    draw(display);
}
animate();
