const FalkToken = artifacts.require("FalkToken");
const EthSwap = artifacts.require("EthSwap");

contract('FalkToken', (accounts) => {
    it('contract has a name', async () => {
        falkToken = await FalkToken.new();
        const name = await falkToken.name();
        assert.equal(name, 'FalkToken');
    });
})
contract('EthSwap', ([deployer, investor]) => {
    let falkToken, ethSwap;
    before(async() => {
        falkToken = await FalkToken.new();
        ethSwap = await EthSwap.new(falkToken.address);
        // Transfer tokens to contract
        await falkToken.transfer(ethSwap.address, '1000000000000000000000000')
    })

    it('contract has a name', async () => {
        const name = await ethSwap.name();
        assert.equal(name, 'EthSwap instant Exchange');
    });

    it('contract has tokens', async () => {
        const balance = await falkToken.balanceOf(ethSwap.address);
        assert.equal(balance.toString(), '1000000000000000000000000');
    });

    it('Can buy Token', async () => {
        const result = await ethSwap.buyToken({from: investor, value: "1000000000000000000"});
        // Check balance
        const investorBalance = await falkToken.balanceOf(investor);
        assert.equal(investorBalance.toString(), '100000000000000000000');

        // Check EthSwap balance
        const ethSwapBalance = await falkToken.balanceOf(ethSwap.address);
        assert.equal(ethSwapBalance.toString(), '999900000000000000000000');

        // Check ETH balance
        const ethBalance = await EthSwap.web3.eth.getBalance(ethSwap.address);
        assert.equal(ethBalance.toString(), '1000000000000000000');

        const event = result.logs[0].args;

        assert.equal(event.buyer, investor);
        assert.equal(event.falktoken, falkToken.address);
        assert.equal(event.amount.toString(), '100000000000000000000');
        assert.equal(event.rate.toString(), '100');
    })

    it('Can sell Token', async () => {
        await falkToken.approve(ethSwap.address, '100000000000000000000', {from: investor});
        result = await ethSwap.sellTokens('100000000000000000000', {from: investor} )
    
        let investorBalance = await falkToken.balanceOf(investor);
        assert.equal(investorBalance.toString(), '0');

        const event = result.logs[0].args;

        assert.equal(event.buyer, investor);
        assert.equal(event.falktoken, falkToken.address);
        assert.equal(event.amount.toString(), '100000000000000000000');
        assert.equal(event.rate.toString(), '100');

        // Test if investor can't sell more than he has
        try {
            await ethSwap.sellTokens('5000000000000000000', {from: investor});
        } catch (err) {
            assert.equal(err.message, 'Returned error: VM Exception while processing transaction: revert Not enough balance -- Reason given: Not enough balance.');
            
        }
    })

})