let board;
boardh = 715.20;
boardw = 1535;
let birdwidth = 100;
let birdh = 34;

let birdx = 250;
let birdy = boardh / 2;

let bird = {
    x: birdx,
    y: birdy,
    height: birdh,
    width: birdwidth
}

//pipe
let pipearray = [];
let pipewidth = 64;
let pipeheight = 512;
let pipex = boardw;
let pipey = 0;

//physics
let velocityx = -6;//pipes moving left speed
let velocityY = 0; //bird jump speed
let gravity=0.4;
var time_pipe=1000;
let gameover = false;

let score=0;

function stfunction() {
    board = document.getElementById("board");
    context = board.getContext("2d");
    board.height = boardh;
    board.width = boardw;

    // context.fillStyle="green";
    // context.fillRect(bird["x"], bird.y,  bird.width, bird.height);


    birdimg = new Image();
    birdimg.src = "images/plane-removebg-preview.png";
    birdimg.onload = function () {
        context.drawImage(birdimg, bird.x, bird.y, bird.width, bird.height);
    }

    toppipeimg = new Image();
    toppipeimg.src = "images/twinclear2.jpg"
    bottompipeimg = new Image();
    bottompipeimg.src = "images/twinclear1.jpg"
    requestAnimationFrame(update);
    // time_pipe-=10;

    // console.log(time_pipe);
    setInterval(createpipes, time_pipe);
    // console.log(setInterval(createpipes, time_pipe));
    document.addEventListener("keydown", movebird);
    explosion = new Image();
    explosion.src="images/exp3-removebg-preview.png"
}
function update() {
    
    requestAnimationFrame(update);
    if(gameover)
    {
        return;
    }
    context.clearRect(0, 0, board.width, board.height);

    //bird

    // setInterval(createpipes, time_pipe);
    // console.log(time_pipe)
    // velocityx-= 0.005;
    velocityY += gravity;
    bird.y =Math.max(bird.y + velocityY, 0) ;//apply gravity to current bird.y, limit the bird.y to the top of the canvas
    
    context.drawImage(birdimg, bird.x, bird.y, bird.width, bird.height);

    if(bird.y>board.height || bird.y==0)
    {
        gameover=true
    }
    //pipes
    for (i = 0; i < pipearray.length; i++) {
        let pipe = pipearray[i];
        pipe.x = pipe.x + velocityx;
        // console.log(pipe.x)
        context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height)

        if(!pipe.passed && bird.x > pipe.x + pipe.width)
        {
            score=score+0.5;
            pipe.passed = true;
        }
        if(detectcollide(bird, pipe))
        {
            gameover =true;
        }
    
    }
    while(pipearray.length> 0 && pipearray[0].x < -64)
    {
        pipearray.shift();
    }
    //score
    context.fillStyle="#7CFC00";
    context.font="45px sans-serif";
    context.fillText(score, 5, 45);

    if(gameover)
    {
        context.fillText("Maqsad hazil hogaya", 5, 90);
        context.beginPath();
        context.rect(550, 50, 400, 100 )
        context.stroke();
        context.fillText("Allah hu Akbar!", 600, 100 );
        context.drawImage(explosion,  bird.x, bird.y-50, 150, 150)
        // time_pipe=2000;
        // velocityx=-3;
    }
    // return time_pipe;
}

function createpipes() {
    if(gameover)
    {
        return;
    }

    randompipey = pipey - pipeheight / 4 - Math.random() * (pipeheight / 2);
    let openingspace = boardh / 4;
    let toppipe = {
        img: toppipeimg,
        x: pipex,
        y: randompipey,
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    console.log(pipearray)

    pipearray.push(toppipe);
    // console.log(pipearray)

    let bottompipe = {
        img: bottompipeimg,
        x: pipex,
        y: (randompipey + pipeheight + openingspace),
        width: pipewidth,
        height: pipeheight,
        passed: false
    }
    pipearray.push(bottompipe);
}

function movebird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyW") {
        //jump
        velocityY = -6;
        if(gameover)
        {
            bird.y= birdy;
            pipearray = [];
            score = 0;
            gameover = false;
        }
    }
    
}

function detectcollide(a, b){
    return a.x< b.x + b.width && 
            a.x + a.width>b.x &&
            a.y < b.y + b.height&&
            a.y + a.height> b.y;
}