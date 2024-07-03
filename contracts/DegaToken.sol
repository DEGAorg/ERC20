// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegaToken is ERC20, ERC20Burnable {
    constructor(uint256 _initialSupply)
        ERC20("DegaToken", "$DEGA")
    {
        _mint(msg.sender, _initialSupply);
    }

}