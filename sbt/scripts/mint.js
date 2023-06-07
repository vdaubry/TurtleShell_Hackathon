const { network, ethers, getNamedAccounts } = require("hardhat")
const { scriptsConfig, networkConfig } = require("../helper-hardhat-config")

const main = async (ipfsHash, contractAddress, grade, contractType) => {
	const chainId = network.config.chainId
	const contractName = networkConfig[chainId].contracts.TurtleShellToken.name
	const contract = await ethers.getContract(contractName)
	const deployer = await ethers.getSigner((await getNamedAccounts()).deployer)

	const mintRequestTypes = {
		MintRequest: [
			{ name: "to", type: "address" },
			{ name: "tokenURI", type: "string" },
			{ name: "grade", type: "uint256" },
			{ name: "contractType", type: "bytes32" },
		],
	}
	const domain = {
		name: contractName,
		version: "1",
		chainId: chainId,
		verifyingContract: contract.address,
	}

	const mintRequest = {
		to: contractAddress,
		tokenURI: ipfsHash,
		grade,
		contractType,
	}

	const mintSignature = await deployer._signTypedData(domain, mintRequestTypes, mintRequest)

	console.log(contractType)

	console.log(mintSignature)

	const tx = await contract.mint(mintRequest, mintSignature)
	await tx.wait()
}

main(
	scriptsConfig.TurtleShell.mint.ipfsHash,
	scriptsConfig.TurtleShell.mint.contractAddress,
	scriptsConfig.TurtleShell.mint.grade,
	scriptsConfig.TurtleShell.mint.contractType
)
	.then(() => process.exit(0))
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
