

//Begin P5 sketch. If you want to use develop using the editor.p5js.org, put the p5 editor variable to true


  /*
BubbleView (http://bubbleview.namwkim.org) is cool, not only because it seems quite usefull (for an overview of more methods see http://turkeyes.mit.edu) but I also like the interface. You can also do some more creative things with it. 

This P5 sketch was made by Maarten Wijntjes, 

*/
let p5editor=false
let maxclicks=20;
let running=true

let blurim,sharpim,aperture;
let mwidth,mheight;

// radius of the aperture
let radius=32; 

let trial=0;

let data;

// Everything is scaled to the width you want to present the sketch in. Aspectratios are maintained.
let sketchwidth=600;

let aspectratio,sketchheight;

let clicked=false;

let header=['x','y','r','imagename'];

let root='https://materialcom.s3.eu-central-1.amazonaws.com/bubbleview/stims/'
let imnameshort='wsj104.png';
let imagename=root+imnameshort;

function preload(){
  sharpim=loadImage(imagename);
 }

function setup() {
  blurim=sharpim.get();
  aspectratio=sharpim.height/sharpim.width
  sketchheight=sketchwidth*aspectratio;

  canvas=createCanvas(sketchwidth, sketchheight);
  if(!p5editor){
    canvas.parent('p5sketch');
  }

  sharpim.resize(sketchwidth, sketchheight);
  
  blurim.resize(sketchwidth, sketchheight);
  blurim.filter(BLUR, 10);
  
  aperture=createImage(2*radius,2*radius);
  
  noCursor();
  
  data = new p5.Table();
  for(let i = 0; i<header.length; i++){
    data.addColumn(header[i]);
  }
  
}

function draw() {
checkTrials();
  imageMode(CORNER);
  image(blurim,0,0);
  imageMode(CENTER);
  
  if(clicked){
    image(aperture,data.getNum(trial-1, "x"),data.getNum(trial-1, "y"));
  }
  
  noFill();
  stroke(255,0,0);
  ellipse(mouseX,mouseY,2*radius,2*radius);
  noStroke();
  fill(255,0,0)
  textSize(20);
  text(trial,10,30);
  if(!running){
     background(160,190,210);
    noStroke();
    fill(128,0,0);
    text('Thanks! you can press submit now!',20,sharpim.height/2);
  }
}


function mouseClicked(){
  trial++
  sharpim.loadPixels();
  aperture.loadPixels();
  let c;
  
  for (let i = 0; i < aperture.width; i++) {
    for (let j = 0; j < aperture.height; j++) {
      if(dist(i, j, aperture.width/2, aperture.height/2)<aperture.width/2){
        c=sharpim.get(mouseX+i-aperture.width/2,mouseY+j-aperture.height/2);
        aperture.set(i, j, c);
    }else{
      aperture.set(i, j, color(0, 0, 0, 0));
    }
    }
  }
  aperture.updatePixels();
  
  let newRow = data.addRow();
  newRow.setNum('x', int(mouseX));
  newRow.setNum('y', int(mouseY));
  newRow.setNum('r', radius);
  newRow.setString('imagename',imnameshort);
  
  if(clicked){
    clicked=true;
  }else{
    clicked=true;
  }
}


function checkTrials(){
  if (trial == maxclicks) {
    running=false
    //This will not work in the P5 editor
    //hier moet nog iets dat data wegschrijft in p5 editor. 
    trial=1;
    if(p5editor){
      saveTable(data, 'new.csv');
    }else{
      finished();
    }
  }
  
} 
  
/*function keyPressed() {
  if (keyCode === ENTER) {
    //This will not work in the P5 editor
    //hier moet nog iets dat data wegschrijft in p5 editor. 
    if(p5editor){
      saveTable(data, 'new.csv');
    }else{
      finished();
    }
  } 
}*/

function finished(){
  clicked=false;
    expout = document.getElementById('expout');
    expout.value=table2csv();
}

function table2csv(){
  let outstrheader=join(header, ',');
  
  let nrows=data.getRowCount();
  let ncols=header.length;

  let outstr=[];
  for(let j=0; j<nrows; j++){
    let tempArray=[];
    for(let i=0; i<ncols; i++){
      tempArray[i]=data.get(j,i);
    }
    outstr[j]=join(tempArray,','); 
  }
  return outstrheader+'\n'+join(outstr,'\n');
}

//end P5 sketch