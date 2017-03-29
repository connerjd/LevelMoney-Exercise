# LevelMoney Exercise

## Table of Contents
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the App](#running-the-app)
* [Explanations](#explanations)
    * [The Plan](#the-plan)
    * [The Why](#the-why)
    * [The How](#the-how)
    * [The Afterthoughts](#the-afterthoughts)

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`

## Installing
* `fork` this repo
* `clone` your fork
* `npm install` to install dependencies

## Running the App
After you have installed all dependencies, you may run the app. Running `npm start` will bundle the app with `webpack`, launch a development server, and watch all files. The port will be displayed in the terminal.

# Explanation
This should give you guys some insight on my thought processes when starting to work on this exercise.

## The Plan
I have read through the exercise instructions thoroughly to understand what is being asked. Once that was done, I came up with some steps that need to be done in order to finish this exercise:
 
 1) Research and determine technology needed to finish exercise
 2) Research and select a boilerplate that fits the technology in determined in step one
 3) Setup a running instance of selected boilerplate 
 4) Setup initial commit (i.e., edit README, remove cruft etc.) 
 5) Start coding! (see [The How](#the-how))
 
## The How

Having a plan for how to write the code is normally pretty important for large tasks; I have come up with a couple of initial tasks to complete before diving too heavily into the coding.

* Consume a basic endpoint to set a (hopefully clean and scalable) paradigm for consuming the rest of the endpoint - GetAllTransactions in this case will be our basic endpoint
* Display response in browser
* Create human readable display of response (don't *just* display the JSON)
* Tackle additional features (that I have time for, anyways)
* Clean up the code (there will bound to be places for improvement)
* (May not have time for this) Make UI pretty

## The Why

###### Angular 1.5
I chose this mainly because it is what I am used to. React/Vue would be amazing to work with but I have more hours and expertise with Angular 1.

###### SASS
I honestly have no idea how I lived without SASS. This preprocessor not only increases productivity but it also makes the style sheet more readable!

###### $http
This is the built in service that facilitates communication with the remote HTTP servers. Other good options included:
* $resource
* Restangular

I have the most experience with $resource but the abstraction and scalability from $resource and Restangular really isn't needed here so I'm just going to go with the built in $http given that it is built in and is pretty straight forward.

###### webpack 
Not 100% needed but it will definitely help! Webpack is the hot and (relatively) new craze for module bundling. I won't name all of the benefits but the main reason we'll be using it is for loaders, plugins, and fast initial load time.

###### gulp
No real reason. I could used Grunt or just scripts with NPM but the boilerplate came with it so why not ¯\\\_(ツ)\_/¯

###### lodash
Easily one of the best utility libraries for Javascript. This will help me make things faster and more readable.

## The Afterthoughts

### Base exercise (display basic info)
Took me by surprise. I should've analyzed the data coming out of the endpoint a little more before starting to work. Was still pretty simple, just took a little more effort to format the data properly than anticipated.

### Ignore Donuts
Filtering the data was really simple since I separated concerns well when coding the initial display of info. The real issue was displaying the data with the filter. I wanted to display a loading icon whenever the data was being computed. To do that, I needed to create a client side promise using $q which took time (which I didn't have).

### Crystal Ball
I can do this but I don't have enough time.

### Ignore CC Payments
Again, just created a filter for this. Just displayed the filtered data just as I did with the basic data since I'm running out of time.
The payments seem to be off; some income transactions didn't have its counterpart and vise versa. Not sure if I was supposed to filter out those transactions or not.

### Overall
This was a fun little exercise. If I had more time, I would:
 * separate a bunch of my functions into services and filters so they can be used elsewhere
 * manage the endpoints server side using node.js services and use a client side factory with Restangular to call the server side data sources
 * make the ux better
 * create tests using karma

There are probably more things that I would change if I took glance over the codebase again but, as said, I'm running out of time and I'm done thinking for the night.
Please, feel free to email me giving me any form of critique at justindconner2@gmail.com. This is definitely not my best work but hopefully it'll give you some insight. Thanks for the exercise!
