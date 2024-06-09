import Web3 from 'web3';
import DepoZinciriArtifact from './DepoZinciri.json';

const updateSupportStatus = async (supportId, status) => {

    let statusNumber;
    switch (status) {
        case 'Confirmed':
            statusNumber = 0;
            break;
        case 'OnTheWay':
            statusNumber = 1;
            break;
        case 'OnTheWarehouse':
            statusNumber = 2;
            break;
        case 'Delivered':
            statusNumber = 3;
        default:
            throw new Error("Invalid status");
    }

    // Modern dapp browsers...
    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            // Use web3 to get the user's accounts
            const accounts = await web3.eth.getAccounts();
            const user = accounts[0];
            console.log(user)

            // Get the contract instance
            const networkId = await web3.eth.net.getId();
            const deployedNetwork = DepoZinciriArtifact.networks[networkId];
            const instance = new web3.eth.Contract(
                DepoZinciriArtifact.abi,
                deployedNetwork && deployedNetwork.address,
            );

            console.log(instance);
            // Update support status
            const gasPrice = web3.utils.toWei('20', 'gwei');
            const gasLimit = 3000000;

            // Update support status
            await instance.methods.updateSupportStatus(supportId, status).send({ 
                from: user,
                gasPrice: gasPrice,
                gas: gasLimit
            });
            console.log(`Type of status: ${typeof status} type of ID: ${typeof supportId}`)
            console.log(`Support status updated to ${status} for support ID ${supportId}`);
        } catch (error) {
            console.error("Error updating support status:", error);
        }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        const web3 = window.web3;
        // Use web3 to get the user's accounts
        const accounts = await web3.eth.getAccounts();
        const user = accounts[0];
        console.log(user)

        // Get the contract instance
        const networkId = await web3.eth.net.getId();
        const deployedNetwork = DepoZinciriArtifact.networks[networkId];
        const instance = new web3.eth.Contract(
            DepoZinciriArtifact.abi,
            deployedNetwork && deployedNetwork.address,
        );
        // Define gas price and gas limit
        const gasPrice = web3.utils.toWei('20', 'gwei');
        const gasLimit = 3000000;

        // Update support status
        await instance.methods.updateSupportStatus(supportId, status).send({
            from: user,
            gasPrice: gasPrice,
            gas: gasLimit
        });
    }
    // Non-dapp browsers...
    else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
};

export default updateSupportStatus;
