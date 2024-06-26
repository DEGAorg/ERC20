// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DegaToken is ERC20, ERC20Burnable, Ownable {
    constructor()
        ERC20("$DEGA", "$DEGA")
        Ownable(msg.sender)
    {
        _mint(msg.sender, 37500000000 * 10 ** decimals());
    }
}
