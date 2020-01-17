# Important
please run CMD `git checkout -b [name_branch]` example `git checkout -b tampm` ... Nerver push when you in master
# Important Rule
every `database` put it in docker-compose.
mailer put it in docker-compose.
if use redis put it in docker-compose.
if settup container communicate put it docker-compose.
# Project Struct
Project use mysql install mysql workbench to connect data base use config blow.
```
DB_HOST=localhost
DB_PORT=5200
USER=root
DB_PASSWORD=password
DB_BANKING_NAME=Internet_Banking
```

every operation in database `CREATE TABLE, UPDATE TABLE` write script `SQL` save with prefix `TABLE_NAME.*.SQL` put it to foder `scripts`

# step build and run
Run command below **once**:
1.    docker-compose build
2.    docker-compose up
# start or stop
Run command below for start or stop:
1.    docker-compose start
2.    docker-compose stop

# run api_get way
`cd api_getway && npm install && npm start`
view at http://localhost:5500/
# run api_front_end
`cd front_end && npm install && npm start`
view at http://localhost:3000/

**NOTE** if you use LINUX platform install docker-compose if error permistion run CMD `sudo chown -R $USER:$USER .`
`docker-compose logs -f database`