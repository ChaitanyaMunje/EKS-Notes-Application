Command to run a backend docker image is as below :

docker run -p 3500:3500 \
-e DB_HOST=host.docker.internal \
-e DB_USER=postgres \
-e DB_PASSWORD="" \
-e DB_NAME=tasksdb \
-e DB_PORT=5432 \
task-backend
