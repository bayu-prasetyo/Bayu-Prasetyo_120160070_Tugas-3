let Sun; // Sun's position vector
let Sun_D = 1391400; // Sun's diameter - km
let theta = 0; // Position controller
let wscale; // Scaling ratio - Canvas Width : Neptune's Orbital diameter
let zoom = 0.25 // Zoom scale
let warp = 15; // Time scale
let pause = false;

function setup() {
  createCanvas(1600, 800);
  background('black');
  wscale = width / (4540 * 2) * zoom;

  // Define Sun
  Sun = new Planet(["Sun", Sun_D / 2, 0, 0, 0, color('orange')]);
  Sun.x = width / 2;
  Sun.y = height / 2;

  // Define planets
  Saturn = new Planet(["Saturn", 116464*3, 1514.5*2, 1352.5*2, 10759*2, color('blue')]);
  Uranus = new Planet(["Uranus", 50724*3, 3008*2, 2742*2, 30689*2, color('yellow')]);
  Neptune = new Planet(["Neptune", 49244*3, 4540, 4460, 60182, color('white')]);
}

function draw() {
  if (pause) {
    // Do nothing, pause animation
  } else {
    background('black');
    Sun.show();

    // Planet positions
    theta = theta + 0.1 * warp;

    Saturn.move(theta);
    Uranus.move(theta);
    Neptune.move(theta);

  }

}

function mousePressed() {
  if (pause) {
    pause = false
  } else {
    pause = true
  }
}

class Planet {
  constructor(traits) {
    this.name = traits[0]; // Placeholder
    this.D = traits[1] / 2000 * zoom; // Average diameter of planet - km
    this.rx = traits[2] * wscale; // Aphelion - furthest distance to Sun - Gm
    this.ry = traits[3] * wscale; // Perihelion - closest distance
    this.P = traits[4] / 365 * 2 * PI; // Orbital period - Relative to Earth's period
    this.color = traits[5];
    this.x = 0; // Position in space (x, y)
    this.y = 0;
  }
  update(angle) {
    this.x = Sun.x + this.rx * cos(2 * PI / this.P * angle);
    this.y = Sun.y + this.ry * sin(2 * PI / this.P * angle);
  }
  show() {
    noFill();
    stroke(this.color);  // Orbit color
    strokeWeight(2);
    ellipse(Sun.x, Sun.y, 2 * this.rx, 2 * this.ry);  // Draw orbit
    fill(this.color);  // Planet color
    circle(this.x, this.y, this.D);  // Draw planet
  }
  move(angle) {
    this.update(angle);
    this.show();
  }
}