const axios = require("axios").default;
const config = require("config");
const R = require("ramda");

const getInvestments = async () => {
    const data = await axios.get(`${config.investmentsServiceUrl}/investments`).catch((error) => { console.log(error) });
    return (data.data);
}

const mapInvestments = (data, companies) => {
    const holdings = R.flatten(R.map(item => (R.unwind('holdings', item)), data));
    return holdings.map(
        ({ userId, firstName, lastName, investmentTotal, date, holdings }) => ({
            "User": userId,
            "First Name": firstName,
            "Last Name": lastName,
            "Date": date,
            "Holding": matchCompany(companies, holdings.id),
            "Value": calculateHoldingValue(holdings.investmentPercentage, investmentTotal)
        })
    );
}

const getCompanies = async () => {
    const companiesData = await axios.get(`${config.companiesServiceUrl}/companies`).catch((error) => { console.log(error) });
    return R.project(['id', 'name'], companiesData.data);
}

const calculateHoldingValue = (total, percentage) => {
    return total * percentage;
}

const matchCompany = (companiesData, id) => {
    const company = R.find(R.propEq('id', id))(companiesData);
    if (!company) {
        return "not found"
    } else {
        return company.name;
    }
}


module.exports = {
    getInvestments,
    getCompanies,
    mapInvestments,
    matchCompany,
    calculateHoldingValue
};