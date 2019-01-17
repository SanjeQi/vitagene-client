const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/report', (req, res) => {
  res.send({ report: [...randomReport()] });
});


app.listen(port, () => console.log(`Listening on port ${port}`));

const randomScore = () => Math.floor(Math.random() * 5)

const randomReport = () => {
    return [{
        trait: "Vitamin A",
        score: randomScore()
    },
    {
        trait: "Calcium",
        score: randomScore()
    },
    {
        trait: "Folate",
        score: randomScore()
    },
    {
        trait: "Iron",
        score: randomScore()
    },
    {
        trait: "Magnesium",
        score: randomScore()
    },

    {
        trait: "Vitamin B12",
        score: randomScore()
    },
    {
        trait: "Vitamin D",
        score: randomScore()
    },
    {
        trait: "Vitamin E",
        score: randomScore()
    }
]

}


