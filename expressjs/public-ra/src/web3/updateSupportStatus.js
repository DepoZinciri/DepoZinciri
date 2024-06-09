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
            break;
        default:
            throw new Error("Invalid status");
    }

    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            await window.ethereum.request({ method: 'eth_requestAccounts' });

            const accounts = await web3.eth.getAccounts();
            const user = accounts[0];
            console.log(user)

            const networkId = await web3.eth.net.getId();
            const deployedNetwork = DepoZinciriArtifact.networks[networkId];
            const instance = new web3.eth.Contract(
                DepoZinciriArtifact.abi,
                deployedNetwork && deployedNetwork.address,
            );

            console.log(instance);
            const gasPrice = web3.utils.toWei('20', 'gwei');
            const gasLimit = 3000000;

            await instance.methods.updateSupportStatus(supportId, statusNumber).send({
                from: user,
                gasPrice: gasPrice,
                gas: gasLimit
            });
            console.log(`Support status updated to ${statusNumber} for support ID ${supportId}`);
        } catch (error) {
            console.error("Error updating support status:", error);
            throw error;
        }
    } else if (window.web3) {
        const web3 = window.web3;
        const accounts = await web3.eth.getAccounts();
        const user = accounts[0];
        console.log(user)

        const networkId = await web3.eth.net.getId();
        const deployedNetwork = DepoZinciriArtifact.networks[networkId];
        const instance = new web3.eth.Contract(
            DepoZinciriArtifact.abi,
            deployedNetwork && deployedNetwork.address,
        );

        const gasPrice = web3.utils.toWei('20', 'gwei');
        const gasLimit = 3000000;

        await instance.methods.updateSupportStatus(supportId, statusNumber).send({
            from: user,
            gasPrice: gasPrice,
            gas: gasLimit
        });
    } else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
};

export default updateSupportStatus;
