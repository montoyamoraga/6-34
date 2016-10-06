//6:34
//dance piece by donald shorter
//software by aarón montoya-moraga + yuli cai
//runs on a web browser
//uses p5.js library
//october 2016

//arrays for holding the trail information
var trailX = [];
var trailY = [];
var trailMoment = [];
var trailMaximumLength = 1000;
var trailLifetime = 5000;

//diameter spotlight
var spotlightDiameter = 0.1;
var spotlightDiameterStep = 1;
var spotlightDiameterMax = 400;


//function for updating trail left by donald
function updateTrail() {

    //if the mouse is pressed, add to the trail
    if (mouseIsPressed) {
        //append to the end of the trails the current
        //mouse position
        //also record the moment when they were created
        trailX.push(mouseX);
        trailY.push(mouseY);
        trailMoment.push(millis());

        //if the length of the trails is longer
        //than the maximum, pop the first elements
        while (trailX.length > trailMaximumLength) {
            trailX.splice(0, 1);
        }
        while (trailY.length > trailMaximumLength) {
            trailY.splice(0, 1);
        }



    }

    //check if they are still alive
    //if the time since creation is larger than lifetime
    //delete the particle
    for (var i = 0; i < trailX.length; i++) {
        if (millis() - trailMoment[i] > trailLifetime) {
            trailX.splice(0, 1);
            trailY.splice(0, 1);
        }
    }
}

//function for displaying trail
function displayTrail() {
    if ((trailX.length) > 0 && (trailY.length > 0)) {

        for (var i = 0; i < trailX.length; i++) {
            for (var j = 0; j < trailY.length; j++) {
                fill(random(255), random(255), random(255));
                var radius = 50 * (trailLifetime - (millis() - trailMoment[i])) / 1000;
                console.log(radius);
                ellipse(trailX[i], trailY[j], radius, radius);
            }
        }

    }
}

function voidStage() {
    console.log("void stage");
    //background(0);
}

function spotlight() {
    fill(255);
    noStroke();
    spotlightDiameter = spotlightDiameter + spotlightDiameterStep;

    if (spotlightDiameter > spotlightDiameterMax) {
      spotlightDiameter = spotlightDiameterMax;
    }

    ellipse(mouseX, mouseY, spotlightDiameter, spotlightDiameter);
}

function displayCurrentVisuals() {

    if (currentMinute >= 0 && currentSecond >= 55) {
        spotlight();
    } else if (currentMinute >= 0 && currentSecond >= 35) {
        spotlight();
    } else if (currentMinute >= 0 && currentSecond >= 0) {
        voidStage();
    }
}