# P5 paradigms

A collection of example experiments for visual crowd research using [p5.js](https://p5js.org). To run these instantly:
1. open https://requester.mturk.com or maybe https://requestersandbox.mturk.com is safer to start with (and login)
2. Click on New project.
3. Select "other" from the templates and click "Create Project".
4. Fill in the MTurk details, if you just want to quickly see if it actually works: Only fill in "Reward per response" and press "Design Layout".
5. Delete the code and paste one the experiment HTML codes here, press "Preview".
6. Here you should be able to test the experiment already, after you finish the data will be shown on the screen. 
7. Finish it and publish! 







## ChangeBlindness


## BubbleView


## GaugeFigure (attitude probe)

## Composition

## Example

## Seting up your own experiments:

If you need images or measurement lists, they need to be downloaded from some place. The p5 command is 

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


## Todo etc.
1. It is possible to adjust your loading screen in p5.js, [here](https://github.com/processing/p5.js/wiki/p5.js-overview#loading-screen) is some info or you can watch [a cool Dan Shifmann instruction video](https://youtu.be/UWgDKtvnjIU).
2. The examples did not make use of the fullscreen option, while this is pretty simpe to accomplish, and in some cases rather necessary, [here](https://p5js.org/reference/#/p5/fullscreen) is all you need to know. 

