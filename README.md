# Moneyhub Tech Test - Investments and Holdings

[Go to updated section](#Update)

At Moneyhub we use microservices to partition and separate the concerns of the codebase. In this exercise we have given you an example `admin` service and some accompanying services to work with. In this case the admin service backs a front end admin tool allowing non-technical staff to interact with data.

A request for a new admin feature has been received

## Requirements

- An admin is able to generate a csv formatted report showing the values of all user holdings
    - The report should be sent to the `/export` route of the investments service
    - The investments service expects the report to be sent as csv text
    - The csv should contain a row for each holding matching the following headers
    |User|First Name|Last Name|Date|Holding|Value|
    - The holding should be the name of the holding account given by the financial-companies service
    - The holding value can be calculated by `investmentTotal * investmentPercentage`
- Ensure use of up to date packages and libraries (the service is known to use deprecated packages)
- Make effective use of git

We prefer:
- Functional code 
- Ramda.js (this is not a requirement but feel free to investigate)
- Unit testing

### Notes
All of you work should take place inside the `admin` microservice

For the purposes of this task we would assume there are sufficient security middleware, permissions access and PII safe protocols, you do not need to add additional security measures as part of this exercise.

You are free to use any packages that would help with this task

We're interested in how you break down the work and build your solution in a clean, reusable and testable manner rather than seeing a perfect example, try to only spend around *1-2 hours* working on it

## Deliverables
**Please make sure to update the readme with**:

- Your new routes
- How to run any additional scripts or tests you may have added
- Relating to the task please add answers to the following questions;
    1. How might you make this service more secure?
    2. How would you make this solution scale to millions of records?
    3. What else would you have liked to improve given more time?
  

On completion email a link to your repository to your contact at Moneyhub and ensure it is publicly accessible.

## Getting Started

Please clone this service and push it to your own github (or other) public repository

To develop against all the services each one will need to be started in each service run

```bash
npm start
or
npm run develop
```

The develop command will run nodemon allowing you to make changes without restarting

The services will try to use ports 8081, 8082 and 8083

Use Postman or any API tool of you choice to trigger your endpoints (this is how we will test your new route).

### Existing routes
We have provided a series of routes 

Investments - localhost:8081
- `/investments` get all investments
- `/investments/:id` get an investment record by id
- `/investments/export` expects a csv formatted text input as the body

Financial Companies - localhost:8082
- `/companies` get all companies details
- `/companies/:id` get company by id

Admin - localhost:8083
- `/investments/:id` get an investment record by id


# Update
- [x] Added a route: `/admin/report`
- [x] Report sends as CSV
- [x] The csv contains a row for each holding matching the headers:
    |User|First Name|Last Name|Date|Holding|Value|
- [x] Explored using Ramda v0.28.0
- [x] Updated libraries usign npm audit fix and replaced request package with Axios
- [x] Testing using Jest

## How to run
1. Run `npm start` on all services
2. Send a get request to `/admin/report` (e.g via Postman)
3. Jest tests can be run with `npm test` from the root of the admin microservice

## Task Questions
### 1. How might you make this service more secure?
- Rate limit requests to this endpoint to ensure availability
- A combination of authentication (e.g. API key) and authorisation (RBAC) could be used to limit access to the API and manage access to specific endpoints

### 2. How would you make this solution scale to millions of records?
- Exploring data caching options to reduce I/O operations
- Adding parameters to filter data e.g. by data, user, holding company
- Batching requests to the csv export endpoint
- Limiting the maximum amount of results from the investments service

### 3. What else would you have liked to improve given more time?
- Refactor the new admin report endpoint to have a separate function for converting json data to csv, and another for sending csv data to the export endpoint
- Add more unit tests to cover more of the services functions
- Add tests to cover endpoint testing, including error handling. One solution I considered was using Jest combined with Supertest
- Create OpenAPI documentation to document the API endpoints