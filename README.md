# P5 paradigms

A collection of example experiments for visual crowd research using [p5.js](https://p5js.org). To run these instantly:
1. open https://requester.mturk.com or maybe https://requestersandbox.mturk.com is safer to start with (and login)
2. Click on New project.
3. Select "other" from the templates and click "Create Project".
4. Fill in the MTurk details, if you just want to quickly see if it actually works: Only fill in "Reward per response" and press "Design Layout".
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

### and image/data/code storage

If you want to run an MTurk HIT, you need to have the images and data online, somewhere. That always gives headaches because servers don't like eachother content by default. This mechanisms is known as [Cross-Origin Resource Sharing (CORS)](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS). If you have an experiment that needs both images and measurement lists, here are two options to consider:
1. put your images on [imgur.com](https://imgur.com) and copy your table/array in your code.
2. upload your images and .csv file on a webserver for which you can control the CORS settings.

We used [Amazon S3](http://s3.console.aws.amazon.com/) and also put our HTML and .js files there. It is not necessary but it is nice to have all your experiment files in one place. On Amazon S3 you need to make your files public, obviously, and change the CORS settings. We found this, and it seems to work!

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




## ChangeBlindness


## BubbleView


## GaugeFigure (attitude probe)

## Composition

## Example




## Todo etc.
1. It is possible to adjust your loading screen in p5.js, [here](https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen) is some info or you can watch [a cool Dan Shifmann instruction video](https://youtu.be/UWgDKtvnjIU).
2. The examples did not make use of the fullscreen option, while this is pretty simpe to accomplish, and in some cases rather necessary, [here](https://p5js.org/reference/#/p5/fullscreen) is all you need to know. 

