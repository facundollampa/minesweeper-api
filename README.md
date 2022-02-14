# Buscaminas API - Node + Express

 Tecnologías utilizadas:

 ```
 Node
 Express
 Mysql
 Sequelize

 Jest
 Supertest
 ```

 ## Iniciar el proyecto

 Esta API puede levantarse de 2(dos) formas distintas. Cualquiera sea el método seleccionado recuerde colocar los valores correctos en el
 archivo `.env`. Puede seguir el archivo `.env.example` como guía.
 
 ### Levantar sobre la máquina host
-  Cree una base de datos y cargue el script `db.sql` incluido en el proyecto, de esta forma se crearán las tablas y registros iniciales.

```sql
CREATE DATABASE <database-name>;
USE <database-name>;
SOURCE /path/to/db.sql
```
- Cree el archivo `.env` con la configuración para conectarse a la base de datos creada.
- Ejecute el comando para que se instalen las dependencias del proyecto.
```bash
npm install
```

- Dispone de los siguientes comandos npm:
```bash
npm start
npm run dev
npm run test
```
Para iniciar el servidor directamente ejecute `npm start`, esto debe iniciar el servidor en el puerto indicado en el archivo `.env` y además se conectará a la base de datos.

- Abrir en el navegador por ejemplo `http://localhost:3000` y debe ver el mensaje `Minesweeper API`.

### Levantar con Docker
- Debe crear una red 
```bash
docker network create <network-name>
```

- Preparamos la base de datos bajando la imagen
```bash
docker pull mysql:8.0.28
```

- Creamos el contenedor de la base de datos
```bash
docker run -p <host-port>:3306 --network <network-name> --name <container-name> --hostname <hostname> -v path/to/mysql_8028:/var/lib/mysql -e MYSQL_ROOT_PASSWORD=<db-password> -d mysql:8.0.28 
```
- Para crear la base de datos ingrese al contenedor y siga las mismas instrucciones de creación de base de datos que el método anterior.
```bash
docker exec -it <container-name> bash

# Dentro del contenedor
mysql -u<user> -p<password>
```

- Fuera del contenendor, cargue el script en la base de datos use el siguiente comando:
```bash
docker exec -i <container-name> mysql -u<user> -p<password> <db-name> < /path/to/db.sql
```
- Ubicados dentro de la carpeta del proyecto ejecute el siguiente comando para crear la imagen del servidor:
```bash
docker build -t <image-name> .
```
- Para crear el contenedor
```bash
docker run -p <port>:3000 --network <network-name> --name <container-name> --hostname <hostname> -d <image-name>:latest 
```
*Importante: Al usar Docker, detro del archivo `.env` en el DB_HOST de la base de datos agregue el hostname del contenedor de la base de datos.*

- Abrir en el navegador por ejemplo `http://localhost:3000` y debe ver el mensaje `Minesweeper API`.

## Uso de la API
- Para usar la api dispone de los siguientes servicios:
```bash
/GET '/'
Devuelve mensaje de inicio.
```

```bash
/GET '/api/v1/game?id=<id>'
Si se adiciona el parámetro 'id' devuelve una partida del juego, sólo si existe.
Si el parámetro 'id' es nulo entonces devuelve una nueva partida.
En ambos casos se devuelve un objeto .json
```

```bash
/POST '/api/v1/game'
Al enviarse un objeto .json junto con la petición se guarda la partida. Se puede guardar el objeto retornado por la petición anterior. 
```