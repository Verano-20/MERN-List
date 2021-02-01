# This is my first full-stack web application; a To-Do List.

## MERN Stack; MongoDB, Express.js, (React.js), Node.js.  
## User Authentication with JWT.
### Note: The current version of the app does not use React.js, and instead the frontend is built using vanilla HTML5, CSS3 and Javascript with jQuery. A React version is currently in development and will be deployed once complete.

## Usage
Due to the nature of this app being hosted on 'free-tier' packages, I would not recommend using any real details with the app. A real email address is not required, and the passwords are encrypted, but there is no SSL certificate, and the database lacks some security features. Feel free to sign up using any username, password, and email, but know that you don't need to use any real details. 'example@user.com' for instance would be a valid email (provided it has not been taken).  
The function of the app is limited to signup/login, logout, adding tasks, completing tasks, and deleting tasks.

## Summary
This project is a technical demonstration of my full-stack web development ability. The design and complexity of the app were not the focus, rather it was a platform for me to further my skills in every aspect of web development, while enabling me to add a production app to my portfolio with the aim of landing a job in the industry.  
The tech stack used was chosen primarily with the aim of developing my Javascript skills. Using Node.js forced me to write JS in both the frontend and backend, MongoDB being formatted in JSON integrated well with the flow of JS code, and Express.js gave me experience using a JS library. The decision to use JWT for user authentication was primarily driven by an excellent tutorial I read on Bezkoder: https://bezkoder.com/node-js-mongodb-auth-jwt/.

## Project Management and Version Control
I used Jira and Bitbucket (with Git) to manage and version control this project. I thoroughly enjoyed getting familiar with Jira and found it incredibly useful for planning out a full-stack app with more complexity than I had tackled before. I also learned better Git practices, including branching for development and bug fixing, and using pull requests to merge back into the main branch. Bitbucket was used for its easy integration with Jira, and is where the production repo is stored. The public repo you see on Github may differ slightly for security reasons.

## Design
The frontend of this web app was designed using AdobeXD. As a developer, I am much less familiar with web design and the corresponding tools, so I did not deliberate much over which design software to use. AdobeXD is free and I found it intuitive enough to use without any issues. Having a well defined design for each HTML page and screen size made writing the frontend code a much more pleasant experience, and this is a practice I will stick with in the future.  
The API was also designed pre-development, which helped maintain my understanding of how the frontend and backend should work and interact. This was adjusted slightly as problems arose during development, but was mostly completed at the design stage.

## Backend Development and Authentication
The backend of this project is based around user authentication with JSON Web Token. The decision to use JWT was not a statment on whether it is better than session-based, but simply an exploration of this method. As mentioned, I used a tutorial to help setup this system, and then integrated my own backend and API to work with it. Using this core as a solid platform to build on helped immensely with organising the structure of the app, and separating various dependancies into their own locations and files. Having separate files for configs, controllers, middleware, models, and routes made it much easier to make changes to the app easily and was very useful for debugging. While it appeared intimidating at first, I now fully appreciate the benefits of this structure.

## Frontend Development
The frontend of this project is not currently built in React, and a React version is in development. Instead, this has first been built with vanilla HTML5, CSS3 and JS with jQuery. As mentioned, having a clear design to follow made this development much easier, as I could focus purely on the development and not have to make any major design decisions at the same time. Minor changes have been made from the original design, whether for technical reasons or because the design didn't work as well in practice.  
Developing with a predefined API also streamlined the process, and gave me great experience with making AJAX requests, including request verification, user authentication, and error handling. As with the page designs, the API was slightly changed for technical reasons at this point, for example a GET changed to a POST when I realised that it required data to be sent both ways.  
There was also a focus on responsive web design. I wanted this app to work across all devices, and built it with a mobile-first approach. One of my key takeaways from this process has been to avoid defining elements in terms of px as much as possible, and try and use % or similar values. Defining elements relatively can not only improve responsiveness, but also streamlines the development process.

## Testing
The backend and API was thoroughly tested using Postman to send requests to all endpoints. A thoroughly documented test regime was conducted, including as many misuse cases as I could think of to ensure the server handled everything properly without crashing or corrupting the database.  
The frontend was tested in Chrome using the dev tools to check the function on different screen sizes. Further tests would be needed across multiple browsers and OS's, but those have not yet been carried out.

## Deployment and Hosting
To deploy this website I used Heroku to host the Node.js app, and connected it to a MongoDB Atlas cloud based database. Due to the nature of the 'free-tier' hosting from these providers, the security of the app is not particularly strong. Passwords are encrypted using bcrypt.js, but there is no SSL certifcate. For this reason I would not recommend using any real details when testing this app!
