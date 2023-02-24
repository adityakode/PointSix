


##  :question: Problem Statement : 
 Write a smart contract to Mint an NFT associated with a unique code<hidden at first>,

the smart contract should contain a function which will mark the unique code as visible. Once the code is visible, have a function to burn that NFT.


##  :bulb: My Solution:

I have used number of contracts from [Openzeppelin](https://github.com/OpenZeppelin/openzeppelin-contracts)
- [ERC721](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol)
```
 @openzeppelin/contracts/token/ERC721/ERC721.sol
 ```
 - [Burnable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/extensions/ERC721Burnable.sol)
 ```
 @openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol
 ```
 - [Ownable](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol)
 ```
 @openzeppelin/contracts/access/Ownable.sol
 ```
 - [Counters](https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/utils/Counters.sol)
 ```
 @openzeppelin/contracts/utils/Counters.sol
```

I have used number of functions in order to make this happen:

Firstly I created mappings to map `tokenId` to `secretCode` and `tokenId` to `bool` respectively.
```solidity
   mapping(uint256 => uint256) codeBase;
    mapping(uint256 => bool) storeCode;
```

Then I created a function to create a **RandomNumber**.

```solidity
   uint randNonce = 0;
	function randMod() private returns(uint)
	{
		// increase nonce
		randNonce++;
		uint randNum = uint(keccak256(abi.encodePacked(block.timestamp,msg.sender,randNonce)));
        return randNum;
	}
```

Then I created `Mint` function which will mint our NFT
```solidity
function mint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        codeBase[tokenId] = randMod();
        storeCode[tokenId] = false;
    }

```

- we get current Id and autoIncrement it . 
- Then we mint the NFT using Openzeppelin's *ERC721* `safemint` function
- Then we generate random secret code
- Finally we mark it `false` in storeCode mapping (now it wont be visible)


Function `showCode` shows us the random number ( if it has been made visible , else we are reverted)
```solidity

 function showcode(uint256 _tokenId) public view returns (uint){
        _requireMinted(_tokenId);
        //also see if nft is minted
        require(storeCode[_tokenId]==true,"Secret Code is hidden");
        return codeBase[_tokenId];
    }
```

Function `makeVisible` and `burnNFT` makes the secret Code and burns the NFT respectively

```solidity
 function makeVisible(uint256 _tokenId) public {
        storeCode[_tokenId] = true;
    }

    function burnNFT(uint256 _tokenId) public {
         _burn(_tokenId);
         codeBase[_tokenId] = 0;
    }
```


