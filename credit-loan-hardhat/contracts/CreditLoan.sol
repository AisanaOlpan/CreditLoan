// SPDX-License-Identifier: MIT
// OpenZeppelin Contracts (last updated v4.7.0) (access/Ownable.sol)

pragma solidity ^0.8.0;
import "@openzeppelin/contracts/access/Ownable.sol";

contract CreditLoan is Ownable {
    address payable public borrower;
    address payable public lender;
    uint public loanAmount;
    uint public interestRate;
    uint public loanDuration;
    uint public loanEndTime;
    uint public amountRepaid;
    uint public collateralAmount;
    bool public loanRepaid;
    bool public contractViolated;
    bool public collateralAmountReturned;
    bool public isCollateralReturned;
    bool public disbursedLoan;
    uint public loanAmountTotal;

    constructor() payable {
        lender = payable(msg.sender);
    }

    function defineConditionContract(
        address payable _borrower,
        uint _loanAmount,
        uint _interestRate,
        uint _loanDuration,
        uint _collateralAmount
    ) public payable onlyOwner {
        require(
            _collateralAmount >= _loanAmount / 2,
            "Collateral amount must be more than 50% of the loan amount"
        );
        // require(loanAmount == 0, "Should run 1 time");
        require(
            msg.value >= _loanAmount,
            "Smart contract must have enough money"
        );
        borrower = _borrower;
        loanAmount = _loanAmount;
        loanRepaid = false;
        interestRate = _interestRate;
        loanDuration = _loanDuration;
        collateralAmount = _collateralAmount;
        loanEndTime = block.timestamp + loanDuration;
        amountRepaid = 0;
        isCollateralReturned = false;
        loanAmountTotal =
            ((((_loanAmount * _interestRate) / 100) + _loanAmount) /
                _loanDuration) *
            _loanDuration;
    }

    function disburseLoan() public payable {
        // выдача долга
        require(msg.sender == lender, "Only lender can disburse loan");
        require(
            address(this).balance >= loanAmount,
            "Loan amount has not been funded"
        );
        bool creditStatus = creditworthinessCheck();
        require(creditStatus == true, "Low credit status!");
        borrower.transfer(loanAmount);
        disbursedLoan = true;
    }

    function repayLoan() public payable {
        require(msg.sender == borrower, "Only borrower can repay loan");
        // require(block.timestamp <= loanEndTime, "Loan has already ended");
        uint _amountToRepay = calculateAmountInMonth();
        require(msg.value == _amountToRepay, "Incorrect amount repaid");

        amountRepaid += msg.value;
        if (amountRepaid == loanAmountTotal) {
            loanRepaid = true;
            if (!isCollateralReturned) {
                // (borrower).transfer(collateralAmount); //возврат залога
                isCollateralReturned = true;
                collateralAmountReturned = true;
            }
        }
    }

    function calculateAmountToRepay() public view returns (uint) {
        uint amountToRepay = loanAmount +
            ((loanAmount * interestRate * (block.timestamp - loanEndTime)) /
                (365 days));
        return amountToRepay;
    }

    function calculateAmountInMonth() public view returns (uint) {
        uint _amountInMonth = (((loanAmount * interestRate) / 100) +
            loanAmount) / loanDuration;
        return _amountInMonth;
    }

    function withdraw() public {
        // require(block.timestamp > loanEndTime && amountRepaid < loanAmount, "Loan is not yet due or has been fully repaid");
        require(
            msg.sender == lender,
            "Only lender can have access this smar contract"
        );
        require(loanRepaid == true, "the borrower has not yet repaid the debt");
        lender.transfer(address(this).balance);
        if (!isCollateralReturned && loanRepaid) {
            // borrower.transfer(collateralAmount); //возврат залога
            isCollateralReturned = true;
            collateralAmountReturned = true;
        }
    }

    function creditworthinessCheck() public view returns (bool) {
        if (borrower.balance >= loanAmountTotal / 2) {
            return true;
        } else {
            return false;
        }
    }

    function checkLoanStatus() public {
        require(
            block.timestamp > loanEndTime && amountRepaid < loanAmount,
            "Loan is not yet due or has been fully repaid"
        );
        uint lateDays = (block.timestamp - loanEndTime) / (1 days);
        uint penalty = (loanAmount * interestRate * lateDays) / 365;
        uint amountToRepay = loanAmount + penalty;
        if (address(this).balance >= amountToRepay) {
            amountRepaid += amountToRepay;
            if (!isCollateralReturned && collateralAmountReturned == false) {
                if (contractViolated == false) {
                    borrower.transfer(collateralAmount);
                    collateralAmountReturned = true;
                    isCollateralReturned = true;
                } else {
                    revert(
                        "Contract has been violated. Collateral is blocked."
                    );
                }
            }
        } else {
            contractViolated = true;
        }
    }
}
