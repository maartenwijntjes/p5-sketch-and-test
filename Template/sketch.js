let p5editor=true
let running=true;

let dataHeader=['x','y'];
let counter = 0;
let maxtrials = 10;

function preload() {
  im=loadImage('https://p5paradigms.s3.eu-central-1.amazonaws.com/Template/images/1945.15.4.jpg');
}

function setup() {
  canvas=createCanvas(im.width, im.height);
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
    image(im,0,0);
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
