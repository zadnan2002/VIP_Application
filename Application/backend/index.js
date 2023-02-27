//key: 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
const { Configuration, OpenAIApi } = require("openai");
const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')
const configuration = new Configuration({
    organization: "org-47OnOFtHVUM8QweyA5Ls4MOO",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);
//const response = await openai.listEngines();


//creare a simple express api that calls the function above
;
const port = 3080;
const app = express();
app.use(bodyParser.json());
app.use(cors());




app.post('/', async (req, res) => {
    const {message}=req.body;
    console.log(message+"fdewf");
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: message,
        max_tokens: 200,
        temperature: 0.5,
    });
    
    res.json({message:  response.data.choices[0].text})
  console.log(response.data.choices[0].text);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
}
)




