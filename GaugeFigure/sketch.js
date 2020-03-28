


//Begin P5 sketch. If you want to use develop using the editor.p5js.org, put the p5 editor variable to true


let p5editor=true
let stimname='matte';


let n=70;// ammount of lines with which the disk is rendered
let r=15;// size of disk and rod
let PHI_GAIN = 50; //phi (slant) has to be amplified, depending on image size, just adjust it untill it feels right
let linethickness=2;


let ex = [];
let ey = [];
let ez = [];

let phiGlobal
let thetaGlobal;
let im;
let xy;

let x,y;
let nPoints;
let trial;
let stim = 'vSK-A-465';

let counter = 0;
let ranord;

let data;
let running=true;

let header=['x','y','phi','theta','time (ms)'];
let mListHeader=['baryX','baryY'];
let timestamp;

function preload() {
  //im=loadImage('https://cors-anywhere.herokuapp.com/https://homepage.tudelft.nl/w3s80/p5mturk/stim.jpg');
  //xy = loadTable('https://cors-anywhere.herokuapp.com/https://homepage.tudelft.nl/w3s80/p5mturk/list.csv', 'csv','header');
  im=loadImage('https://materialcom.s3.eu-central-1.amazonaws.com/gaugeFigure/'+stimname+'.jpg');
  xy = loadTable('https://materialcom.s3.eu-central-1.amazonaws.com/gaugeFigure/'+stimname+'.csv', 'csv','header');
}

function setup() {
  canvas=createCanvas(im.width, im.height);
  if(!p5editor){
    canvas.parent('p5sketch');
  }

  noCursor();
  nPoints = xy.getRowCount();
  for (let i=0; i<n; i++){
    let t=i*2*PI/(n-1);
    ex[i]=r*cos(t);
    ey[i]=r*sin(t);
    ez[i]=0;
  }
  
  ranord=[...Array(nPoints).keys()];
  ranord=shuffle(ranord);//if commented out, then there is no randomisation, can be helpful in preparation phase.
  
  data = new p5.Table();
  for(let i = 0; i<header.length; i++){
    data.addColumn(header[i]);
  }
  timestamp=millis();
}

function draw() {
  if(running){
  trial=ranord[counter];
  //print(counter);
  //print(ranord);
  
  x=int(xy.get(trial,0));
  y=int(xy.get(trial,1));
  
  background(225);
  
  image(im,0,0);
  noStroke()
  fill(255,0,0)
  textSize(16);
  text('trial '+(counter+1)+' of '+nPoints,10,20);
  
  // phi and theta are defined by the mouse position with respect to the middle of the screen
  let phi=sqrt(pow((mouseX-width/2),2)+pow((mouseY-height/2),2))/PHI_GAIN;
  if (phi>=PI/2){phi=PI/2;}
  let theta=arctan(mouseX-width/2,mouseY-height/2);
  phiGlobal=phifun();
  thetaGlobal=thefun();
  
  drawEllipse(x,y,thetaGlobal,phiGlobal);
  drawRod(x,y,thetaGlobal,phiGlobal);
  }else{
   background(160,190,210);
    noStroke();
    fill(128,0,0);
    text('Thanks! you can press submit now!',20,im.height/2);
  }
}

function drawEllipse(x, y, theta, phi){
 //these trigoniomtric functions follow from multplying two 3D rotation matrices First around the y axis and then around the z axis
  noFill();
  stroke(255,0,0);
  strokeWeight(linethickness);
  beginShape();
  for (let i=0; i<n; i++){
    vertex(ex[i]*cos(phi)*cos(theta)  - ey[i]*sin(theta)+x, ey[i]*cos(theta) + ex[i]*cos(phi)*sin(theta)+y);
  }
  endShape();
}

function drawRod( x,y, theta, phi){
   let dx = r*cos(theta)*sin(phi);
   let dy = r*sin(phi)*sin(theta);
  line(x,y,x+dx,y+dy);
}


function arctan( x,  y){
  let arctan=0;
  if (x>=0){arctan=atan(y/x);}
  if (x<0&&y>=0){arctan=atan(y/x)+PI;}
  if (x<0&&y<0){arctan=atan(y/x)-PI;}
  return arctan
}

function mousePressed(){
  let newRow = data.addRow();
  newRow.setNum('x', x);
  newRow.setNum('y', y);
  newRow.setNum('phi', phiGlobal);
  newRow.setNum('theta', thetaGlobal);
  newRow.setNum('time (ms)',int(millis()-timestamp));
  timestamp=millis();
  counter++;
  
  
  if(counter>=nPoints){
    running=false;
    if(p5editor){
      saveTable(data, 'new.csv');
    }else{
      finished();
    }
    
    
    counter=0;
  }//hier dus een einde inbouwen!
}

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


function phifun(){
  let phi = sqrt(pow((mouseX-width/2),2)+pow((mouseY-height/2),2))/PHI_GAIN;
  if(phi>(PI/2)){phi=PI/2;}
  return phi;
}

function thefun(){
  let theta = arctan(mouseX-width/2,mouseY-height/2);
  return theta; 
}


//end P5 sketch