prediction1="";
prediction2="";

Webcam.set({
    
    
    width:350, height:300, image_format:'png', png_quality:90
    
});

camera=document.getElementById("camera");

Webcam.attach('#camera');



function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="snap" src="'+data_uri+'">';
    });
}

console.log("ml5version",ml5.version);

classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/deiHORg7t/model.json',modelLoaded);

function modelLoaded(){
console.log("modal loaded")
}

function speak(){
var synth=window.speechSynthesis;
speak_data1="The first prediction is"+prediction1;
speak_data2="The second  prediction is"+prediction2;
var utter_this=new SpeechSynthesisUtterance(speak_data1+speak_data2);
synth.speak(utter_this);
}
function check(){
    img=document.getElementById("snap");
    classifier.classify(img,gotResult);
}
function gotResult(error,results){
    if (error){
    console.log(error);
    }
    else{
        console.log(results);
        document.getElementById("result_emotion1").innerHTML=results[0].label;
        document.getElementById("result_emotion2").innerHTML=results[1].label;
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        if(results[0].label=="Happy"){
            document.getElementById("update_emoji").innerHTML="&#128522;";
        }
        if(results[0].label=="Sad"){
            document.getElementById("update_emoji").innerHTML="&#128532;";
        }
        if(results[0].label=="Angry"){
            document.getElementById("update_emoji").innerHTML="&#128548;";
        }
        if(results[1].label=="Happy"){
            document.getElementById("update_emoji2").innerHTML="&#128522;";
        }
        if(results[1].label=="Sad"){
            document.getElementById("update_emoji2").innerHTML="&#128532;";
        }
        if(results[1].label=="Angry"){
            document.getElementById("update_emoji2").innerHTML="&#128548;";
        }

        }
}