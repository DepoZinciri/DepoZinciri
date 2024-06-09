expressjs/public-ra/src/web3/DepoZinciri.json:
	cp build/contracts/DepoZinciri.json expressjs/public-ra/src/web3/DepoZinciri.json


clean:
	rm -rf expressjs/public-ra/src/web3/DepoZinciri.json


.PHONY: clean reset


reset: clean expressjs/public-ra/src/web3/DepoZinciri.json