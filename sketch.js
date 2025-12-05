let particles = [];
particles.length = 100;
let zMax = 7;
let zMin = 0.2;

function setup() 
{
  createCanvas(800, 600);
  stroke(255, 64);
  strokeWeight(0.01);
  for (let i = 0; i < particles.length; i++)
  {
    particles[i] = new Particle(random(width/16, width - width/16), random(height/4, height - height/4), random(zMin, zMax));
    particles[i].rateX = random(-1, 1);
    particles[i].rateY = random(-1, 1);
  }
}

function draw() 
{
  background(0, 64);

  particles.sort(function(a, b)
  {
    return a.z - b.z;
  });

  for (let i = 0; i < particles.length; i++)
  {
    particles[i].display();
    let a = map(particles[i].z, zMin, zMax, 16, 127);
    stroke(255, a);
    let sWeight = map(particles[i].z, zMin, zMax, 0.01, zMax/2);
    strokeWeight(sWeight);
    //line(particles[i].x, particles[i].y, width/2, height/2);

    if (i)
    {
      line(particles[i].x, particles[i].y, particles[i - 1].x, particles[i - 1].y);
    }

    //particles[i].mouseMove();
    particles[i].autoMove();
  }
}

function mousePressed()
{
  for (let i = 0; i < particles.length; i++)
  {
    let angle = map (i, 0, particles.length, 0, TWO_PI);
    particles[i].x = width/2 + width/4 * cos(angle);
    particles[i].y = height/2 + height/4 * sin(angle);
    particles[i].rateX = random(-0.5, 0.5);
    particles[i].rateY = random(-0.5, 0.5);
  }
}

class Particle
{
  constructor(_x, _y, _z)
  {
    this.x = _x;
    this.y = _y;
    this.z = _z;
    this.rateY = 0.5;
    this.rateX = 2.05;
    this.r = 255;
    this.g = 255;
    this.b = 255;
  }

  display()
  {
    noStroke();
    let alpha = map(this.z, 0, zMax, 8, 255);
    fill(this.r, this.g, this.b, alpha);
    circle(this.x, this.y, this.z);
    //square(this.x, this.y, this.z);
  }

  mouseMove()
  {
    let xOff = map(mouseX, 0, width, -2, 2);
    let yOff = map(mouseY, 0, height, -2, 2);
    let zScale = map(this.z, zMin, zMax, 0.01, 1);
    this.x += xOff * zScale;
    this.y += yOff * zScale;
  }

  autoMove()
  {
    let zScale = map(this.z, zMin, zMax, 0.01, 1);
    this.y += this.rateY * zScale;
    this.x += this.rateX * zScale;

    if (this.y - this.z/2 < height/8 || this.y + this.z/2 > height - height/8)
    {
      this.rateY = -this.rateY;
    }

    if (this.x - this.z/2 < width/32 || this.x + this.z/2 > width - width/32)
    {
      this.rateX = -this.rateX;
    }
  }
}

