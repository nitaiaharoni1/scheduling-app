# Roomer-Scheduler - React room scheduling app
Roomer-Scheduler is a room scheduling app for organizations built using React, integrated with Node.js/Express backend.

A demo for the Website App is available [here](https://roomer-development.herokuapp.com/).

![roomer_app1](app1.gif "Roomer app")
![roomer_app2](app2.gif "Roomer signup")

## Description
* The user can login and logout (option to use auto login with cookies).
* The user can sign up.
* A weekly overview of the booking status of each of the organization rooms.
* Options to add, edit, reschedule and delete room reservations based on current availability.

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

<!-- ## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

What things you need to install the software and how to install them

```
Give examples
```

### Installing

A step by step series of examples that tell you how to get a development env running

Say what the step will be

```
Give the example
```

And repeat

```
until finished
```

End with an example of getting some data out of the system or using it for a little demo

## Running the tests

Explain how to run the automated tests for this system

### Break down into end to end tests

Explain what these tests test and why

```
Give an example
```

### And coding style tests

Explain what these tests test and why

```
Give an example
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Dropwizard](http://www.dropwizard.io/1.0.2/docs/) - The web framework used
* [Maven](https://maven.apache.org/) - Dependency Management
* [ROME](https://rometools.github.io/rome/) - Used to generate RSS Feeds

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Billie Thompson** - *Initial work* - [PurpleBooth](https://github.com/PurpleBooth)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
* Inspiration
* etc
-->