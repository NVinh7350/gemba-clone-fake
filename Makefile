DOCKER_EXEC = docker exec example-app-laravel.test-1

.PHONY: php composer artisan migrate

start:
	alias php='docker exec example-app-laravel.test-1 php'