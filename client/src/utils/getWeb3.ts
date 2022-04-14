import { ethers } from "ethers";
import Web3 from "web3";

const getWeb3 = (): Promise<any> =>
  new Promise((resolve, reject) => {
    const currentWindow: any = window;

    currentWindow.addEventListener("load", async () => {
      if (currentWindow.ethereum) {
        const web3 = new Web3(currentWindow.ethereum);
        const provider = new ethers.providers.Web3Provider(currentWindow.ethereum);

        try {
          await currentWindow.ethereum.enable();
          resolve({ web3, provider });
        } catch (error) {
          reject(error);
        }
      }

      else if (currentWindow.web3) {
        const web3 = currentWindow.web3;

        console.log("Injected web3 detected.");
        resolve(web3);
      }

      else {
        const provider = new Web3.providers.HttpProvider(
          "http://127.0.0.1:8545"
        );

        const web3 = new Web3(provider);

        console.log("No web3 instance injected, using Local web3.");
        resolve(web3);
      }
    });
  });

export default getWeb3;
