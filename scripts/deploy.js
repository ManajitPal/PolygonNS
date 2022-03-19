const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("pal");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
      let txn = await domainContract.register("manajit",  {value: hre.ethers.utils.parseEther('0.1')});
      await txn.wait();
    console.log("Minted domain manajit.pal");
  
    txn = await domainContract.setRecord("manajit", "Portfolio incoming!");
    await txn.wait();
    console.log("Set record for manajit.pal");
  
    const address = await domainContract.getAddress("manajit");
    console.log("Owner of domain manajit:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();