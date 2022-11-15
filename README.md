# Open Jira Next.js

## Start
To run it locally, we need a monmgo database running

```
docker-compose up -d
```

Mongo string connection

```
mongodb://localhost:27017/entriesdb?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false
```

## Config ENV variables
Rename __.env.template__ to __.env__ and set the values for environment variables

## Fill database with test info
Do a request to

```
http://localhost/api/seed
```

