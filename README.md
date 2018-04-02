# Veeve Tech Beer List API

API for the Veeve Tech Beer List

## Prerequisites

- [Docker][]

## Building

The server can be built as a [Docker][] image using the Dockerfile included in this project, i.e:

```sh
docker build -t beer-list-api .
```

## Running

Once a container image has been built, it can be run with the following command:

```sh
docker run -d -p <host-port>:7331 -v <host-data-dir>:/srv/beer-list-data beer-list-api
```

Where:
  - <host-port> is the port you wish the api to respond to requests on
  - <host-data-dir> is a path to a directory you wish to be the root of the beer list [data records](#data-records)

## Data Records

The api stores data in '/srv/beer-list-data' within container instances, and this can be mapped to a host directory if you want the data to persist externally. The api will create new records when data is POSTed to its '/create' endpoint, but user entries need to be created manually. New users can be added by creating a .json with any name within '/srv/beer-list-data/users/' that has the following format:

```json
{
  "name":"USER_NAME_HERE"
}
```

## Endpoints

See [Endpoints.md](/Endpoints.md)


[Docker]: https://www.docker.com/
