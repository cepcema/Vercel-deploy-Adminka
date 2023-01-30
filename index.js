const PORT = process.env.PORT || 8000;
const express = require(`express`);
const { google } = require(`googleapis`);
const cors = require(`cors`);
const app = express();

app.use(cors());

 app.all("/", function(req, res, next) {
     res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
     next();
 });

app.get(`/`, async(req, res, next) => {
    const auth = new google.auth.GoogleAuth({
        keyFile: `adminka.json`,
        scopes: `https://www.googleapis.com/auth/spreadsheets`,
    });

    //Create client instance of auth
    const client = await auth.getClient();
    //Instance of Google sheets api
    const googleSheets = google.sheets({ version: "v4", auth: client });
    const spreadsheetId = "1hUttH8yXd-o3TcOJOo4XHi-KCPMlcXRoAhuRBAodG6Y";

    // Get metadata about spreadsheet
    const metaData = await googleSheets.spreadsheets.get({
        auth,
        spreadsheetId,
    });
    // Read rows from spreadsheet
    const getRows = await googleSheets.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "Sheet1",
    });

    //  res.send(getRows.data.values[1][2]);

    res.send(getRows);
});

app.listen(process.env.PORT || 8000, (req, res) =>
    console.log(`Runinn on ${PORT}`)
);
