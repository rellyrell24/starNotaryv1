const StarNotary = artifacts.require('./StarNotary.sol')

let accounts;
var owner;

contract('StarNotary', async (accs) => {
    accounts = accs;
    owner = accounts[0];
});

it('has correct name', async () => {
    let instance = await StarNotary.deployed();
    assert.equal(await instance.starName.call(), "Awesome Udacity Star");
})

it('can be claimed', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    assert.equal(await instance.starOwner.call(), owner);
})

it('can change owners', async () => {
    let instance = await StarNotary.deployed();
    var secondUser = accounts[1];
    await instance.claimStar({from: owner});
    assert.equal(await instance.starOwner.call(), owner);
    await instance.claimStar({from: secondUser});
    assert.equal(await instance.starOwner.call(), secondUser);
})

it('can change star name', async () => {
    let instance = await StarNotary.deployed();
    await instance.claimStar({from: owner});
    await instance.changeName('JG Technology', {from: owner});
    assert.equal(await instance.starName.call(), "JG Technology");
})