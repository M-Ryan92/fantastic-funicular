# fantastic-funicular
  This project is showcasing the customer statement processing flow.
  Using Python for the data processing and React for a visual representation of invalid records.


## Getting started
  the installation process.
  1. install the required software\
    - [pyenv (python version manager)](https://github.com/pyenv/pyenv#installation)\
    - [nvm (node version manager)](https://github.com/nvm-sh/nvm#installing-and-updating)\
    - [docker](https://docs.docker.com/engine/install/)\
    - [docker compose](https://docs.docker.com/compose/install//)\

  2. run `pyenv init` and follow the instructions
  3. run `nvm install 19.7.0`
  
  ### running the server
  1. run `docker-compose up -d` this will start our redis server.
  2. cd into the `server` directory
  3. cp example.env .env
  4. run `pyenv install` to install the project dependencies
  5. run `poetry run flask run` to spin up the server

  ### running the frontend
  1. cd into the `client` directory
  2. cp example.env .env
  3. run `yarn install && yarn build`
  4. run `yarn start`
  5. browser opens up the client running on port 3000
