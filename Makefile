start-dev:
	docker compose up -d
	pnpm install
	pnpm run start:dev
