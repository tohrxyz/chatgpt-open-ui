import { Configuration, OpenAIApi } from 'openai';

export default async function onSubmit(apiKey, inputText, setResult) {

  try{

    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: inputText,
      temperature: 0,
      max_tokens: 256,
    });

    const txt = response.data.choices[0].text;

    const prettyString = txt.trimStart().replace(/#/g, "\n-");

    setResult(prettyString.trimStart());
  } catch(error) {
    console.error(error);
    alert(error.message);
  }
}