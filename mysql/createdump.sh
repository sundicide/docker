# load .env file
export $(grep -v '^#' .env | xargs)

docker exec a357202b14e9 sh -c 'exec mysqldump --databases pocket -uroot -p"$MYSQL_ROOT_PASSWORD"' > ./all-databases.sql