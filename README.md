# API REST simple avec Express et MySQL (Docker)

[Tutoriel](https://www.youtube.com/watch?v=g9OdfzGrjiM)

## Installation

### Docker

Image docker : `mysql:latest`

Lancer le conteneur MYSQL sur le terminal ou sur Docker Desktop

`docker exec -it mysql-docker mysql -u DB_USER -p`

### Variables d'environnements

Renommer `env.sample` en `.env` et remplir avec votre configuration

### Packages node

`npm i`

`npm run dev`

### ESLINT

`npx eslint ./src/path/nomdufichier.ts --fix`

## GET

### Pour récupérer tous les tuples de `things`

http://DB_HOST:DB_PORT/things

### Pour récupérer le tuple avec l'ID

http://DB_HOST:DB_PORT/things/:id

## POST

### Pour créer un tuple `thing`

http://DB_HOST:DB_PORT/things

`{"name" : "ce que vous souhaitez"}`

## PUT

http://DB_HOST:DB_PORT/things/:id

`{"name" : "ce que vous souhaitez"}`

## DELETE

http://DB_HOST:DB_PORT/things/:id
