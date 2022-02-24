# Express & React App for Dockerisation

I created this simple to do app to act as an example project for dockerising a full stack application.  It was created to go along with the Docker workshops I am leading at Thrive Career Wellness.

The goal of this project is to provide a simple app that anyone new to docker can use to create a very simple `Dockerfile` and containerise a full stack app.  This project was written in **React**, **Node**, and **Express** for its front-end and back-end and uses **SQLite** as a database.

## Containerising the App

To containerise the app I recommend sticking to simple solutions and exclude optimisations or smaller details, the goal is functionality.

While the solution can be solved by duplicating the exact same file between the front-end and back-end apps, I'd encourage rewriting it for the practice.

### Challenge

Containerise the two apps for use on localhost by writing a Dockerfile.

The goal of the challenge is to be able to run containers for each app using a docker image you create.

As far as guidelines, here is a list of requirements for the Dockerfiles' build:

|Requirement|Description|
|---|---|
| Node Version | The expected node version as of writing this document is `14`. |
| Port | Both apps should run on the default port (`3000`) within their containers and expose the port to the host machine. |
|Node Environment | The `NODE_ENV` environment variable should be set within the dockerfile to a value of `development`. |
| Working Directory | Within the container we should have a working directory named `src` which should be placed in the root directory of the container. |
| Dependencies | The source code for the app should be copied into the container and all dependencies should be installed. |
| Default Command | The default command that should be run when the container starts, for both apps, is `yarn start`. |


The expectation is that both apps will run on their default ports (`3000`) within their respective containers but the front-end has its host port modified when running.

### Solution

The bare minimum contents of the `Dockerfile`s are as follows:
```dockerfile
FROM node:14

ENV NODE_ENV development

WORKDIR /src

COPY . .

RUN yarn install --frozen-lockfile --non-interactive

EXPOSE 3000

CMD ["yarn", "start"]
```

There should be a Dockerfile with this content in both the api and web directories.

Once they are created we need to build the images which can be achieved by the following:

> The following steps assume you are starting with a terminal in the root directory of the project

1. Navigate to the `api` directory and run the `docker build` command
```bash
  cd api

  docker build -t todo-api .
```

2. Navigate to the `web` directory and run the `docker build` command
```bash
  cd web

  docker build -t todo-frontend .
```

Once both images are built we can now run the containers using the following commands in two terminal windows/tabs:

* `docker run --rm -it -p 3000:3000 todo-api`

* `docker run --rm -it -p 8080:3000 todo-frontend`
