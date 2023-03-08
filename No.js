const razao = 4;
let geracoes = []

function coordInRect(coord,rect){
    return !(coord.x < rect.x || coord.y < rect.y ||coord.x > rect.width+rect.x || coord.y > rect.height+rect.y)
}

function getCoord({x,y},raio,ang){
    let aux = ang*(Math.PI/180)
    return{
        x: raio*Math.cos(aux)+x,
        y: raio*Math.sin(aux)+y
    }
}

class No{
    constructor({x,y},id,x0 = 0, y0 = 0){
        this.position = {
            x:x0,
            y:y0
        }
        this.show = true;
        this.id = id;
        this.fill = "rgba(255, 255, 255, "+1+")"
        this.parents = null;
        this.children = null;
        this.dist = 100;
        this.range = 150;
        this.size = 100;
        this.ang = 0;
        this.target = {
            x,
            y
        }      
    }
    insertParents(parent){
        if(this.parents == null){
            this.parents = []
        }
        if(parent.children == null){
            parent.children = []
        }
        this.parents.push(parent)
        parent.children.push(this)
    }
    insertChildren(id){
        let aux = null
        if(this.children == null){
            this.children = []
        }
        aux = new No({x:0,y:0},id,this.position.x,this.position.y);
        aux.parents = []
        aux.parents.push(this);
        if(geracoes.length <= aux.geracao()){
            geracoes.push([])
            geracoes[aux.geracao()].push(aux)
        }
        else{
            geracoes[aux.geracao()].push(aux)
        }
        this.children.push(aux);
    }
    geracao(){
        if(this.parents == null){
            return 0
        }
        let cont = 1;
        let p= null;
        if(this.parents != null){
            p = this.parents[0];
        }
        while(p.parents != null){
            p = p.parents[0];
            cont += 1;
        }
        return cont;
    }
    draw(c){
        if(this.show){
            c.fillStyle = this.fill;
            c.strokeStyle = this.fill;
            c.beginPath();
            c.arc(display.cam.scale*this.position.x+display.cam.position.x,display.cam.scale*this.position.y+display.cam.position.y,display.cam.scale*this.size,0,2*Math.PI);
            c.fill();
            c.stroke();
        }
    }
    update(c){
        if(this.show){
            if(this.parents != null){
                this.size = this.parents[0].size/(razao/1);
                this.dist = (this.parents[0].range * (this.children==null))+(this.parents[0].range*1.5)*(this.children != null);
                this.range = (130*this.size)/85;
            }
            if(this.parents != null && this.parents[0].parents != null){
                this.ang = 360/(this.parents[0].children.length+1) * (this.parents[0].children.indexOf(this)+1);
                this.ang += (this.parents[0].ang)-180
                this.target = getCoord(this.parents[0].target,this.dist,this.ang);  
            }
            else if(this.parents != null && this.parents.length == 1){
                this.ang = 360/this.parents[0].children.length * (this.parents[0].children.indexOf(this)-1);
                this.ang -= (this.parents[0].ang*-1)
                this.target = getCoord(this.parents[0].target,this.dist,this.ang);    
            }
        }
        let absolutePositionx = this.position.x+display.cam.position.x/display.cam.scale
        let absolutePositiony = this.position.y+display.cam.position.y/display.cam.scale
        let inView = coordInRect({x:absolutePositionx, y:absolutePositiony},{x:0,y:0,width:display.canvas.width,height:display.canvas.height})
        if(this.size * display.cam.scale > 1.5 && this.size * display.cam.scale < 300 && this.position && inView){
            this.show = true
        }
        else{
            this.show = false
        }
        //this.fill = "rgba(255, 255, 255, "+(this.geracao()*-1+10)/10+")"
        let mouseEX = mouse.position.x-this.position.x;
        let mouseEY = mouse.position.y-this.position.y;

        let d = Math.sqrt(Math.pow(mouseEX,2)+Math.pow(mouseEY,2));
        
        if(mouse.state && d < this.size){
            if(display.cam.focus != this){
                display.cam.focus = this
                display.cam.targscale = 100/this.size
                display.cam.target.x = 2 * display.canvas.width/2 - (display.cam.targscale*this.position.x+display.canvas.width/2)//2 * display.canvas.width/2 - this.position.x;
                display.cam.target.y = 2 * display.canvas.height/2 - (display.cam.targscale*this.position.y+display.canvas.height/2)//2 * display.canvas.height/2 - this.position.y;;    
            }
            else if(this.parents != null){
                display.cam.targscale = 100/this.parents[0].size
                display.cam.target.x = 2 * display.canvas.width/2 - (display.cam.targscale*this.parents[0].position.x+display.canvas.width/2)//2 * display.canvas.width/2 - this.position.x;
                display.cam.target.y = 2 * display.canvas.height/2 - (display.cam.targscale*this.parents[0].position.y+display.canvas.height/2)//2 * display.canvas.height/2 - this.position.y;;    
                display.cam.focus = this.parents[0]
            }
        }
        
        let xerror = this.target.x-this.position.x
        let yerror = this.target.y-this.position.y
        this.position.x += xerror*0.5;
        this.position.y += yerror*0.5;
        this.draw(c.ctx)
        if(this.children != null){
            this.children.map(function(child){
                if(child.show){
                    display.ctx.strokeStyle = "rgba(255, 255, 255, "+(child.geracao()*-1+10)/70+")"
                    display.ctx.beginPath();
                    display.ctx.moveTo(display.cam.scale*child.parents[0].position.x+display.cam.position.x,display.cam.scale*child.parents[0].position.y+display.cam.position.y);
                    display.ctx.lineTo(display.cam.scale*child.position.x+display.cam.position.x,display.cam.scale*child.position.y+display.cam.position.y);
                    display.ctx.stroke();
                }
                child.update(c)
            })
        }
    }
}

class Trilha{
    constructor({x,y},display){
        this.main = new No({x:x,y:y},0);
        this.main.show = true;
        this.display = display
        geracoes[0] = [this.main]
    }
    update(){
        this.main.update(this.display)
    }
}
function showOrder(){
    for(let ger in geracoes){
        for(let no in geracoes[ger]){
            geracoes[ger][no].show = true;
        }
    }
}