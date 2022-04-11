
### Database First Setup

1. Start your postgres docker container using [docker-compose](./docker-compose.yml) file.<br>
   `docker-compose up -d`
2. Check if docker container is up.<br>
   `docker-compose ps`
3. Enter the bash shell of postgres's container.<br>
   `docker exec -it {postgres-container-name} bash`
4. Connect to postgres DB server using default "postgres" user.<br>
   `psql -U postgres`
5. Create a new database that your application uses.