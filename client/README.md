# To launch this react app

Use this command to install node module:
npm install

Then run the project with :
npm run start

# to connect to ganache
https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/34

Also, you must copy/paste the file ./build/contracts/CourseSelectionSystem.json into the folder ./client/src with only this name.

# the requestAccount method
the connection will use MetaMasc address, if the address isn't on it, it will not work.

# Link to ipfs

The image are stored to IPFS. A local instance can be found [here](https://github.com/ipfs/ipfs-desktop/releases).  After the installation, upload the image inside and get the CID. Put the CID of the course into the call of contracts method "add_course".