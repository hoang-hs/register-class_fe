push:
	docker build -t fe-register-class .
	docker tag fe-register-class:latest hoanghs120/fe-register-class:latest
	docker push hoanghs120/fe-register-class:latestdock