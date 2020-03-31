let p5editor=false
let running=true;

let dataHeader=['x','y'];
let counter = 0;
let maxtrials = 1;
let data;

function preload(){
  im1=loadImage('https://materialcom.s3.eu-central-1.amazonaws.com/composition/images/staalmeesters1.png');
  im2=loadImage('https://materialcom.s3.eu-central-1.amazonaws.com/composition/images/staalmeesters2.png');
  im3=loadImage('https://materialcom.s3.eu-central-1.amazonaws.com/composition/images/staalmeesters3.png');
  
}

function setup() {
  canvas=createCanvas(im1.width, im1.height);
  if(!p5editor){
    canvas.parent('p5sketch');
  }
  data = new p5.Table();
  for(let i = 0; i<dataHeader.length; i++){
    data.addColumn(dataHeader[i]);
  }
  
}

function draw() {
  if(running){
    image(im1,0,0);
    image(im3,mouseX-80,mouseY-300);
    image(im2,0,0);
    }else{
    background(160,190,210);
    noStroke();
    fill(128,0,0);
    text('Thanks! you can press submit now!',20,im.height/2);
  }
  
}


function mousePressed(){
  let newRow = data.addRow();
  newRow.setNum('x', mouseX);
  newRow.setNum('y', mouseY);
  counter++;
  if(counter>=maxtrials){
    running=false;
    if(p5editor){
      saveTable(data, 'new.csv');
    }else{
      finished();
    }
    counter=0;
  }
}

function finished(){
    expout = document.getElementById('expout');
    expout.value=table2csv();
}

function table2csv(){
  let outstrheader=join(dataHeader, ',');
  
  let nrows=data.getRowCount();
  let ncols=dataHeader.length;

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
