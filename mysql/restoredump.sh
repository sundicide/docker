# load .env file
export $(grep -v '^#' .env | xargs)

docker exec -i $CONTAINER_NAME_MYSQL sh -c 'exec mysql -uroot -p"$MYSQL_ROOT_PASSWORD"' < ./all-databases.sql