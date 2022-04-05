# Quick-Start Guide

This is a quick start guide for setting up the backend database of Updog

This guide assumes you have already cloned the repository and installed Node.js v14.x or later

## 1. Use Docker to Install and set up MySQL

1. [Install Docker here](https://www.docker.com/get-started/)
2. Run `docker-compose up` in the backend folder
3. Jump to Step 2

## OR Alternative to Docker: install and setup MYSQL (Not recommended)

To setup MYSQL manually, carry out the alternative instructions at the **bottom of the page** and then come back to Step 2.
This is an alternative for people who's hardware may not be able to handle running Docker.

## 2. Create tables

1. If you haven't already, execute `npm install` in the `Updog/backend/` folder., then `npm install -g sequelize-cli`

2. Execute the following to add the tables to the database via Sequelize ORM:

   `sequelize db:migrate:undo:all --url "mysql://updogDev:password@localhost:3306/updog"`

   `sequelize db:migrate --url "mysql://updogDev:password@localhost:3306/updog"`

3. To populate the database with the mock data, use the following:
   `sequelize db:seed:all --url "mysql://updogDev:password@localhost:3306/updog"`

## 3. Test and run project

To run all backend tests, run `npm test` from the `backend/` folder

To start the project, run `npm start`

To test connection, send a GET request to [http://localhost:8000/api/test](http://localhost:8000/api/test). Response should be "Hello World!"

Base URL: [http://localhost:8000/api](http://localhost:8000/api) (Check routes folder or [Swagger](#6-api-endpoints) for endpoints)

## 4. API endpoints

Updog's API endpoints are documented using Swagger

To access, first run `npm start` then go to the following URL: [http://localhost:8000/api-docs](http://localhost:8000/api-docs)

When adding new endpoints, ensure you update the documentation in the `specs/swagger.yaml` file

## 5. FAQ and Troubleshooting

### Invalid password error

If you receive a "Your password does not satisfy the current policy requirements" error, do the following:

1. Open MySQL Shell
2. run `SET GLOBAL validate_password.length = 4;`
3. run `SET GLOBAL validate_password.policy=LOW;`

### Test Connection failed

If the "Test Connection" button fails, you may need to reinstall MySQL - sometimes the installation process doesn't work correctly.

---

## Step 1 Alternative to Docker: Install and setup MYSQL (Not recommended)

### a. Install and set up MySQL

If you carried out Step 1, then you can ignore everything below

1. [Install MySQL here](https://dev.mysql.com/downloads/installer/)
2. In the "Choosing a Setup Type" page of the installer, select "Developer Default"
3. Click "next" (using default settings) until you reach the "Accounts and Roles" page
4. Add a root password for yourself
5. Click "Add User" and create a user with username "updogDev" and password "password"
6. Continue to click "next" or "execute" until the install process is done

### b. Check that your local MySQL server is working correctly

1. In MySQL Workbench, click Database->Manage Connections
2. Click "Test Connection" and input the root password you set up earlier if prompted
3. If successful, a popup similar to below should appear:
   ![Test connection success popup](https://user-images.githubusercontent.com/23299540/159444420-0157413d-13af-4c4e-a754-2628116f4e95.PNG)

## c. Create a new connection

1. Create a new connection with the following settings:

   `username: 'updogDev'`

   `password: 'password'`

   `connection name: 'updog'`

2. Click the home icon, and open the connection you just made
3. Under "Users and Privileges"->"Administrative Roles", check that the updogDev user you created has the DBA (Database Admin) permission - if you followed the steps in the [installer section](#1-install-and-set-up-mysql) you should already have this
4. Click the database icon on the toolbar to create a new schema with the name "updog", all settings default, and click "Apply"
5. **You can now jump back up to Step 2: Create Tables**
