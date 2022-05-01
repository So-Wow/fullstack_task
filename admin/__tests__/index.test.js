const { getInvestments } = require("../src/services");

describe('admin services should', () => {
    it('get investments data', async () => {
        const data = await getInvestments();
        expect(data && typeof data === 'object').toBe(true)
    });
});