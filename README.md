
Level 1 and 2

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
2. Trigger in Cloud Build listens to these changes and starts building which is configured in [cloudbuild.yaml](https://github.com/takeoff-projects/pogulaeva-level-1/blob/main/cloudbuild.yaml) file:
   * npm install
   * gcloud app deploy
3. Changes will be deployed to App Engine
4. Result is available by URL: https://roi-takeoff-user53.uc.r.appspot.com/

## Environment variables
Web application uses environment variables which are set in App Engine: GOOGLE_CLOUD_PROJECT, PORT

# Application API
## OpenApi config file
[openapi2-appengine.yaml](https://github.com/takeoff-projects/pogulaeva-level-1/blob/main/openapi2-appengine.yaml)

## Configuring Gateway API
1. Create API Config
```shell
gcloud api-gateway api-configs create todo-api \
--api=todo-api --openapi-spec=openapi2-appengine.yaml \
--project=roi-takeoff-user53 --backend-auth-service-account=roi-takeoff-user53@appspot.gserviceaccount.com
```
2. Deploy API Gateway
```shell
gcloud api-gateway gateways create todo-api \
  --api=todo-api --api-config=todo-api \
  --location=us-central1 --project=roi-takeoff-user53
```
3. Update new Config to existing API Gateway
```shell
gcloud api-gateway gateways update todo-api \
  --api-config=todo-api-2 --api=todo-api \
  --location=us-central1 --project=roi-takeoff-user53 
```

## Testing Gateway API
1. Request Tasks List 
```shell
curl https://todo-api-32zbn4ss.uc.gateway.dev/list
```
* Response example:
```json
{
  "tasks": [
    {
      "title": "Task 1",
      "id": "5635008819625984"
    },
    {
      "title": "Task 2",
      "id": "5638358357245952"
    }
  ],
  "nextPageToken": false
}
```
2. Add Task
```shell
curl -X POST -H "Content-Type: application/json"  -d '{"title":"Task 3"}' https://todo-api-32zbn4ss.uc.gateway.dev/add
```
* Response example:
```json
{"id": "5743670015819776"}
```
3. Delete Task
```shell
curl -X DELETE -H "Content-Type: application/json"  -d '{"id":"5743670015819776"}' https://todo-api-32zbn4ss.uc.gateway.dev/delete
```
* Response example:
```json
{"success": true}
```