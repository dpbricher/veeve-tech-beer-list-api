# Endpoints

### GET /record-list

Returns a json array of records. Example response:

```json
[
  {
    "bought":0,
    "consumed":1,
    "name":"user_1"
  },
  {
    "bought":2,
    "consumed":1,
    "name":"user_2"
  }
]
```

### GET /user-list

Returns a json array of users. Example response:

```json
[
  {
    "name":"user_1"
  },
  {
    "name": "user_2"
  }
]
```

### POST /create

Creates a new record. Does not currently validate input data, so POSTed data needs to be the correct format. Example request of the correct format:

See the response of [GET /record-list](#get-record-list).
