//New 2 (OOP)

//Global
var c;
var ctx;
//window.wid = window.innerHeight;
//window.hei = window.innerWidth;
//var mouse = { x: 0, y: 0 };
//classes


//below is the code for the ammo class
var ammmo = function (imgLoc, sizeX, sizeY, x, y, angle){
    this.imgLoc = imgLoc;
    this.sizeX = sizeX;
    this.sizeY = sizeY;
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.angle = angle;
    this.ammoMotion = function(x, y, dx, dy){
        x += dx;
        y += dy;
    }
}

//below is the code for the tree class
//size --> size of tree
//loc --> location of tree
var tree = function (size, loc) {
	this.size = size;
	this.loc = loc;
}

//below is the code for the mouse class
//x, y --> x, y position of the cursor
var mouse = function (x,y){
    this.x = x;
    this.y = y;
}

//below is the code for the keys class
//all of the initial variables are pressable keys of game
var keys = function (){
    this.W = 0;
    this.A = 0;
    this.S = 0;
    this.D = 0;
    this.SHIFT = 0;
    this.SPACE = 0;
    
}


//below is the code for the scroll class
//x, y --> here means position of the scroll
//scrollMotion --> is the method that acts on x and y
var scroll = function (x, y) {
	this.x = x;
	this.y = y;
    this.scrollMotion = function(playerX, playerY, scrollX, scrollY){
        //movement of scroll
        deltaScrollX1 = playerX + scrollX - theGeneral.wid*2/10;
        deltaScrollX2 = playerX + scrollX - theGeneral.wid*8/10;
        //console.log(deltaScrollX1);
        //scrollX -= 0.01*deltaScrollX^3;
        //Movement of scroll
        deltaScrollY = playerY - theGeneral.groundY - (10/100 * theGeneral.hei) - 2 / 320 * theGeneral.hei;
        //scrollY -= 0.01*deltaScrollY^3;*/
        
        if (playerX+scrollX <= theGeneral.wid*2/10){
            scrollX -= 0.1*deltaScrollX1;
        }
        
        if (playerX+scrollX >= theGeneral.wid*8/10){
            scrollX -= 0.1*deltaScrollX2;
        }
        //scroll limit...
        if (scrollX >= 0){
            scrollX = -0.1;
        }
        if (scrollX <= -9 * theGeneral.wid){
            scrollX = -9 * theGeneral.wid + 0.1;
        }
        /*if (wid/3<playerX+scrollX<wid/2){
            scrollX -= 0.1;
        }
        if (wid/2<playerX+scrollX<wid*2/3){
            scrollX += 0.1;
        }*/
        return [scrollX, scrollY];    
        }
}

//below is the code for the general class
//this is where the miscelaneous variables are held
var general = function (input1, input2, input3, input4) {
	//this.ground = input1;
	this.wid = input2;
	this.hei = input3;
	this.groundCol = "green";
    this.groundY = 80 / 100 * input3;
    //230 / 320 * input3;
}


