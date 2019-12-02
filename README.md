# Roomer-Scheduler - React room scheduling app for organizations
Roomer-Scheduler is a room scheduling app for organizations built using React, integrated with Node.js/Express backend.

A demo for the Website App is available [here](https://roomer-development.herokuapp.com/).

<!-- ![roomer](website.gif "mamas restaurant") -->

## How to use?
The calendar is drag and dropable: 
* Adding events by dragging.
* Change the event's time by dragging or resizing.
* Delete event by double click.
* Edit by click.

## Backend routes
* Update user's items in db - POST `/api/items/:email/:title/:action`
    
* Authenticate user with cookie on lunching the app and getting user's data - GET `/api/items/:email/:title/:action`
    
* Admin get all database - GET `/api/admin/data/:email`
        
* Login user - GET `/api/user/login/:email/:password/:remember`

* Logout user - POST `/api/user/logout`

* Signup new user - POST `/api/user/signup`

* Delete a user - DELETE `/api/user/:email/:password`
   
* Post a new order - POST `/api/order/new/:email`
      
* Get gallery images (Simulates database access) - GET `/api/gallery`
   
* Serves react client static files - GET `*`

## Prerequisites
1. Git
2. Node v10.16.1
3. A fork/clone of this repo

## Installation
1. `npm install`
1. `npm run dev`
2. Open http://localhost:3002