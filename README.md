
# API with Node.js + PostgreSQL + TypeORM
this is a simple nodejs / nestjs project with a basic implementation for many ideas 

## how to clone this project
```
git clone https://github.com/AliFSaleh/nestjs-api.git
npm install
cp .env.example .env
```

## Covered ideas:
- Initialize TypeORM
- Connecting with PostgreSQL
- JWT Authentication / User Login and Register Flow with JWT Authentication
- DTO to Validate Request Body
- Error Handling
- Authentication routes and middleware
- Guards
- role-based access control
- Upload Single/Multiple Image With Multer

## Project flow:
- the guest can signup on the project to create new account and be as user on the system so he could interact with the system.
- the user can view the real estates properties within the system and view the details in order to make a reservation based on the rental prices set by host from (state_date) to (end_date), So that the real estate is not reserved within these two dates.
- the user can send a request to the system owner to convert his account to a HOST type so that he can publish his real estates and enter them into the system, so the user must wait until the request is approved by the admin (system owner).
-  after approving the request, the user can publish properties and receive reservations as a HOST
-  the user with type USER can not be able to publish a real estate.
-  USER / HOST can list all his resercations
