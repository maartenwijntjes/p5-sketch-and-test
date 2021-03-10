  /*
  This P5 sketch was made by Maarten Wijntjes and Mitchell Van Zuijlen, 
  */
  let stimname = 'matte';

  practiceTrials = 10;
  practice = true;

  let n = 70; // ammount of lines with which the disk is rendered
  let r = 15; // size of disk and rod
  let PHI_GAIN = 50; //phi (slant) has to be amplified, depending on image size, just adjust it until it feels right
  let linethickness = 2;


  let ex = [];
  let ey = [];

  let im;
  let xyData;

  let x, y;
  let nPoints;
  let trial;


  let counter = 0;
  let ranord;

  let data;
  let running = true;

  let header = ['x', 'y', 'phi', 'theta', 'time (ms)'];
  let mListHeader = ['baryX', 'baryY'];
  let timestamp;

  function preload() {
    im = loadImage('https://p5paradigms.s3.eu-central-1.amazonaws.com/GaugeFigure/' + stimname + '.jpg');
    xyData = loadTable('https://p5paradigms.s3.eu-central-1.amazonaws.com/GaugeFigure/' + stimname + '.csv', 'csv', 'header');
  }

  function setup() {
    canvas = createCanvas(im.width, im.height);
    if (!onP5Editor()) {
      canvas.parent('p5sketch');
    }

    noCursor();

    for (let i=0; i<n; i++){
      let t=i*2*PI/(n-1);
      ex[i]=r*cos(t);
      ey[i]=r*sin(t);
    }

    nPoints = xyData.getRowCount();
    ranord = [...Array(nPoints).keys()];
    ranord = shuffle(ranord);//if commented out, then there is no randomisation, can be helpful in preparation phase.

    data = new p5.Table();
    for (let i = 0; i < header.length; i++) {
      data.addColumn(header[i]);
    }

    timestamp = millis();
  }

  function draw() {
    if (running) {
      if (counter >= 0) {

        trial = ranord[counter];
        x = int(xyData.get(trial, 0));
        y = int(xyData.get(trial, 1));

        background(225);
        image(im, 0, 0);
        noStroke()
        fill(255, 0, 0)
        textSize(16);
        if (practice) {
          text('Practice trial ' + (counter + 1) + ' of ' + practiceTrials, 10, 20);
        } else {
          text('trial ' + (counter + 1) + ' of ' + nPoints, 10, 20);
        }

        // phi and theta are defined by the mouse position with respect to the middle of the screen
        let theta = CalcTheta();
        let phi = CalcPhi();

        drawEllipse(x, y, theta, phi);
        drawRod(x, y, theta, phi);
      }
      else {
        background(160, 190, 210);
        noStroke();
        fill(128, 0, 0);
        text('Actual experiment starts now!', 20, im.height / 2);
      }

    } else {
      background(160, 190, 210);
      noStroke();
      fill(128, 0, 0);
      text('Thanks! you can press submit now!', 20, im.height / 2);
    }

  }

  function drawEllipse(x, y, theta, phi) {
    //these trigoniomtric functions follow from multplying two 3D rotation matrices First around the y axis and then around the z axis
    noFill();
    stroke(255, 0, 0);
    strokeWeight(linethickness);
    beginShape();
    for (let i = 0; i < n; i++) {
      vertex(ex[i]*cos(phi)*cos(theta)  - ey[i]*sin(theta)+x, ey[i]*cos(theta) + ex[i]*cos(phi)*sin(theta)+y);
    }
    endShape();
  }

  function drawRod(x, y, theta, phi) {
    let dx = r * cos(theta) * sin(phi);
    let dy = r * sin(phi) * sin(theta);
    line(x, y, x + dx, y + dy);
  }


  function arctan( x,  y){
    let arctan=0;
    if (x>=0){arctan=atan(y/x);}
    if (x<0&&y>=0){arctan=atan(y/x)+PI;}
    if (x<0&&y<0){arctan=atan(y/x)-PI;}
    return arctan
  }

  function mousePressed() {
    let newRow = data.addRow();
    newRow.setNum('x', x);
    newRow.setNum('y', y);
    newRow.setNum('phi', CalcPhi());
    newRow.setNum('theta', CalcTheta());
    newRow.setNum('time (ms)', int(millis() - timestamp));
    timestamp = millis();
    counter++;
    if (practice) {
      if (counter >= practiceTrials) {
        practice = false;
        counter = -1;
      }
    }

    if (counter >= nPoints) {
      running = false;
      finished();
      counter = 0;
    }//hier dus een einde inbouwen!
  }

  function finished() {
    if (onP5Editor()) {
      saveTable(data, 'data.csv'); // This would work in the p5 editor
    } else {
      let expout = document.getElementById('expout');
      expout.value = table2csv();
    }
  }

  function table2csv() {
    let outstrheader = join(header, ',');

    let nrows = data.getRowCount();
    let ncols = header.length;

    let outstr = [];
    for (let j = 0; j < nrows; j++) {
      let tempArray = [];
      for (let i = 0; i < ncols; i++) {
        tempArray[i] = data.get(j, i);
      }
      outstr[j] = join(tempArray, ',');
    }
    return outstrheader + '\n' + join(outstr, '\n');
  }


  function CalcPhi() {
    let phi = sqrt(pow((mouseX - width / 2), 2) + pow((mouseY - height / 2), 2)) / PHI_GAIN;
    if (phi > (PI / 2)) {
      phi = PI / 2;
    }
    return phi;
  }

  function CalcTheta() {
    return arctan(mouseX - width / 2, mouseY - height / 2);
  }

  function onP5Editor() {
    let document_ancestor = document.location.ancestorOrigins;
    if (document_ancestor.length) { // if it's in an iframe{}
      return document_ancestor[0].includes('editor.p5js.org');
    }
    return false;
  }