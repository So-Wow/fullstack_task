const { getInvestments, mapInvestments, matchCompany } = require("../src/services");
const investmentsData = require("../../investments/src/data.json");
const companiesData = require("../../financial-companies/src/data.json");

describe('admin services should', () => {
    it('get investments data', async () => {
        const data = await getInvestments();
        expect(data && typeof data === 'object').toBe(true)
    });

    it('matches companies by id', () => {
        expect(matchCompany(companiesData, '1')).toMatch(/The Big Investment Company/);
    });

    it('return an object with specfied properties', () => {
        const outputData = mapInvestments(investmentsData);
        outputData.forEach((outputObject) => {
            expect(outputObject).toEqual(expect.objectContaining({
                user: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                date: expect.any(String),
                holding: expect.any(String),
                value: expect.any(Number)
            }));
        })
    });
});