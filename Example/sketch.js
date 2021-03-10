/*
This P5 sketch was made by Maarten Wijntjes and Mitchell Van Zuijlen, 
*/
let running = true;

let dataHeader = ['x', 'y'];
let counter = 0;
let maxtrials = 10;

function preload() {
  im = loadImage('https://p5paradigms.s3.eu-central-1.amazonaws.com/Example/images/1945.15.4.jpg');
}

function setup() {
  canvas = createCanvas(im.width, im.height);
  if (!onP5Editor()) {
    // on the p5 editor, the canvas is automatically attached to the DOM. If not, we need to manually attach it.
    canvas.parent('p5sketch');
  }
  data = new p5.Table();
  for (let i = 0; i < dataHeader.length; i++) {
    data.addColumn(dataHeader[i]);
  }

}

function draw() {
  if (running) {
    image(im, 0, 0);
    text('counter = ' + counter, 20, 20);
  } else {
    background(160, 190, 210);
    noStroke();
    fill(128, 0, 0);
    text('Thanks! you can press submit now!', 20, im.height / 2);
  }

}


function mousePressed() {
  let newRow = data.addRow();
  newRow.setNum('x', mouseX);
  newRow.setNum('y', mouseY);
  counter++;
  if (counter >= maxtrials) {
    running = false;
    finished();
    counter = 0;
  }
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
  let outstrheader = join(dataHeader, ',');

  let nrows = data.getRowCount();
  let ncols = dataHeader.length;

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

function onP5Editor() {
  let document_ancestor = document.location.ancestorOrigins;
  if (document_ancestor.length) { // if it's in an iframe{}
    return document_ancestor[0].includes('editor.p5js.org');
  }
  return false;
}