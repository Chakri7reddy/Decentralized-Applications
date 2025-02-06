// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    address public implementation;
    address public admin;

    event Upgraded(address indexed newImplementation);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender;
    }

    function upgrade(address _newImplementation) external onlyAdmin {
        require(_newImplementation != address(0), "Invalid implementation address");
        implementation = _newImplementation;
        emit Upgraded(_newImplementation);
    }

    fallback() external {
        // delegatecall to the implementation contract
        (bool success, ) = implementation.delegatecall(msg.data);
        require(success, "Delegate call failed");
    }

    receive() external payable {}
}