//below is the code for the player class
var player = function (size, posX, posY) {
    
    deltaX = mouse.x-posX;
    deltaY = mouse.y-posY;
    angle = Math.atan2(deltaY,deltaX);
    canonTipX = (Math.cos(angle)) * (size);
    canonTipY = (Math.sin(angle)) * (size);
    canonTipXpos = posX + canonTipX;
    canonTipYpos = posY + canonTipY;
    
    this.size = size;
	this.color = "red";
	this.posX = posX;
    this.posY = posY;
    this.deltaX = deltaX;
    this.deltaY = deltaY;
    this.angle = angle;
    this.canonTipX = canonTipX;
    this.canonTipY = canonTipY;
    this.canonTipXpos = canonTipXpos;
    this.canonTipYpos = canonTipYpos;
    this.tick = 0;
    this.dx = 0;
    this.dy = 0;
    this.movement = function(dx,dy, posX, posY, sz, scrollX, tick){
            jump = 0;
            if (tick === 0){
                gravA = 0;
                tick = 1;
            }
            y = theGeneral.groundY - sz/2 - 2/320*theGeneral.hei;
            //left wall...
            if (posX <= sz/2 + 0) {
                dx = -dx/5;
                posX = sz/2 + 0.1;
            }
            //right wall...
            if (posX >= -sz/2 + 10 * theGeneral.wid) {
                dx = -dx/5;
                posX = -sz/2 + 10 * theGeneral.wid - 0.1;
            }
            if (keys.A === 1){
                dx += -0.5 / 480 * theGeneral.wid;
            }
            else if (keys.D === 1){
                dx += 0.5 / 480 * theGeneral.wid;
            }else{
                dx += 0;
            }
            if (keys.W === 1 
            && posY === y){
                jump = 4 / 480 * theGeneral.wid;
                dy += -jump;
                gravA = 0;
            }else{
                jump = 0;
            }
            //console.log("test: "+ y, posY);
            //jump conditions, Ground condition
            //alert("y: " + y);
            if (posY > y){
                posY = y;
                //dy is the velocity

                dy = 0;
                gravA = 0;
            }

            if (posY === y){
                //Friction
                dx = dx/1.05;
            }




            //In the air
            //gravA stands for gravity acceleration.
            if (posY < y){
                gravA += 0.01/320*theGeneral.hei;
                dy += gravA;
            }

            //speed limit
            if (dx>30){
                dx=30;
            }
            if (dx<-30){
                dx=-30;
            }
            posX += dx;
            posY += dy;
           // console.log(dx);

            //console.log("Testing..." + jump, dy, gravA);
            return [posX, posY, dx, dy, tick];

        }
        this.drawPlayer = function (size, posXpre, posY){

            posX = posXpre + theScroll.x;
            //posY = posYpre + theScroll.y

            deltaX = mouse.x-posX;
            deltaY = mouse.y-posY;
            angle = Math.atan2(deltaY,deltaX);
            canonTipX = (Math.cos(angle)) * (size);
            canonTipY = (Math.sin(angle)) * (size);
            canonTipXpos = posX + canonTipX;
            canonTipYpos = posY + canonTipY;

            //canon and player
            ctx.beginPath();
            this.canonTipXpos = posX + canonTipX;
            this.canonTipYpos = posY + canonTipY;
            ctx.lineWidth = 9/320*theGeneral.hei;
            ctx.moveTo(posX, posY);
            ctx.lineTo(canonTipXpos, canonTipYpos);
            ctx.stroke();
            //reset lineWidth
            ctx.beginPath();
            ctx.lineWidth = 3/320 * theGeneral.hei;
            ctx.strokeRect(posX - size/2, posY - size/2, size, size);
            ctx.stroke();

            //player
            ctx.fillStyle = "red";
            ctx.fillRect(posX - size/2, posY - size/2, size, size);
            //ctx.drawImage(Star,posX+size/4,posY+size/4,size/2,size/2);

        }
}

/* var clouds = function () {
	this.size = 35 / 320 * theGeneral.hei;
	this.color = "red";
} */

/*var Tank = function (name, color, size) {
    this.name = name;
    this.color = color;
    this.size = size;
}*/

//methods
function showTrees(T) {
	
	treeImg1 = document.createElement("img");
	treeImg1.src = "images/LT-Tree1.png";
	/* var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
	c.width = screen.width;
    c.height = screen.height; */
	console.log(T.length);
    for (i = 0; i < 100; i++) {
        ctx.drawImage(treeImg1, theScroll.x + T[i].loc, theGeneral.groundY - T[i].size * 2, T[i].size, T[i].size * 2);
        //dwconsole.log(theScroll.x +","+ theTrees[i].loc +","+ theGeneral.ground - theTrees[i].size*2 +","+theTrees[i].size+","+theTrees[i].size*2)
    }
}

