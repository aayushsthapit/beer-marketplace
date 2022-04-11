Backend setup:
1. Up the postgres DB in docker compose.
2. Setup DB. Enter the postgres DB bash with user "postgres"
a) Create a new DB: todo_app
b) Create user aayush;
c) alter user aayush with encrypted password 'aayush'
d) grant all privileges on database todo_app to aayush

3. Update .env. Env sample:
# Database
DB_CLIENT='pg'
DB_PORT='5432'
DB_HOST='0.0.0.0'
DB_NAME='todo_app'
DB_USER='aayush'
DB_PASSWORD='aayush'

#Application
APP_PORT=8000
APP_HOST='localhost'

#Authentication
ACCESS_TOKEN_SALT='salt for access token'
REFRESH_TOKEN_SALT='salt for reresh token'

#Logs
LOGGING_DIR='logs'
LOGGING_LEVEL='info'

4. Run the migrations and seeds with scripts.
yarn migrate
yarn seed