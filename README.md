# P5 paradigms

This repository contains a collection of example experiments for visual crowd research using [p5.js](https://p5js.org). We found that for doing our own perceptual experiments online, the use of p5.js was kind of a revelation. To share our experiences, give some  background info about perception *and* a contemplation about the bigger context of *visual crowd research*, we wrote a paper that is almost in preprint. Here we share the practicalities. 

## Instant examples

 To run these instantly:
1. open https://requester.mturk.com or maybe https://requestersandbox.mturk.com is safer to start with (and login)
2. Click on New project.
3. Select "other" from the templates and click "Create Project".
4. Fill in the MTurk details (impatient/hurry? -> only fill in "Reward per response") and press "Design Layout".
5. Delete the code and paste one the experiment HTML codes here, press "Preview".
6. Here you should be able to test the experiment already, after you finish the data will be shown on the screen. 
7. Finish it and publish! 


## Setting up your own experiments:

### p5.js 

One of the advantages of using p5.js is that you can develop the experiments' interaction design (the task) in p5.js' [online editor](https://editor.p5js.org). So check out some example code and get yourself familiar with this [Processing](https://Processing.org) inspired JavaScript library. 

To see our experiments in this online editor environment, you can simply copy-paste the sketch.js content from the experiments into the online editor. That works for two reasons:
1. The images and measurement lists are online
2. We made a function onP5Editor() that is used to do two things differently than in MTurk: canvas creation and data exporting.
If you make your own p5.js sketch you can also put images and .csv files in the sketch directory, but then you'll run into trouble when putting stuff elsewhere (e.g. MTurk).

Use a (p5.Table)[https://p5js.org/reference/#/p5.Table] to store your data in. It is very convenient, just a csv kind of file with a header. In the examples there is a function table2csv() that converts this table to a csv-style string which in turn is saved as a field in the MTurk data. There are likely more elegant solutions, we are open for feedback! 

All the essentials that are needed in a p5.js sketch can be found in the Example sketch. 

### Image/data/code storage

If you want to post an MTurk HIT, you need to have the images and data online, somewhere. That always gives headaches because servers don't necessarily like each others' content. This mechanisms is known as [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). If you have an experiment that needs both images and measurement lists, here are two options to consider:
1. put your images on [imgur.com](https://imgur.com) and copy/type your measurement list as a table/array in your code.
2. upload your images and .csv file on a webserver for which you can control the CORS settings.

The second option is best but also more complex. We used [Amazon S3](http://s3.console.aws.amazon.com/) as server and also put our HTML and .js files there. It is not necessary but it is nice to have all your experiment code and files in one place. On Amazon S3 you need to make your files public, obviously, and change the CORS settings. We found this, and it seems to work!

```

<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedMethod>HEAD</AllowedMethod>
    <MaxAgeSeconds>3000</MaxAgeSeconds>
    <AllowedHeader>Authorization</AllowedHeader>
</CORSRule>
</CORSConfiguration>

```


### HTML MTurk
As read in the instructions of the instant examples, you need to put some HTML code on the MTurk requester portal. Off course you can also use the MTurk API, but that is not our scope here. By the way, I really recommend [Brady's MTurk Tutorial](https://bradylab.ucsd.edu/ttt/) for more info about clever HTML tricks. 

After creating your p5.js sketch you have (again!) two options:
1. Integrate your .js sketch in the HTML code
2. Put your .js file on a server and create a link in the HTML code.  
The latter option makes the HTML code clear, but if you want to go back and forth between the p5.js online editor and MTurk you can better paste the code. <!--If you happen to put your sketch.js file online, you might as well put the HTML file (with the sketch.js file) online, like we did. The HTML file will acually -->


# Example experiments 
We'll describe a few aspects of the example experiments below, for more background and results of tests we did, please check the preprint.


## Example
This is a nonsense experiment, but shows an image, collects click data, so should have allmost all the basics needed to experiment. Th HTML file starts with loading some packages:
```
<script src="https://assets.crowd.aws/crowd-html-elements.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.10.2/p5.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.9.0/addons/p5.dom.min.js"></script>
<!--Link to P5 sketch:-->
<script src="https://materialcom.s3.eu-central-1.amazonaws.com/template/sketch.js"></script>
```
The MTurk crowd elements are needed as you'll need at least a button to submit the HIT when finished. Then the p5.js library is loaded (including the dom, not sure if this is still necessary?!). Lastly we put a link to the sketch. Instead of the link, you can also just copy-paste your whole p5 sketch (`<script>copy it here!</script>`) but mind that you use `canvas.parent('p5sketch')` in the `setup()` as that is used to *place* that sketch in the page layout. 

After all this JavaScript loading, you can do HTML in `<crowd-form answer-format="flatten-objects">HERE</crowd-form>`.


## ChangeBlindness


## BubbleView


## GaugeFigure (attitude probe)

## Composition






## Todo etc.
1. It is possible to adjust your loading screen in p5.js, [here](https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen) is some info or you can watch [a cool Dan Shifmann instruction video](https://youtu.be/UWgDKtvnjIU).
2. The examples did not make use of the fullscreen option, while this is pretty simpe to accomplish, and in some cases rather necessary, [here](https://p5js.org/reference/#/p5/fullscreen) is all you need to know. 

