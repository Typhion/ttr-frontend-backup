test:
	@docker build . -t test:1.0

run:
	@docker run -it --rm -p 5173:80 test:1.0