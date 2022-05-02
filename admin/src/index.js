const express = require("express");
const bodyParser = require("body-parser");
const config = require("config");
const axios = require("axios").default;
const { getInvestments, getCompanies } = require("./services");

const app = express();

app.use(bodyParser.json({ limit: "10mb" }));

app.get("/investments/:id", (req, res) => {
  const { id } = req.params
  axios.get(`${config.investmentsServiceUrl}/investments/${id}`, (e, r, investments) => {
    if (e) {
      console.error(e)
      res.send(500)
    } else {
      res.send(investments)
    }
  })
});

app.get("/admin/report", async (req, res, next) => {
  try {
    const investmentsData = await getInvestments();
    const companiesData = await getCompanies();

    const holdings = R.flatten(R.map(item => R.unwind('holdings', item), investmentsData));

    res.sendStatus(204);
  } catch (e) {
    console.log(e);
    return next(e)
  }
});

app.listen(config.port, (err) => {
  if (err) {
    console.error("Error occurred starting the server", err)
    process.exit(1)
  }
  console.log(`Server running on port ${config.port}`)
});
