// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegaToken is ERC20, ERC20Burnable, Ownable {
    constructor(uint256 _initialSupply, address _owner)
        ERC20("DegaToken", "$DEGA")
        Ownable(_owner)
    {
        _mint(_owner, _initialSupply);
    }

}