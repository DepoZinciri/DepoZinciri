const DepoZinciri = artifacts.require("DepoZinciri");

contract("DepoZinciri", async (accounts) => {
    let instance;

    // Users
    let user = accounts[0];
    let user2 = accounts[1];
    let user3 = accounts[2];

    beforeEach(async () => {
        instance = await DepoZinciri.new();
    });

    describe('Update Need Status', () => {
        it("should update and get need status", async () => {
            await instance.updateNeedStatus(1, 1); // NeedStatus.Confirmed
            const status = await instance.getNeedStatus(1);
            assert.equal(status.toNumber(), 1, "Need status should be Confirmed");
        });

        it("should get historical need status", async () => {
            await instance.updateNeedStatus(1, 1); // NeedStatus.Confirmed
            await instance.updateNeedStatus(1, 2); // NeedStatus.Delivered
            const history = await instance.getHistoricalNeedStatus(1);
            assert.equal(history.length, 2, "Need status history length should be 2");
            assert.equal(parseInt(history[0].status), 1, "First status should be Confirmed");
            assert.equal(parseInt(history[1].status), 2, "Second status should be Delivered");
        });
    });

    describe('Update Support Status', () => {
        it("should update and get support status", async () => {
            await instance.updateSupportStatus(1, 1); // SupportStatus.OnTheWay
            const status = await instance.getSupportStatus(1);
            assert.equal(status.toNumber(), 1, "Support status should be OnTheWay");
        });

        it("should get historical support status", async () => {
            await instance.updateSupportStatus(1, 1); // SupportStatus.OnTheWay
            await instance.updateSupportStatus(1, 2); // SupportStatus.OnTheWarehouse
            const history = await instance.getHistoricalSupportStatus(1);
            assert.equal(history.length, 2, "Support status history length should be 2");
            assert.equal(parseInt(history[0].status), 1, "First status should be OnTheWay");
            assert.equal(parseInt(history[1].status), 2, "Second status should be OnTheWarehouse");
        });
    });
});
