# 2023-Capstone-Project
This repo is a copy of a project I had worked on in a group of 6 throughout the 2023 learning period. I worked as a front end developer on this project and was responsible for creating a few of the components listed in the frontend folder.

# SEP Project 55 Code

This repository contains all code for our project. Each top level folder corresponds to a Docker container:

* `api` contains an ASP.NET Core API project that will serve our API.
* `frontend` contains a React project that will serve our frontend.
* `proxy` contains configuration for the Nginx reverse proxy server (which basically just allows us to pretend the API and
  frontend are the same website).
* `db` contains a MySQL server for the API.

## Required Software

To be able to open and run everything, the following software is required:

* [Docker](https://www.docker.com/products/docker-desktop/)
  * If using Docker Desktop on Windows, it must must be in Linux Containers mode (which it is by default). If for
    whatever reason it ends up in Windows Containers mode, you can switch back in the Docker Desktop menu.
* [Python 3.9 or above](https://www.python.org/downloads/)

For editing code:

* [Visual Studio 2022 for Windows](https://visualstudio.microsoft.com/downloads/) (API project only)
  * When it asks which workloads to install, make sure that "ASP.NET and web development" is ticked.
* [Visual Studio Code](https://code.visualstudio.com/) (Frontend project only)

## Running the application

The easiest way to run the entire application is using the Python build script.

To start the application, run `python run.py`. To stop the application, run `python run.py --stop`.

The application is run in dev mode by default, which hot reloads changes to code. To run it in production
mode, use the `--mode prod` argument (this is recommended if you are not editing the code).

There are more options that can be seen by running `python run.py --help`.

### Running using Docker

The Python build script uses Docker Compose internally to create and run the Docker containers.
The whole system can also be run using Docker Compose directly.

To run the system through Docker:

1. Ensure Docker Desktop is running.
2. Navigate to the root directory of the repository.
3. Run `docker compose build`. This builds the images that live containers are created from.
4. Run `docker compose up -d`. This creates and runs live containers from the built images.

Once running, the site can be accessed at [http://localhost:5000](http://localhost:5000) and the API at
[http://localhost:5000/api/](http://localhost:5000/api/).

To stop running the system through Docker:

1. Navigate to the root directory of the repository.
3. Run `docker compose down`. This stops and destroys the containers.


### Docker tips

* `docker compose build` may take some time the first time as it has to build all of the containers - future
startups should be very quick (less than 5 seconds).
* Don't just leave your containers running in the background forever, as they can eat up sizeable chunks of your CPU and
RAM when in use.
* The containers are connected to your local filesystem and will reload the site if you make changes to the code, so
there is usually no need to repeat the process above every time you make a change.
* When you pull new changes or switch branches through Git, it is recommended to do the full process of
down-ing, build-ing, and up-ing as described above. This is because there may be Docker configuration changes or
project changes in parts of your containers that cannot be automatically reloaded.
* There's a [Docker extension for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-azuretools.vscode-docker)
that allows you to see your running containers, among other things.

| The Docker panel in VS Code after running `docker compose up -d`.                     |
| ------------------------------------------------------------------------------------- |
| ![](https://drive.google.com/uc?id=1eGYlokISEKqp8dNOC8JxUHXLc_O7sLy4)                 |

## Projects

### Frontend

#### Prerequisite

To have the best coding experience, please use VSCode with the extension `Prettier` installed so that it will automatically fix linting errors on save.

First, please ensure you have installed `Node.js` in your machine. Our pipeline runs on Node 16 so if you do not want any bugs, use that specific version.

We use `pnpm` for our node package solution as it saves precious space on your computer (no more 2GB worth of node packages). Install this by running

```bash
corepack enable
corepack prepare pnpm@latest --activate
```

This command only works after installing node.js. If this command fails, you can try running this as administrator or google installing it as standalone using the official website.

#### Installation && Commands

Always ensure you are in the `frontend` folder before you run any commands.

1. Package installation:

```bash
pnpm install
```

This will install your `node_packages`. Usually you will only have to do this once, but if anyone commits a PR adding a new library you'll have to run this command again. Intellisense will throw a million errors if you have not run this command.

2. Development:

```bash
pnpm dev
```

This will run the application locally using a random available port. You only need to run the frontend app independently if you are making a pure UI change and does not need the backend. Running it standalone without docker will help with your ram and cpu usage. Most of the time, however, you should be running a development build using `docker-compose up -d` like described above since it includes our backend.

3. Test (and update snapshots):

```bash
pnpm run test -u <optional name of file to test>
```

If you created a new component and wrote a new unit test for it and want to validate the test, run this command. We use snapshot testing for React to validate that our components are working normally. When you change a component you will most likely want to use it with the `-u` flag to update the component snapshots as well.

You can optionally include the name of the file you want to test. Jest will run the test only if the file name matches with your input. If you omit this it will run all tests.

### API

To open the API solution (project group), open `api/TrustedNeighbourApi.sln` in Visual Studio 2022 (not VS Code). There
are two projects in the solution: ApiSource, containing the source code of the API server, and ApiTest, containing unit
tests for the code in ApiSource.


To run the project in the editor, click Play with the `http` launch profile (see below). This opens a browser window
containing a Swagger page that allows you to try out the API.

| Choosing a launch profile                                             | Testing the API with Swagger                                          |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![](https://drive.google.com/uc?id=1gpaPLSftQT7I1stCKtTbHi_X1EXIW_si) | ![](https://drive.google.com/uc?id=1Jkgih5Okdu28ipKDvh1FklKk8dZ-m1Vx) |

To run tests, open the Test Explorer through the `Test > Test Explorer` menu and click Run. This should run all tests
in ApiTest. Individual tests can be run by right clicking them in Test Explorer and selecting Run, or by clicking the
little green tick above a test method and selecting Run.

| Opening the Test Explorer                                             | Running tests in the Test Explorer                                    | Running a single method                                               |
| --------------------------------------------------------------------- | --------------------------------------------------------------------- | --------------------------------------------------------------------- |
| ![](https://drive.google.com/uc?id=1opfHV7ylEvKwK7rn1AOGfg2SKJ_-QfgO) | ![](https://drive.google.com/uc?id=1BTQ81nXGPg4W4gRHt7Lrd8MECGmWWLTz) | ![](https://drive.google.com/uc?id=1_x2KdPoD3MpJmRRKRB7stbN48xsqw0vm) |

