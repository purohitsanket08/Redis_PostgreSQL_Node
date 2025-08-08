# Redis_PostgreSQL_Node
This project includes the setup for Redis, Redis Insight, and PostgreSQL using Docker.
# Project Setup with Docker

This project includes the setup for **Redis**, **RedisInsight**, and **PostgreSQL** using Docker. This README will guide you through creating and running the Docker containers, as well as setting up the necessary `.env` file for environment variables.

## 1. Redis and RedisInsight with Docker

### Redis Container

Redis is an open-source, in-memory data structure store, used as a database, cache, and message broker.

#### Steps to Create the Redis Container:

1. Create a `docker-compose.yml` file in the root of your project with the following configuration:

   ```yaml
   version: "3.8"
   services:
     redis:
       image: redis:alpine
       container_name: redis_container
       ports:
         - "6379:6379"
       volumes:
         - redis_data:/data
       networks:
         - backend

   volumes:
     redis_data:
       driver: local

   networks:
     backend:
       driver: bridge
This will create a Redis container and expose it on port 6379 on your local machine.

Run the following command to start the Redis container:

bash
Copy
docker-compose up -d
You can now access Redis via localhost:6379.

RedisInsight Container
RedisInsight is a graphical interface for Redis, making it easier to manage and visualize data in your Redis instance.

Steps to Create the RedisInsight Container:
Add the following RedisInsight configuration to your docker-compose.yml:

yaml
Copy
redisinsight:
  image: redislabs/redisinsight:latest
  container_name: redisinsight
  ports:
    - "8001:8001"
  networks:
    - backend
This will set up RedisInsight and expose it on port 8001.

Run the following command to start the RedisInsight container:

bash
Copy
docker-compose up -d
Once the container is running, open your browser and visit http://localhost:8001 to access RedisInsight.

Verify Redis and RedisInsight
Redis is available at localhost:6379.
RedisInsight is available at localhost:8001.
2. PostgreSQL with Docker
PostgreSQL is a powerful, open-source relational database management system.

Steps to Create the PostgreSQL Container:
Add the following PostgreSQL configuration to your docker-compose.yml:

yaml
Copy
postgres:
  image: postgres:alpine
  container_name: postgres_container
  environment:
    POSTGRES_USER: your_db_user
    POSTGRES_PASSWORD: your_db_password
    POSTGRES_DB: your_db_name
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
  networks:
    - backend
Replace your_db_user, your_db_password, and your_db_name with your actual database credentials.

Run the following command to start the PostgreSQL container:

bash
Copy
docker-compose up -d
PostgreSQL will now be available at localhost:5432.

Verify PostgreSQL
PostgreSQL is available at localhost:5432.
Use any PostgreSQL client (e.g., pgAdmin, DBeaver) or the psql CLI to connect with the database using the credentials defined in the docker-compose.yml.
3. .env File
The .env file contains environment variables that store configuration settings and secrets for the project. It is important to keep sensitive information like database credentials and API keys in this file.

Example .env file:
Create a .env file in the root of your project with the following content:

env
Copy
# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# JWT Secret (used for signing tokens)
JWT_SECRET=your_jwt_secret

# Server Port
PORT=5000
Explanation of .env Variables:
DB_HOST: The host address of the PostgreSQL database (usually localhost when running locally).
DB_PORT: The port number for PostgreSQL (default is 5432).
DB_USER: The database user you created in PostgreSQL.
DB_PASSWORD: The password for the database user.
DB_NAME: The name of the PostgreSQL database to use.
REDIS_HOST: The host address of the Redis container (usually localhost).
REDIS_PORT: The port number for Redis (default is 6379).
REDIS_PASSWORD: The password for Redis (if set, otherwise leave empty).
JWT_SECRET: A secret key used for signing and verifying JWT tokens.
PORT: The port on which your application will run (default is 5000).
Use the .env File
Make sure you have the dotenv package installed in your Node.js application:

bash
Copy
npm install dotenv
In your server.js or main application file, import and configure the .env file at the beginning:

javascript
Copy
import { config } from 'dotenv';
config(); // Load environment variables from .env file
Now you can access the environment variables in your application using process.env.VARIABLE_NAME:

javascript
Copy
const dbHost = process.env.DB_HOST;
const dbPort = process.env.DB_PORT;
const redisHost = process.env.REDIS_HOST;
4. Running All Services with Docker Compose
To start all services (Redis, RedisInsight, PostgreSQL) and make sure they are running, use Docker Compose:

Make sure you have docker-compose.yml configured as described above.

Run the following command to start all services:

bash
Copy
docker-compose up -d
To stop all services:

bash
Copy
docker-compose down
To view the logs for any service:

bash
Copy
docker-compose logs <service_name>
For example, to view logs for Redis:

bash
Copy
docker-compose logs redis
Conclusion
This setup includes Docker containers for Redis, RedisInsight, and PostgreSQL along with a .env file for managing environment variables. By using Docker Compose, you can easily manage these services locally, ensuring that your development environment is consistent and easily reproducible.

Let me know if you have any questions or need further assistance with this setup!

markdown
Copy

---

### Explanation of the README File:
- **Redis and RedisInsight**: Instructions to set up and run Redis and RedisInsight using Docker. It also includes the configuration for the `docker-compose.yml` file.
- **PostgreSQL**: Instructions for setting up and running PostgreSQL in Docker. It details how to set up environment variables for the database credentials.
- **`.env` File**: Configuration for environment variables to store sensitive information like database credentials and secrets.
- **Docker Compose Commands**: Basic commands to manage the Docker containers.

### Usage:
1. Place the `docker-compose.yml` and `.env` files in the root of your project.
2. Run the application and containers using the provided instructions.
3. Adjust the `.env` file with your database and Redis settings, and your application will be able to connect to them.

Let me know if you need any adjustments!
