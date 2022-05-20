cocoSsdStatus = "";
input = "";
objects = [];

function setup(){
    canvas = createCanvas(300, 300);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
    video.size(300, 300);
}

function find(){
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("modelStatus").innerHTML = "Status: Detecting Objects";
    input = document.getElementById("input").value;
}

function modelLoaded(){
    console.log('Model Loaded!');
    cocoSsdStatus = true;
    objectDetector.detect(video, gotResult);
}

function gotResult(error, results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        objects = results;
    }
}

function draw(){
    image(video, 0, 0, 300, 300);
    if(cocoSsdStatus != ""){
        r = random(255);
        g = random(255);
        b = random(255);
        
        for(i = 0; i < objects.length; i++){
            
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%" , objects[i].x + 15 , objects[i].y + 15);
            noFill();
            stroke(r, g, b);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }

        if(objects[i].length == input){
            video.stop();
            objectDetector.detect(gotResult);
            document.getElementById("status").innerHTML = input + " found";

            var synth = window.speechSynthesis;
            var utterThis = new SpeechSynthesisUtterance(input + "found");
            synth.speak(utterThis);
        }
        else{
            document.getElementById("statuts").innerHTML = input + " not found";
        }
    }
}
