**Instructions to run the code:**

**If you are using docker build and docker run then follow the below commands:**

1. Git clone the repo
2. Install docker desktop (https://www.docker.com/products/docker-desktop/) and then run the docker desktop
3. Navigate to server and client folder and run the commands to test locally: node server.js and node client.js
4. To build and run server:
docker build -t server -f .\Dockerfile . 
docker run -v servervol:/app/serverdata -p 8080:8080 -d --name server --network prithvi server

5. To build and run client:
docker build -t client -f .\Dockerfile . 
docker run -v clientvol:/app/clientdata -d --name client --network prithvi client

6. Verify the result in docker desktop

If you are using docker-compose.yml:
1. Git clone the repo
2. Install docker desktop
3. Run docker-compose up -d
4. Verify the result in docker desktop
