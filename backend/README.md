
## Database Setup

1. Start your postgres docker container using [docker-compose](./docker-compose.yml) file.<br>
   `docker-compose up -d`
2. Check if docker container is up.<br>
   `docker-compose ps`
3. Enter the bash shell of postgres's container.<br>
   `docker exec postgres bash`
4. Connect to postgres DB server using default "postgres" user.<br>
   `psql -U postgres`
5. Create database and DB user that your app eventually uses:
> CREATE DATABASE todo_app;<br>
> CREATE USER todo;<br>
> ALTER USER todo WITH ENCRYPTED password 'todo';<br>
> GRANT ALL PRIVILEGES ON DATABASE todo_app TO todo<br>
6. Create .env file in the /backend file path.
```
# Database
DB_CLIENT='pg'
DB_PORT='5432'
DB_HOST='0.0.0.0'
DB_NAME='todo_app'
DB_USER='todo'
DB_PASSWORD='todo'

#Application
APP_PORT=8000
APP_HOST='localhost'

#Authentication
ACCESS_TOKEN_SALT='salt for access token'
REFRESH_TOKEN_SALT='salt for reresh token'

#Logs
LOGGING_DIR='logs'
LOGGING_LEVEL='info'
```
7. Run the migrations and seeds with scripts.
```
yarn migrate
yarn seed
```
<br>

## Backend Server

### Starting the development server.

Start the development server with the following command. This will start the server in your local machine in port *8000*. <br>
 `yarn start:dev`

### Running automated tests.
To run the automated tests, execute the following command.
`yarn test`