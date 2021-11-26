import * as P5 from 'p5';

class Stage {
  container:HTMLDivElement;
  points:any = Array(500).fill(''); 
  t:any = 0.8;
  location:any;

  constructor() {
    new P5(this.sketch);
  }

  sketch = (p5: P5) => {
    p5.setup = () => {
      const canvas = p5.createCanvas(window.innerWidth, window.innerHeight);
      canvas.style('position', 'absolute');
      canvas.style('left', 0);
      canvas.style('top', 0);
      canvas.style('z-index', 1);
      p5.frameRate(60);
      this.location = { x: p5.width / 2, y: p5.height / 2 };
    }


    p5.draw = () => {
      const angle = p5.radians(360) / this.points.length;
      const radius = 200;

      p5.beginShape();
      p5.strokeWeight(1);

      this.points.forEach((item:any, index:any) => {
        let x = p5.cos(angle * index) * radius;
        let y = p5.sin(angle * index) * radius;
        let p = p5.createVector(x,y).normalize();
        let n = p5.map(p5.noise(p.x + this.t, p.y + this.t), 0, 1, 70, 300)
        p.mult(n*2);
        
        p5.vertex(this.location.x + p.x, this.location.y + p.y)
      });

      p5.endShape(p5.CLOSE);

      this.t += 0.007;



    }
  }

}

export default Stage;