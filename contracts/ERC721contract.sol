// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract ERC721contract is ERC721 {

uint256 tokenId;

constructor()ERC721("kalakunj" , "SMK"){

}
function mint(address _owner) external {
    _mint(_owner, tokenId);

    tokenId++;
}



}