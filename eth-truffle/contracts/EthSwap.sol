// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import './FalkToken.sol';

contract EthSwap {
    string public name = "EthSwap instant Exchange";
    FalkToken public falktoken;
    uint public rate = 100;

    event Bought(
        address indexed buyer,
        address falktoken,
        uint amount,
        uint rate
    );

    event Sold(
        address indexed buyer,
        address falktoken,
        uint amount,
        uint rate
    );

    constructor(FalkToken _falktoken) {
        falktoken = _falktoken;
    }

    function buyToken() external payable {
        uint tokenAmount = msg.value * rate;

        require(falktoken.balanceOf(address(this)) >= tokenAmount);

        falktoken.transfer(msg.sender, tokenAmount);

        emit Bought(msg.sender, address(falktoken), tokenAmount, rate);
    }

    function sellTokens(uint _amount) public {
        uint etherAmount = _amount / rate;

        require(address(this).balance >= etherAmount, "Not enough balance");

        falktoken.transferFrom(msg.sender, address(this), _amount);

        payable(msg.sender).transfer(etherAmount);

        emit Sold(msg.sender, address(falktoken), _amount, rate);
    }
}