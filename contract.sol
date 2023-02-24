// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Test is ERC721, ERC721Burnable, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(uint256 => uint256) codeBase;
    mapping(uint256 => bool) storeCode;

    constructor() ERC721("test", "TT") {}

   uint randNonce = 0;
	function randMod() private returns(uint)
	{
		// increase nonce
		randNonce++;
		uint randNum = uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce)));
        return randNum;
	}

    function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        codeBase[tokenId] = randMod();
        storeCode[tokenId] = false;
    }

    function showcode(uint256 _tokenId) public view returns (uint){
        _requireMinted(_tokenId);
        //also see if nft is minted
        require(storeCode[_tokenId]==true,"Secret Code is hidden");
        return codeBase[_tokenId];
    }

    function makeVisible(uint256 _tokenId) public {
        storeCode[_tokenId] = true;
    }

    function burnNFT(uint256 _tokenId) public {
         _burn(_tokenId);
         codeBase[_tokenId] = 0;
    }

}
