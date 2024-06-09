import Web3 from 'web3';
import DepoZinciriArtifact from './DepoZinciri.json';

const getNeedStatus = async (needId) => {
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

            const status = await instance.methods.getNeedStatus(needId).call({ from: user });
            console.log(`Need status for need ID ${needId} is ${status}`);
            return status;
        } catch (error) {
            console.error("Error getting need status:", error);
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

        const status = await instance.methods.getNeedStatus(needId).call({ from: user });
        console.log(`Need status for need ID ${needId} is ${status}`);
        return status;
    } else {
        console.error("Non-Ethereum browser detected. You should consider trying MetaMask!");
    }
};

export default getNeedStatus;
