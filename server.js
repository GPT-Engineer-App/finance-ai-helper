const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.post("/api/get-advice", async (req, res) => {
  const { income, expenses } = req.body;

  try {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: `I have a monthly income of ${income} and monthly expenses of ${expenses}. What financial advice can you give me?`,
        max_tokens: 150,
      },
      {
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
        },
      },
    );

    res.json({ advice: response.data.choices[0].text });
  } catch (error) {
    res.status(500).json({ error: "Error fetching advice from OpenAI API" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
