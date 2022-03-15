# Backend development setup

## Dependencies needed

Node version: v14.17.3

MySQL version: v8.0.28

Node dependencies:

```md
• @babel/cli@7.12.10
• @babel/core@7.12.10
• @babel/node@7.12.10
• @babel/polyfill@7.12.1
• @babel/preset-env@7.12.11
• apidoc@0.22.1
• babel-jest@24.9.0
• bcryptjs@2.4.3
• body-parser@1.19.0
• cors@2.8.5
• crypto@1.0.1
• eslint@6.8.0
• eslint-config-prettier@6.15.0
• eslint-plugin-prettier@3.3.1
• express@4.17.1
• express-fileupload@1.2.0
• generate-password@1.5.1
• jest@24.9.0
• jsonwebtoken@8.5.1
• morgan@1.10.0
• mysql2@2.3.3
• nodemon@1.19.4
• pg@7.18.2
• pg-hstore@2.3.3
• pre-commit@1.2.2
• prettier@1.19.1
• sequelize@5.22.3
• sequelize-cli@5.5.1
• supertest@4.0.2
• swagger-jsdoc@3.7.0
• swagger-ui-express@4.1.6
```

## 1. Start a local MySQL DB server

Start a MySQL DB server on your machine with the following configuration

`username: 'updogDev'`

`password: 'password'`

`database: 'updog'`

`host: '127.0.0.1'`

`port: 3306`

The config on the backend is already done, so once you get the db running locally it should be able to connect

NOTE: You do not need to create any tables, we just need a working db server

## 2. Install dependencies

`npm install`

## 3. Migrate models to DB so tables would be created

To migrate the tables to the database, run the following commands:

`npm install -g sequelize-cli` (only needs to be executed the first time)

`sequelize db:migrate:undo:all --url "mysql://updogDev:password@localhost:3306/updog"`

`sequelize db:migrate --url "mysql://updogDev:password@localhost:3306/updog"`

## 4. Run project

`npm start`

To test connection, send a GET request to <http://localhost:8080/api/test>. Response should be "Hello World!"

Base URL: <http://localhost:8080/api> (Check routes folder for endpoints)

## Further Documentation

To find further information on the api endpoints, we have configured a swagger api doc. To access, first run step 4 then
in a webpage, go to URL: <http://localhost:8080/api-docs>.

To add documentation for new endpoints, go to the specs/swagger.yaml file.
