class Game {

    start() {

        this.maxLastPoses = 25;

        this.orbscore = 0;

        this.rocks = [];

        this.spaceship = {
            x: width / 10, y: window.innerHeight / 2 - 35,
            goingTo: height / 2 - 35, agility: 9, speed: 0, lastPositions: [], distance: 0
        };

        this.mousePositions = { start: null };

        this.terrain = new GenerateTerrain();

        this.orbs = [];

        this.realStivity = 10 - settings.sens / 10;

        if (this.realStivity < 1)
            this.realStivity = 1;
    }

    play() {

        let abc = this.terrain.update(this.spaceship.distance);

        this.terrain.display();

        if (isMousePressed) {
            if (this.mousePositions.start == null)
                this.mousePositions.start = mouseY;

            if (!settings.inv)
                this.spaceship.goingTo += (mouseY - this.mousePositions.start) / this.realStivity;
            else
                this.spaceship.goingTo -= (mouseY - this.mousePositions.start) / this.realStivity;
        }

        fill("white");
        noStroke();

        for (var i = 0; i < this.spaceship.lastPositions.length; i++) {
            var scale = (70 + this.spaceship.lastPositions[i].x - width / 10);
            this.spaceship.lastPositions[i].x -= 3;
            ellipse(this.spaceship.lastPositions[i].x, this.spaceship.lastPositions[i].y, scale / 10, scale / 10);
        }

        push();
        translate(this.spaceship.x, this.spaceship.y);
        rotate(max(-45, min(45, this.spaceship.goingTo - this.spaceship.y)));
        image(shipImg, 0, 0, 30, 30);
        pop();

        if (this.spaceship.goingTo < this.spaceship.y)
            this.spaceship.y -= this.spaceship.agility;
        else if (this.spaceship.goingTo > this.spaceship.y)
            this.spaceship.y += this.spaceship.agility;

        if (Math.abs(this.spaceship.goingTo - this.spaceship.y) < this.spaceship.agility) {
            this.spaceship.y = this.spaceship.goingTo;
        }

        this.mousePositions.start = mouseY;

        this.spaceship.lastPositions[this.spaceship.lastPositions.length] =
            { x: this.spaceship.x, y: this.spaceship.y + 15 };

        if (this.spaceship.lastPositions.length >= this.maxLastPoses) {
            this.spaceship.lastPositions.splice(0, this.spaceship.lastPositions.length - this.maxLastPoses);
        }

        this.spaceship.distance += 15;

        if (this.spaceship.y <= abc.a || this.spaceship.y + 30 >= abc.b) {
            this.end();
        }

        // stroke("black")
        // line(width/10 - 15,abc.a,width/10 + 15,abc.a);
        // line(width/10 - 15,abc.b,width/10 + 15,abc.b);
        // line(width/10 - 15,this.spaceship.y + 30,width/10 + 15,this.spaceship.y + 30)

        fill("white");
        for (var i = 0; i < this.orbs.length; i++) {
            ellipse(this.orbs[i].x, this.orbs[i].y, 10, 10);
            this.orbs[i].x -= 15;
            if (this.orbs[i].x < 0) {
                this.orbs.splice(i, 1);
                i--;
            }
            else {
                if (dist(this.orbs[i].x, this.orbs[i].y, this.spaceship.x, this.spaceship.y) < 16) {
                    this.orbs.splice(i, 1);
                    this.orbscore++;
                    console.log(this.orbscore);
                    i--;
                }
            }
        }

        for(var i = 0;i < this.rocks.length;i++){

            let val = this.rocks[i];
            val.show();
            val.pos.x -= 15;

            if (val.pos.x < 0) {
                this.rocks.splice(0, 1);
                i--;
            }

            if (dist(this.spaceship.x, this.spaceship.y, val.pos.x, val.pos.y) < val.rad + 15) {
                this.end();
            }
        }

        this.randomTick(abc);
    }

    onMouseReleased() {
        this.mousePositions.start = null;
    }

    randomTick(abc) {
        if (round(random(0, 40)) == 0) {
            let centerr = random(abc.c, height - abc.d);
            this.orbs.push({ x: width, y: centerr });
            this.orbs.push({ x: width, y: centerr - 20 });
            this.orbs.push({ x: width, y: centerr + 20 });
            this.orbs.push({ x: width - 20, y: centerr - 10 });
            this.orbs.push({ x: width + 20, y: centerr - 10 });
            this.orbs.push({ x: width - 20, y: centerr + 10 });
            this.orbs.push({ x: width + 20, y: centerr + 10 });
        }

        if (round(random(0, 40)) == 0) {
            this.rocks.push(new Rock(width + 150, round(random(abc.c + 50, height - abc.d - 50))));
        }
    }

    end() {
        console.log("you out");
    }
}