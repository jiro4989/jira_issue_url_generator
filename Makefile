.PHONY: test
test: fmt lint
	deno test tests/*

.PHONY: fmt
fmt: public/*.js
	deno fmt public/*.js
	deno fmt tests/*

.PHONY: lint
lint:
	deno lint public/*.js
	deno lint tests/*
