# Quick-Start Guide
This is a quick start guide for setting up the backend database of Updog

This guide assumes you have already cloned the repository and installed Node.js v14.x or later

# 1. Install and set up MySQL
1. [Install MySQL here](https://dev.mysql.com/downloads/installer/)

2. In the "Choosing a Setup Type" page of the installer, select "Developer Default"

3. Click "next" (using default settings) until you reach the "Accounts and Roles" page

4. Add a root password for yourself

5. Click "Add User" and create a user with username "updogDev" and password "password"

6. Continue to click "next" or "execute" until the install process is done


# 2. Check that your local MySQL server is working correctly
1. In MySQL Workbench, click Database->Manage Connections
2. Click "Test Connection" and input the root password you set up earlier if prompted
3. If successful, a popup similar to below should appear:
![Test connection success popup](../readme-images/backend-mysql-test-connection-success.PNG)

# 3. Create a new connection
1. Create a new connection with the following settings:


`username: 'updogDev'`

`password: 'password'`

`connection name: 'updog'`

2. Click the home icon, and open the connection you just made

3. Under "Users and Privileges"->"Administrative Roles", check that you have the DBA (Database Admin) permission - if you followed the steps in the (installer section)[#1-install-and-set-up-mysql] you should already have this

4. Click the database icon on the toolbar to create a new schema with the name "updog", all settings default, and click "Apply"

# 4. Create tables

1. If you haven't already, execute `npm install` from within the `backend/` folder, then `npm install -g sequelize-cli`

2. Execute the following to add the tables to the database via Sequelize ORM:

`sequelize db:migrate:undo:all --url "mysql://updogDev:password@localhost:3306/updog"`

`sequelize db:migrate --url "mysql://updogDev:password@localhost:3306/updog"`

# 4. Test and run project

To run all backend tests, run `npm test` from the `backend/` folder

To start the project, run `npm start`

To test connection, send a GET request to http://localhost:8080/api/test. Response should be "Hello World!" 

Base URL: http://localhost:8080/api (Check routes folder for endpoints)

# 5. API endpoints
To find further information on the api endpoints, we have configured a swagger api doc. To access, first run `npm start` then
in a browser, go to URL: <http://localhost:8080/api-docs>.

To add documentation for new endpoints, go to the specs/swagger.yaml file.

# 5. FAQ and Troubleshooting
### "Your password does not satisfy the current policy requirements" error
Open MySQL Shell and run the following commands:
`SET GLOBAL validate_password.length = 4;`
`SET GLOBAL validate_password.policy=LOW;`
