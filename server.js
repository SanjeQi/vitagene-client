const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/report', (req, res) => {
  res.send({ report: [...randomReport()] });
});

app.get('/api/vitamins', (req, res) => {
    res.send({ vitamins: [...vitamins()] });
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
]}


const vitamins = () => {

    return [{
          id: 1,
          name: "Vitamin A",
          sources: "beef, liver, salmon, green leafy vegetables, broccoli, carrots, apricots, mangos, dairy products, fortified breakfast cereals",
          rda: "5000 IU",
          code: "B0013G3AJ8",
          benefits: "Vitamin A is a fat-soluble vitamin that is naturally present in many foods. Vitamin A is important for normal vision, the immune system, and reproduction. Vitamin A also helps the heart, lungs, kidneys, and other organs work properly.",
          deficiency: "xerophthalmia - inability to see in low light",
          toxicity: "dizziness, nausea, headaches, coma, death, in pregnant women - birth defects.",
          symbol: "A"
        },
        {
          id: 2,
          name: "Calcium",
          sources: "milk, yogurt, cheese, kale, broccoli, sardines, salmon",
          rda: "1000 mg",
          code: "B00X609M3M",
          benefits: "Calcium is a mineral the body needs calcium to maintain strong bones and to carry out many important functions. Almost all calcium is stored in bones and teeth, where it supports their structure and hardness. The body also needs calcium for muscles to move and for nerve function and blood circulation.",
          deficiency: "osteopenia, increased risk for osteoporosis and bone fractures",
          toxicity: "constipation",
          symbol: "Ca"
        },
        {
          id: 3,
          name: "Folic acid",
          sources: "enriched bread, flour, cornmeal, pasta, rice, fortified breakfast cereals",
          rda: "400 mcg DFE",
          code: "B00MX2H11E",
          benefits: "Folate is a B-vitamin that is naturally present in many foods. Your body needs folate to make DNA synthesis. A more bioavailable form of folate, folic acid, is used in fortified foods and most dietary supplements.",
          deficiency: "weakness, fatigue, trouble concentrating, irritability, headache, heart palpitations, shortness of breath, open sores on the tongue and inside the mouth, changes in the color of the skin, hair, or fingernails, in women -  risk of having babies with neural tube defects such as spina bifida",
          toxicity: "can hide a vitamin B12 deficiency by correcting anaemia whilst worsening the issue",
          symbol: "B9"
        },
        {
          id: 4,
          name: "Iron",
          sources: "meat, seafood, poultry, iron-fortified breakfast cereals, white beans, lentils, spinach, kidney beans, peas",
          rda: "8mg for men, 11mg for women",
          code: "B0013G8I0O",
          benefits: "Iron is a mineral that the body needs to make hemoglobin, a protein in red blood cells that carries oxygen from the lungs to all parts of the body, and myoglobin, a protein that provides oxygen to muscles.",
          deficiency: "fatigue, GI upset, poor memory and concentration, hair loss, weakened ability to fight off germs and infections",
          toxicity: "upset stomach, constipation, nausea, abdominal pain, vomiting, fainting, can cause organ failure and death in extremely high doses",
          symbol: "Fe"
        },
        {
          id: 5,
          name: "Magnesium",
          sources: "legumes, nuts, seeds, whole grains, green leafy vegetables, fortified breakfast cereals, dairy products",
          rda: "10mg for men, 310mg for women",
          code: "B012T97SDQ",
          benefits: "Magnesium is important for many processes in the body, including regulating muscle and nerve function, blood sugar levels and making protein, bone, and DNA.",
          deficiency: "loss of appetite, nausea, vomiting, fatigue, weakness",
          toxicity: "diarrhea, nausea, abdominal cramping",
          symbol: "Mg"
        },
        {
          id: 6,
          name: "Vitamin B12",
          sources: "beef liver, clams, fish, meat, poultry, eggs, dairy products",
          rda: "2.4mcg",
          code: "B01M0WZ6R6",
          benefits: "Vitamin B12 helps keep the body's nerve and blood cells healthy and helps make DNA. It also helps prevent megaloblastic anemia which causes fatigue and weakness.",
          deficiency: "tiredness, weakness, constipation, loss of appetite, weight loss, megaloblastic anemia, nerve problems, balance, depression, confusion, dementia, poor memory, soreness of the mouth or tongue.",
          toxicity: "Vitamin B12 in high amounts has not been shown to cause any harm.",
          symbol: "B12"
        },
        {
          id: 7,
          name: "Vitamin D",
          sources: "salmon, tuna, mackerel, beef, liver, cheese, egg yolks, fortified milk",
          rda: "600 IU",
          code: "B072L235Z5",
          benefits: "Vitamin D is needed to maintain strong bones by helping the body absorb calcium from food and supplements.",
          deficiency: "in children - rickets (soft bones), in adults - osteomalacia (bone pain and muscle weakness)",
          toxicity: "nausea, vomiting, poor appetite, constipation, weakness, weight loss, kidney damage",
          symbol: "D"
        },
        {
          id: 8,
          name: "Vitamin E",
          sources: "wheat germ oil, sunflower oil, safflower oil, peanuts, hazelnuts, almonds, sunflower seeds, spinach, broccoli",
          rda: "15 mg",
          code: "B001RU8VJE",
          benefits: "Vitamin E acts as an antioxidant, helping to protect cells from the damage caused by free radicals. It also assists with vasodilation.",
          deficiency: "(very rare), nerve and muscle damage, loss of body movement control, muscle weakness, vision problems, weakened immune system",
          toxicity: "increased risk of bleeding, increased risk for hemorrhagic stroke",
          symbol: "E"
        }
      ]


    
}