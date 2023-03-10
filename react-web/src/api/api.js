import { Configuration, OpenAIApi } from 'openai';

export default async function onSubmit(apiKey, inputText, setResult) {

  try{

    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    // let codeAddition = " specify language behind after starting ```";

    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: inputText}],
    });

    const txt = completion.data.choices[0].message.content;
    console.log(txt);
    setResult(txt.trimStart());
  } catch(error) {
    console.error(error);
    alert(error.message);
  }
}