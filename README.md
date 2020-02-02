### clone the project

### to test the project you need to run :

```console
docker-compose up
```

- swagger: http://localhost:8082/api-docs/
- result page: swagger: http://localhost:8082/
- mongo-express: http://0.0.0.0:8081/

### to run dev:

- on the project folder
- dev configuration come with a remote mongodb server

#### on index.js replace

```js
const environment = "";
```

with

```js
const environment = "dev";
```

#### run mongo and mongo-express

```console
docker-compose up
```

#### install node dependency

```console
npm i
npm run dev
```

- swagger: http://localhost:3000/api-docs/
- result page: swagger: http://localhost:3000/
- mongo-express: http://0.0.0.0:8081/

## create match

```json
{
  "teams": [
    {
      "name": "Team 1"
    },
    {
      "name": "Team 2"
    }
  ],
  "location": "Madrid",
  "matchDate": "26/11/2020",
  "matchHour": "15:30",
  "result": ""
}
```

## update match from swagger

```json
{
  "_id": "5e36fee89cea767be7d0fb82",
  "teams": [
    {
      "_id": "5e36fee89cea767be7d0fb83",
      "name": "Team 11"
    },
    {
      "_id": "5e36fee89cea767be7d0fb84",
      "name": "Team 22"
    }
  ],
  "location": "Madrid",
  "matchDate": "26/11/2020",
  "matchHour": "15:30",
  "result": ""
}
```

# how is work

- open 2 window on browser and make change
- swagger work only as api rest , don`t launch any even when data is updated
- is tested only get, post and put method
