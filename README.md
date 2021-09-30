Contributor: Daria Poguliaieva

## About Web App

This is a simple `Node.js` web application project which records todo items and stores them into Google Datastore as the main database. User can add and delete the listed Todo item.

Application is running on App Engine.
App Engine deployment is automated with Cloud Build.

I used Nodejs Todo app with Mongo DB found at [Github](https://github.com/manojap/Nodejs-Todo-app) and changed it to use GCP Datastore.
## npm packages
Following npm packages used in this project:
* express
* body-parser
* ejs templating engine
* google cloud datastore

## Web Application CI/CD flow:
1. Commit and push changes to Git
2. Trigger in Cloud Build listens to these changes and starts building which is configured in cloudbuild.yaml file:
   * npm install
   * gcloud app deploy
3. Changes will be deployed to App Engine
4. Result is available by URL: https://roi-takeoff-user53.uc.r.appspot.com/

## Environment variables
Web application uses environment variables which are set in App Engine: GOOGLE_CLOUD_PROJECT, PORT

