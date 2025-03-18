up:
	docker compose up

backbash:
	docker compose exec -it backend bash

frontbash:
	docker compose exec -it frontend bash

down:
	docker compose down

build:
	docker compose build

test:
	docker compose run web bash -c "RAILS_ENV=test bundle exec rspec"
