import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

const app = express();

app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  res.status(200).send({
    msg: "hello",
  });
});

app.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });
    res.status(200).send({
      bot: response.data.choices[0].text,
    });
    console.log(response.data.choices);
  } catch (error) {
    res.status(200).send({ error });
  }
});
app.get("/models", async (req, res) => {
  const response = await openai.listModels();
  res.status(200).json({
    models: response.data,
  });
});
app.listen(5000, () => console.log("server run"));
