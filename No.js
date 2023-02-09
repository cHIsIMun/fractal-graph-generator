const razao = 4;
let geracoes = []

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
        this.fill = 'white'
        this.parents = null;
        this.children = null;
        this.dist = 50;
        this.range = 100;
        this.size = 30;
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
            c.arc(this.position.x,this.position.y,this.size,0,2*Math.PI);
            c.fill();
            c.stroke();
        }
    }
    update(c){
        if(this.parents != null){
            this.size = this.parents[0].size/(razao/2);
            this.dist = (this.parents[0].range * (this.children==null))+(this.parents[0].range*1.5)*(this.children != null);
            this.range = this.dist/razao;
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
        let mouseEX = mouse.position.x-this.position.x;
        let mouseEY = mouse.position.y-this.position.y;

        let d = Math.sqrt(Math.pow(mouseEX,2)+Math.pow(mouseEY,2));
        
        if(mouse.state && d < this.size){
            display.cam.position.x = display.canvas.width/2 - this.position.x;
            display.cam.position.y = display.canvas.height/2 - this.position.y ;
        }
        
        let xerror = this.target.x-this.position.x
        let yerror = this.target.y-this.position.y
        this.position.x += xerror*0.1;
        this.position.y += yerror*0.1;
        this.draw(c.ctx)
        if(this.children != null){
            for(let child in this.children){
                if(this.children[child].show){
                    display.ctx.beginPath();
                    display.ctx.moveTo(this.position.x,this.position.y);
                    display.ctx.lineTo(this.children[child].position.x,this.children[child].position.y);
                    display.ctx.stroke();
                    this.children[child].update(c)
                }
            }
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