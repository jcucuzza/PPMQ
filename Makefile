help:
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install: ## install dependencies
	npm install

run: ## run app
	nodemon

docker-build: ## build docker image
	docker build -t jcucuzza/ppmq:latest .

docker-run: ## run docker image
	docker run -d --name ppmq -p 1337:1337 jcucuzza/ppmq:latest
