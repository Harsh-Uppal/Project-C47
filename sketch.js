// JavaScript source code
let settingsImg, spaceshipMenuImg, shopImg, graphImg, shareImg, starsImg, shipImg, upArrowImg, circleImg, mouseImg, loginImg;
let game, state = "main";
let isMousePressed = false, startMouseDragged = false;
let settings = { msic: true, snd: true, inv: false, sens: 100 };
let database;

function preload() { loadImages(); }

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    Background.generate(1);
    game = new Game();
    database = firebase.database();
    frameRate(60);
    document.scrollingElement.scroll(50, 8);
    document.body.classList.add("stop_scroll");
}

function draw() {
    background(50)

    if (state == "main") {
        Background.update();
        image(settingsImg, width / 3, height * (3 / 4), 50, 50);
        image(loginImg, width / 3 + width / 12, height * (3 / 4), 50, 50);

        fill("white")

        noStroke();
        textAlign(CENTER);
        textFont("MS Mincho");
        textSize(60);
        text("Space Chase", window.innerWidth / 2, window.innerHeight / 3);
        strokeWeight(.1);
        stroke(255);
        line(width / 2 - 150, height / 3 + 20, width / 2 + 150, height / 3 + 20);
        textSize(35);
        noStroke();
        text("Click To Start", width / 2, height / 2);
        image(starsImg, width - 70, 30, 40, 40);
    }
    else if (state == "settings") {
        Background.update();
        fill("white");
        textFont("Showcard Gothic");
        textAlign(CENTER);
        textSize(40);
        text("Settings", width / 2, height / 4);
        textSize(20)
        text("Music", width / 2 - 100, height / 4 + height / 10);
        textSize(20)
        text("Sound", width / 2 - 100, height / 4 + height / 5);
        textSize(20)
        text("Invert", width / 2 - 100, height / 4 + height / 5 + height / 10);
        textSize(20)
        text("Sensitivity", width / 2 - 100, height / 4 + height / 2.5);
        noFill();
        stroke("white");
        rectMode(CENTER);
        rect(width / 2 + 100, height / 4 + height / 10, 25, 25);
        rect(width / 2 + 100, height / 4 + height / 5, 25, 25);
        rect(width / 2 + 100, height / 4 + height / 10 + height / 5, 25, 25);

        noStroke();
        fill("white");
        if (settings.msic)
            rect(width / 2 + 100, height / 4 + height / 10, 15, 15);
        if (settings.snd)
            rect(width / 2 + 100, height / 4 + height / 5, 15, 15);
        if (settings.inv)
            rect(width / 2 + 100, height / 4 + height / 10 + height / 5, 15, 15);

        stroke("white");
        strokeWeight(10);
        line(width / 2 + 50, height / 4 + height / 2.5 - 7, width / 2 + 150, height / 4 + height / 2.5 - 7);
        strokeWeight(1);
        stroke("black");
        fill("white")
        ellipse(width / 2 + 50 + settings.sens, height / 4 + height / 2.5 - 7, 15, 15);
        strokeWeight(5);
        line(width / 30, height * (25 / 30), width / 20, height * (24 / 30));
        line(width / 30, height * (25 / 30), width / 20, height * (26 / 30));
        text("Back", width / 13, height * (25.5 / 30));
        text("Reset", width / 2, height * 4 / 5);
    }
    else if (state == "login") {
        Background.update();
        stroke('lime');
        strokeWeight(10);
        fill(220);
        rect(width / 10, height / 10, width / 10 * 8, height / 10 * 8);
        textSize(20)
        stroke("black");
        fill("white")
        strokeWeight(5);
        line(width / 9, height * (25 / 30), width / 7.5, height * (24 / 30));
        line(width / 9, height * (25 / 30), width / 7.5, height * (26 / 30));
        text("Back", width / 7, height * (25.5 / 30));
        textSize(30);
        textFont("Algerian");
        text("Login", width / 2 - 25, height / 5);
        textSize(25);
        textFont("Segoe Script");
        text("ID :", width / 2 - 100, height / 3);
        text("Password :", width / 2 - 200, height / 3 * 1.5);
    }
    else if (state == "gameplay") {
        if (startMouseDragged) {
            game.play();
        }
        else {
            showNotPressingImages();
        }
    }

    drawSprites();
}

function loadImages() {
    settingsImg = loadImage("Images/settings.png");
    starsImg = loadImage("Images/stars.png");
    shipImg = loadImage("Images/Spaceship.png");
    upArrowImg = loadImage("Images/Up Arrow.png");
    circleImg = loadImage("Images/Circle.png");
    mouseImg = loadImage("Images/mouse.png");
    loginImg = loadImage("Images/login.png");
}

