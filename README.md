# Sketch and test: visual crowd research with p5.js

This repository contains a collection of example experiments for visual crowd research using [p5.js](https://p5js.org). We found that for doing our own perceptual experiments online, the use of p5.js was kind of a revelation. To share our experiences, give some  background info about perception *and* a contemplation about the bigger context of *visual crowd research*, we wrote a paper that is almost in preprint. Here we share the practicalities. 

## Instant example ([video 1](https://youtu.be/2g6cV_si2U0))

 To run these instantly:
1. open https://requester.mturk.com or maybe https://requestersandbox.mturk.com is safer to start with (and login)
2. Click on New project.
3. Select "other" from the templates and click "Create Project".
4. Fill in the MTurk details (impatient/hurry? -> only fill in "Reward per response") and press "Design Layout".
5. Delete the code and paste one the experiment HTML codes here, press "Preview".
6. Here you should be able to test the experiment already, after you finish the data will be shown on the screen. 
7. Finish it and publish! 


## Setting up your own experiments ([video 2](https://youtu.be/1gpCETF_OrQ))

### p5.js 

One of the advantages of using p5.js is that you can develop the experiments' interaction design (the task) in p5.js' [online editor](https://editor.p5js.org). So check out some example code and get yourself familiar with this [Processing](https://Processing.org) inspired JavaScript library. 

To see our experiments in this online editor environment, you can simply copy-paste the sketch.js content from the experiments into the online editor. That works for two reasons:
1. The images and measurement lists are online
2. We made a function onP5Editor() that is used to do two things differently than in MTurk: canvas creation and data exporting.
If you make your own p5.js sketch you can also put images and .csv files in the sketch directory, but then you'll run into trouble when putting stuff elsewhere (e.g. MTurk).

Use a (p5.Table)[https://p5js.org/reference/#/p5.Table] to store your data in. It is very convenient, just a csv kind of file with a header. In the examples there is a function table2csv() that converts this table to a csv-style string which in turn is saved as a field in the MTurk data. There are likely more elegant solutions, we are open for feedback! 

All the essentials that are needed in a p5.js sketch can be found in the Example sketch. 

### Image/data/code storage ([video 3](https://youtu.be/ORLXzF5Kiwo))

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


# Example experiments ([video 4](https://youtu.be/MP0ciAIy3-o))
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

After all this JavaScript loading, you can do HTML in `<crowd-form answer-format="flatten-objects">HERE</crowd-form>`. The place to write your instructions and link the sketch should be evident from the Example.html. There is one important line: `<crowd-input hidden name="dataoutput" id="expout" placeholder=" " required></crowd-input>` which gets the data from the p5.js sketch. The 'required' is there that the HIT can be submitted after finishing the experiment. 

In the sketch.js, that data comes from:
```
expout = document.getElementById('expout');
expout.value = table2csv();
```
Where the table2scv() is a function that converts the P5.table to a csv thing. In the end, you'll end up with some kind of meta-csv, as the csv file will be part of a larger csv file. I did not experience much problems with that, but if you are not so experienced in data analysis, you probably have to do some copy-pasting.


## ChangeBlindness

This experiment is a good example of how to load images using filenames from a .csv file and for collecting and saving data with p5.Table. Because we uploaded all files including the HTML files can check the experiment out [here](https://p5paradigms.s3.eu-central-1.amazonaws.com/ChangeBlindness/ChangeBlindness.html). Mind that some CSS tweaking would be advised as there are no margins (if in MTurk environment there are margins sort of automatically because I think it runs in an iFrame). 

If you want to know more about this experiment you could check the [wikipedia site](https://en.wikipedia.org/wiki/Change_blindness) although you should always be a little cautious with wikipedia and science. 


## BubbleView
The BubbleView paradigm was developed by NamWook Kim, Zoya Bylinskii et al. Check out their [project page](http://bubbleview.namwkim.org) for background and this [github repository](https://github.com/cvzoya/bubbleview) for data. The later project [TurkEyes](http://turkeyes.mit.edu) is also very much worth to visit because it is a collection of experiments (somebody should make p5.js versions!).

With BubbleView you can collect click data that are similar to eye fixations and are thus a good metric for saliency in images. We choose this paradigm not only because we like it but also because it demonstrates p5.js' capability of blurring and displaying selected pixel areas of an image. Check out the code yourself, or do a quick demo [here](https://p5paradigms.s3.eu-central-1.amazonaws.com/BubbleView/BubbleView.html).


## GaugeFigure (attitude probe)
This task has been used often in research on 3D shape perception. The original paper can be found [here](http://dspace.library.uu.nl/bitstream/handle/1874/7542/kappers_92_surface_perception_pictures.pdf?sequence=1&isAllowed=y) and [this](https://dspace.library.uu.nl/bitstream/handle/1874/7566/kappers_96_pictorial_surface_local_depth.pdf?sequence=1) may be interesting complementary reading. 

The observer adjusts the 3D orientation of a 'thumb stack'-ish shape: a disk with a rod sticking out. The task is to orient it such that the disk lies flat on the pictorial surface, while the rod sticks out perpendicularly. This is essentially the *perceived* local normal vector. You can do all kinds of cool stuff in the analysis of this data, just use the papers above to start looking for other studies.

Our p5.js adaptation is probably written a bit inefficient/inelegant. I used some old Processing code I wrote years ago, that was based on old Psychtoolbox code from more years ago. If you want to rewrite it, you are very welcome! However inelegant as it is, it does work. Be aware that doing a GaugeFigure task also involves preparation (creating sample location based on triangulation) and analysis (e.g. reconstructing the global 3D relief), which are not in this code. Feel free to contact us if you would need help. 

[Here](https://p5paradigms.s3.eu-central-1.amazonaws.com/GaugeFigure/GaugeFigure.html) is a demo.


## Composition

This is a very simple experiment, but not less important! It simply concerns the placement of a character in a composition, but it demonstrates the wide possibilities of visual crowd research. They are not limited to perception experiments but can also be used for these small preference task, and also annotations. Off course we know there are a zillion annotation tools available in the computer science community, but with p5.js it can be quite intuitive to make your own. 

[Here](https://p5paradigms.s3.eu-central-1.amazonaws.com/Composition/Composition.html) is a demo.


## Todo etc.
1. It is possible to adjust your loading screen in p5.js, [here](https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen) is some info or you can watch [a cool Dan Shifmann instruction video](https://youtu.be/UWgDKtvnjIU).
2. The examples did not make use of the fullscreen option, while this is pretty simpe to accomplish, and in some cases rather necessary, [here](https://p5js.org/reference/#/p5/fullscreen) is all you need to know. 
3. You may want to have different pages with instructions etc. You can do that either in HTML or integrate it in the p5.js code. I think I would go for the p5.js code, but if you want to do it in HTML, maybe check out [Brady's MTurk tutorial](https://bradylab.ucsd.edu/ttt/). 

