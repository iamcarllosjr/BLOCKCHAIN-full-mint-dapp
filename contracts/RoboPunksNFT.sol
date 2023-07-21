// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract RoboPunksNFT is ERC721, ERC721URIStorage, Pausable, Ownable {
    uint256 public mintPrice = 0.02 ether; //set mintprice for each nft
    uint256 public totalSupply = 0; //set initial supply nfts
    uint256 public maxSupply = 100; //set max total supply nfts
    uint256 public maxPerWallet = 3; //set maxperwallets minted
    mapping(address => uint256) public walletMints;
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("RoboPunksNFT", "Rbpks") {}

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function safeMint(address to, uint256 quantity_, string memory uri) public payable {
        require(msg.value == quantity_ * mintPrice, "Wrong mint value");
        require(totalSupply + quantity_ <= maxSupply, "Sold out");
        require(walletMints[msg.sender] + quantity_ <= maxPerWallet, "Exceed max Wallet");

        for (uint256 i = 0; i < quantity_; i++) {
            walletMints[msg.sender] += 1;
            uint256 tokenId = _tokenIdCounter.current();
           _tokenIdCounter.increment();
           _safeMint(to, tokenId);
           _setTokenURI(tokenId, uri);
           }
    }

    function _beforeTokenTransfer(address from, address to, uint256 tokenId, uint256 batchSize)
        internal
        whenNotPaused
        override
    {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    // The following functions are overrides required by Solidity.

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function withdraw() external payable onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "balance not enough");

        (bool sucess, ) = (msg.sender).call{ value: balance }("");
        require(sucess, "transfer failed");
    }
}