function startGame() {
	c = document.getElementById("canvas");
	ctx = c.getContext("2d");
	c.width = window.innerWidth;
    c.height = window.innerHeight;
	
	
	//declare
	sz=10/100*c.height;
    
	
	
	//prepare
    window.mouse = new mouse(event.clientX, event.clientY);
	window.theScroll = new scroll(0, 0);
	//window.theGeneral = new general(230 / 320 * c.height, c.width, c.height);
    window.theGeneral = new general(80/100 * c.height, c.width, c.height);
	var trees = createTrees(200);
    //Original position
    xa = 50/100 *theGeneral.wid;
    ya=theGeneral.groundY-sz/2-2/320*theGeneral.hei;
    //alert("ya: " + ya);
    //console.log(theGeneral.groundY, sz, c.height);
	window.player = new player(sz, xa, ya);
	var timer = setInterval(function () { timedEvents(trees); }, 30);
    window.keys = new keys();
	listen();

    //Load images
    Sun = document.createElement("img");
    Sun.src = "images/Sun and Sky.png";
    Star = document.createElement("img");
    Star.src = "images/Star.png";
}

function createTrees(n){
	//create tree data
	var treeLoc = new Array();
	var treeSize = new Array();
	var theTrees = new Array();
	for (i = 0; i < n; i++) {
		treeSize[i] = Math.random() * 40 / 320 * theGeneral.hei + 60 / 320 * theGeneral.hei;
		//treeLoc[i] = Math.random() * (2000 / 480 * theGeneral.wid) - 1000/480*theGeneral.wid+theGeneral.wid/2;
		treeLoc[i] = Math.random() * 10 * theGeneral.wid;
        //create trees (input data into instances/objects)
		theTrees[i] = new tree(treeSize[i], treeLoc[i]);
        //console.log(theTrees.length);
		//console.log(1995 + ',' + treeSize[i] + ',' + 1995 + ',' + treeLoc[i] + ',' + 1995);
	}
	
    //console.log(theTrees.length);

    return theTrees;
}

function timedEvents(trees){
	//clear canvas
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	//draw trees
	drawEnvironment();
	showTrees(trees);
    //draw Player
    drawMainTank();
    drawGrass();
    //scrolling
    scrolling();
}

function drawGrass(){
    //Ground
    ctx.moveTo(0,theGeneral.groundY);
    ctx.lineTo(theGeneral.wid,theGeneral.groundY);
    ctx.stroke();
    ctx.fillStyle = "limegreen";
    ctx.fillRect(0, theGeneral.groundY, theGeneral.wid, theGeneral.hei);
    ctx.fillStyle = "Black";    
    ctx.font = "30px Arial";
    
    //ctx.fillText(Math.round(theScroll.x)/theGeneral.wid+","+theGeneral.hei+","+mouse.y,0,theGeneral.hei-100);
    //ctx.fillText(mouse.x+","+mouse.y,mouse.x+50,mouse.y+50);
    ctx.fillText(theScroll.x/theGeneral.wid + " wid",0,theGeneral.hei-100);
    
}

function scrolling(){
    var scr = theScroll.scrollMotion(player.posX, player.posY, theScroll.x, theScroll.y);
    theScroll.x = scr[0];
    theScroll.y = scr[1];
    

}

function drawMainTank(){
    var pos = player.movement(player.dx, player.dy, 
    player.posX, player.posY, player.size, theScroll.x, player.tick);
    player.posX = pos[0];
    player.posY = pos[1];
    player.dx = pos[2];
    player.dy = pos[3];
    player.tick = pos[4];
    player.drawPlayer(player.size, player.posX, player.posY, player.tick);
}   

function listen(){
    /*
   var el = document.getElementsByTagName("canvas")[0];
  el.addEventListener("touchstart", mouseDown, false);
  el.addEventListener("touchend", mouseUp, false);
  //el.addEventListener("touchcancel", handleCancel, false);
  //el.addEventListener("touchleave", handleEnd, false);
  el.addEventListener("touchmove", handleMove, false);
  el.addEventListener('mousemove', function(e){ 
    mouse.x = e.clientX || e.pageX; 
    mouse.y = e.clientY || e.pageY;
      calVector();
  }, false);*/
  
	window.onkeydown = keyDown;
	window.onkeyup = keyUp;
  
	window.ontouchstart = mouseDown;
    window.ontouchend = mouseUp;
    window.ontouchmove = handleMove;

    window.onmousedown = mouseDown;
    window.onmouseup = mouseUp;
    window.onmousemove = handleMove;
}


