expressjs/public-ra/src/DepoZinciri.json:
	cp build/contracts/DepoZinciri.json expressjs/public-ra/src/DepoZinciri.json


clean:
	rm -rf expressjs/public-ra/src/DepoZinciri.json


.PHONY: clean reset


reset: clean expressjs/public-ra/src/DepoZinciri.json