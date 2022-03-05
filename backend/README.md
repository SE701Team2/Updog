# Create mysql db connection with the following config
`username: 'updogDev'`,

`password: 'password'`,

`database: 'updog'`,

`host: '127.0.0.1'`,

`port: 3306`

You do not need to create any table, we just need a working db server

# Migrate models to DB so tables would be created

`sequelize db:migrate --url "mysql://updogDev:password@localhost:3306/updog"`

# Install dependencies

`npm install`

# Run project

`npm start`

To test connection, send a GET request to http://localhost:8080/api/test. Response should be "Hello World!" 

Base URL: http://localhost:8080/api (Check routes folder for endpoints)