function drawEnvironment(){
	Sun = document.createElement("img");
	Sun.src = "images/Sun and Sky.png";
	ctx.fillStyle = "skyblue";
	ctx.fillRect(0,0,theGeneral.wid,theGeneral.hei);
	ctx.drawImage(Sun, theGeneral.wid - theGeneral.wid/3, 0, 886 / 1366 * theGeneral.wid/2, theGeneral.wid/8);
    
    cloud = document.createElement("img");
    cloud.src = "images/Sky2.png";
	ctx.drawImage(cloud, 0, 0, 886 / 1366 * theGeneral.wid/2, theGeneral.wid/8);


    cloud2 = document.createElement("img");
    cloud2.src = "images/Sky3.png";
	ctx.drawImage(cloud, theGeneral.wid - theGeneral.wid*2/3, 0, theGeneral.wid*1/3, theGeneral.wid/8);

}


/* function createClouds() {
    cloud = document.createElement("img");
    cloud.src = "images/Sky2.png";
    cloudSize[b] = Math.random() * 50 / 320 * theGeneral.hei;
    cloudY[b] = Math.random() * 80 / 320 * theGeneral.hei;
    //cloudLocation[b] = Math.random() * 2000 / 480 * wid - 1000 / 480 * wid;
    cloudLocation[b] = Math.random() * theGeneral.wid*0.8;

    cloud2 = document.createElement("img");
    cloud2.src = "images/Sky3.png";
    cloudSize2[b] = Math.random() * 40 / 320 * theGeneral.hei;
    cloudY2[b] = Math.random() * 80 / 320 * theGeneral.hei;
    //cloudLocation2[b] = Math.random() * 2000 / 480 * wid - 500 / 480 * wid;
    cloudLocation2[b] = Math.random() * theGeneral.wid * 0.8;
} */


function keyUp(e) {
    if (e.keyCode == '87') {
            keys.W = 0;
        }
    if (e.keyCode == '65') {
            keys.A = 0;
        }
    if (e.keyCode == '83') {
            keys.S = 0;
        }
    if (e.keyCode == '68') {
            keys.D = 0;
        }
    if (e.keyCode == '16') {
            keys.SHIFT = 0;
        }
    if (e.keyCode == '32') {
            keys.SPACE = 0;
        }
    }

    function keyDown(e) {
    if (e.keyCode == '87') {
            keys.W = 1;
        }
    if (e.keyCode == '65') {
            keys.A = 1;
        }
    if (e.keyCode == '83') {
            keys.S = 1;
        }
    if (e.keyCode == '68') {
            keys.D = 1;
        }
    if (e.keyCode == '16') {
            keys.SHIFT = 1;
        }
    if (e.keyCode == '32') {
            keys.SPACE = 1;
        }
}

function mouseUp() {

}

function mouseDown() {

}

function handleMove() {
    //calculate vector
    calVector();
}

function calVector(){
    getMousePos();
    player.deltaX=mouse.x-player.posX-player.size/2;
    player.deltaY=mouse.y-player.posY-player.size/2;
    player.angle = Math.atan2(player.deltaY,player.deltaX);
    player.canonTipX = (Math.cos(player.angle)) * (player.size);
    player.canonTipY = (Math.sin(player.angle)) * (player.size);
}

function getMousePos(e){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
}

    /*
function mouseDown() {
	v = 1;  
}
*/
    /*
function mouseUp() {
        k = 32;
        //window.clearInterval(timer2);
        fire();
        ammo[j] = document.createElement("img");
        ammo[j].src = "images/ammo.png";
        ammoSize[j] = 16 / 320 * hei;
        ammoSize2[j] = 28 / 320 * hei;
        
        

        v = 0;

       v2 = 0;
}*/


