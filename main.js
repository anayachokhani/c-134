function setup(){
    canvas=createCanvas(380, 380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(380, 380);
    video.hide();   
}

function start(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded); 
    document.getElementById("status").innerHTML = "status : detecting objects";
}

function modelLoaded(){
console.log("model loaded");
StatUS = true;
}

function gotResult(error, results){
if(error){
    console.log(error);
}
console.log(results);
objects = results;
}

img="";

StatUS="";

function draw(){
    image(video, 0, 0, 380, 380);
    if(StatUS!=""){
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(i = 0;i < objects.length;i++){
            document.getElementById("status").innerHTML = "status: Objects detected";
            document.getElementById("numberOfObjects").innerHTML = "number of objects detected:" + objects.length;
            fill(r, g, b);
            percent = floor(objects[i].confidence * 100);
            textSize(35);
            text(objects [i].label + " " + percent + "%", objects [i].x + 30, objects [i].y + 30);
            noFill();
            stroke(r, g, b);
            rect(objects [i].x, objects [i].y, objects [i].width, objects [i].height); 
        }
    }
}

objects = [];