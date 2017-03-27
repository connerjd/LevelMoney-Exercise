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