var loginID;
var loginPass;

function mouseClicked() {
    if (state == "main") {

        if (mouseX > width / 3 && mouseX < width / 3 + 50) {
            if (mouseY > height * (3 / 4) && mouseY < height * (3 / 4) + 50) {
                state = "settings";
                return;
            }
        }

        if (mouseX > width / 3 + width / 12 && mouseX < width / 3 + width / 12 + 50) {
            if (mouseY > height * (3 / 4) && mouseY < height * (3 / 4) + 50) {
                state = "login";
                loginID = createInput("Enter ID","text");
                return;
            }
        }

        if (mouseX > width / 6 && mouseX < width / 6 + width / 8 * 5) {
            if (mouseY > height / 8 && mouseY < height / 8 * 6) {
                state = "gameplay";
            }
        }

    }
    else if (state == "settings") {
        if (mouseX > width / 2 + 87.5 && mouseX < width / 2 + 112.5) {
            if (mouseY > height / 4 + height / 10 - 12.5 && mouseY < height / 4 + height / 10 + 12.5) {
                if (settings.msic)
                    settings.msic = false;
                else
                    settings.msic = true;
            }
            else if (mouseY > height / 4 + height / 5 - 12.5 && mouseY < height / 4 + height / 5 + 12.5) {
                if (settings.snd)
                    settings.snd = false;
                else
                    settings.snd = true;
            }
            else if (mouseY > height / 4 + height / 5 + height / 10 - 12.5 && mouseY < height / 4 + + height / 10 + height / 5 + 12.5) {
                if (settings.inv)
                    settings.inv = false;
                else
                    settings.inv = true;
            }
        }
        else if (mouseX > width / 15 - 40 && mouseX < width / 15 + 80) {
            if (mouseY > height * 25 / 30 - 20 && mouseY < height * 25 / 30 + 20) {
                state = "main";
            }
        }
        else if (mouseX > width / 2 - 30 && mouseX < width / 2 + 30) {
            if (mouseY > height * 4 / 5 - 14.5 && mouseY < height * 4 / 5) {
                settings.msic = true;
                settings.snd = true;
                settings.inv = false;
                settings.sens = 100;
            }
        }
    }
    else if (state == "gameplay" && !startMouseDragged) {
        game.start();
        startMouseDragged = true;
    }
}

let sensLHel = false;
function mouseDragged() {

    isMousePressed = true;

    if (state == "gameplay" && !startMouseDragged) {
        game.start();
        startMouseDragged = true;
    }

    if (state == "settings") {

        if (sensLHel) {
            if (mouseX < width / 2 + 50) {
                settings.sens = 1;
            }
            else if (mouseX > width / 2 + 150) {
                settings.sens = 100;
            }
            else {
                settings.sens = mouseX - width / 2 - 50;
            }
        }
        else if (mouseX > width / 2 + 42.5 + settings.sens && mouseX < width / 2 + 57.5 + settings.sens) {
            if (mouseY > height / 4 + height / 2.5 - 14.5 && mouseY < height / 4 + height / 2.5 + 0.5) {
                sensLHel = true;
            }
        }
    }
}

function mouseReleased() {
    sensLHel = false;
    isMousePressed = false;
    if (state == "gameplay" && startMouseDragged)
        game.onMouseReleased();
}

let lastShownMousePos = window.innerHeight / 2;
let goingTowards = "up";

function showNotPressingImages() {

    angleMode(DEGREES);

    image(upArrowImg, window.innerWidth / 9 - 20, window.innerHeight / 2 - 100, 40, 40);

    push();
    translate(window.innerWidth / 9 + 20, window.innerHeight / 2 + 100);
    rotate(180);
    image(upArrowImg, 0, 0, 40, 40);
    pop();

    if (goingTowards == "up") {
        if (lastShownMousePos < window.innerHeight / 2 - 20 - window.innerHeight / 20) {
            goingTowards = "down";
        }

        image(mouseImg, window.innerWidth / 10, lastShownMousePos - 2, 25, 40);
        lastShownMousePos -= 2;
    }
    else if (goingTowards == "down") {
        if (lastShownMousePos > window.innerHeight / 2 - 20 + window.innerHeight / 20) {
            goingTowards = "up";
        }

        image(mouseImg, window.innerWidth / 10, lastShownMousePos + 2, 25, 40);
        lastShownMousePos += 2;
    }

}