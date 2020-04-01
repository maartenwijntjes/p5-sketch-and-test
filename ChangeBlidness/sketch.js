/*
This P5 sketch was made by Maarten Wijntjes and Mitchell Van Zuijlen. 
Image are from Li-Qian Ma et al. (2013). See, https://cg.cs.tsinghua.edu.cn/cbi/
*/

var experiment = false;
var stimuli = [];
var counter = 0;
var max_height = 0;
var max_width = 0;
var image_offset = 50;
var stimulus;
let ranord;
let trial;
let timestamp;

function preload() {
  let input_url = 'https://materialcomv2.s3.eu-central-1.amazonaws.com/changeBlindness/input.csv'
  input_data = loadTable(input_url, 'csv', 'header', load_images);
  output_data = new p5.Table();
  output_data.columns = ['pre', 'post', 'xfiducial', 'yfiducial', 'xchosen', 'ychosen', 'dist', 'rt (ms)']

}


function load_images() {
  // load_images is called AFTER the table is loaded. 
  // Otherwise, the code will continue with a table object that does not have data in yet.
  var url = 'https://materialcomv2.s3.eu-central-1.amazonaws.com/changeBlindness/'
  // is executed once input_data is loaded
  for (let i = 0; i < input_data.getRowCount(); i++) {
    // load the images and put them together into the trials list
    stimuli.push([
      loadImage(url + input_data.getColumn('pre')[i]),
      loadImage(url + input_data.getColumn('post')[i])
    ])
  }
}

function setup() {
  // create canvas equal to the largest image, plus a little extra space for text
  // determ which image has the biggest width/height

  for (let i = 0; i < stimuli.length; i++) {
    pair = stimuli[i];
    if (max(pair[0].width, pair[1].width) > max_width) {
      max_width = max(pair[0].width, pair[1].width)
    }
    if (max(pair[0].height, pair[1].height) > max_height) {
      max_height = max(pair[0].height, pair[1].height)
    }
  }

  canvas = createCanvas(max_width, max_height + image_offset)

  if (onMturk()) {
    console.log("It is on mturk.")
    canvas.parent('p5sketch');
  }

  background(128);
  textSize(18);
  text("Press enter to start!", 20, 20)
  frameRate(10);

  ranord = [...Array(input_data.getRowCount()).keys()];
  ranord = shuffle(ranord); //if commented out, then there is no randomisation, can be helpful in preparation phase.
}

function keyPressed() {
  // This function is automatically called when a keyboard-key is pressed

  if (keyCode == ENTER) {
    if (!experiment) { // first time, after that ignore
      frameCount = 0;
      experiment = true
      console.log("experiment start")
      background(128);
      timestamp = millis();
    }
  }
}

function nextTrial() {
  // start the next trial
  counter++;
  frameCount = 0;
  background(128);

  if (counter == stimuli.length) {
    experiment = false // experiment has ended
    console.log("experiment end");
    text("That's the end of the experiment!", 20, 20)
    finished();
  }
}

function mousePressed() {
  // This function is automatically called when the mouse buttons are pressed
  if (experiment) {
    let row = output_data.addRow();
    // we add the x,y mouse position. 0,0 is top left, 1,1 is bottom right
    x = mouseX / stimuli[trial][0].width
    y = (mouseY - image_offset) / stimuli[trial][0].height
    // calculate distance from 'correct' answer and the given answer
    let d = float(dist(
      input_data.getColumn('x')[trial], // The 'correct' answer in the input data
      input_data.getColumn('x')[trial],
      x, // the given answer from the participant
      y
    ));

    row.set('pre', input_data.get(trial, 'pre'));
    row.set('post', input_data.get(trial, 'post'));

    row.setNum('xfiducial', input_data.getColumn('x')[trial]);
    row.setNum('yfiducial', input_data.getColumn('y')[trial]);

    row.setNum('xchosen', x);
    row.setNum('ychosen', y);
    row.setNum('dist', d);
    row.setNum('rt (ms)', millis() - timestamp);

    timestamp = millis();
    nextTrial();
  }
}


function draw() {

  if (experiment) {
    text("Click where you see the change. Trial: " + counter, 20, 20)

    trial = ranord[counter];
    stimulus = stimuli[trial];

    if (frameCount < 5) { // we show the first image at frame 1,2,3,4    
      image(stimulus[0], 0, 50);
    } else if (frameCount > 5 & frameCount < 10) { // second image @ 6,7,8,9
      image(stimulus[1], 0, 50);
    } else { // we show the background at frame 5 and 10
      background(128);
    }

    if (frameCount == 10) {
      // frameCount is a p5 default variable and every frame it is automatically incremented.
      frameCount = 0;
    }
  }
}

function finished() {
  clicked = false;
  if (onMturk()) {
    expout = document.getElementById('expout');
    expout.value = table2csv();
  } else {
    // This would work in the p5 editor
    saveTable(output_data, 'data.csv');
  }
}

function onMturk() {
  console.log("Is it on mturk?")
  return document.location['href'].includes('mturk.com')
}

function table2csv() {
  header = output_data.columns
  let outstrheader = join(header, ',');
  let nrows = output_data.getRowCount();
  let ncols = header.length;
  let outstr = [];

  for (let j = 0; j < nrows; j++) {
    let tempArray = [];
    for (let i = 0; i < ncols; i++) {
      tempArray[i] = output_data.get(j, i);
    }
    outstr[j] = join(tempArray, ',');
  }
  return outstrheader + '\n' + join(outstr, '\n');
}