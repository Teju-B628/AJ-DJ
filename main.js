LeftX = 0;
RightX = 0;
LeftY = 0;
RightY = 0;


function setup(){
    Canvas = createCanvas(600,500);
    Canvas.position(475,250);
    webcam = createCapture(VIDEO);
    webcam.hide();
    poseNet = ml5.poseNet(webcam, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results){
    if(results.length>0){
console.log(results);
LeftX = results[0].pose.leftWrist.x;
LeftY = results[0].pose.leftWrist.y;
RightX = results[0].pose.rightWrist.x;
RightY = results[0].pose.rightWrist.y;
    }
}


function modelLoaded(){
    console.log("Halloooo");
}
function draw(){
    image(webcam,0,0,600,500);
    fill("black");
    stroke("white");
    if(scoreRightWrist > 0.2){
        circle(RightX, RightY, 20);
        if(RightY >0 && RightY <=100){
            document.getElementById("speed").innerHTML = "speed = 0.5x";
            song.rate(0.5);
        }
        else if(RightY >100 && RightY <=200){
            document.getElementById("speed").innerHTML = "speed = 1x";
            song.rate(1);
    }
    else if(RightY >200 && RightY <=300){
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
}
else if(RightY >300 && RightY <=400){
    document.getElementById("speed").innerHTML = "speed = 2x";
    song.rate(2);
}
else if(RightY >400 && RightY <=500){
    document.getElementById("speed").innerHTML = "speed = 2.5x";
    song.rate(2.5);
}
    }
    if(scoreLeftWrist > 0.2){
    circle(LeftX, LeftY, 20);
    LeftNumber = Number(LeftY);
    removeDecimal = floor(LeftNumber);
    volume = removeDecimal/500;
    document.getElementById("volume").innerHTML="Volume = " + volume;
    music.setVolume(volume);
    }
}

music = "";

function preload(){
    music = loadSound("Shadow.mp3");
}

function play(){
    music.play();
    music.setVolume(1);
    music.rate(1);
}
 function stop(){
    music.pause();
    music.setVolume(1);
    music.rate(1);
 }