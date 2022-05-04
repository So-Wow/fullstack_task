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

    it('return an object with specified properties', () => {
        const outputData = mapInvestments(investmentsData, companiesData);
        outputData.forEach(outputObject => {
            expect(outputObject).toEqual(expect.objectContaining({
                User: expect.any(String),
                'First Name': expect.any(String),
                'Last Name': expect.any(String),
                Date: expect.any(String),
                Holding: expect.any(String),
                Value: expect.any(Number)
            }));
        })
    });
});