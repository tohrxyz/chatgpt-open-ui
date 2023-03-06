import { Configuration, OpenAIApi } from 'openai';

export default async function onSubmit(apiKey, inputText, setResult, setIsLoading) {

  try{

    const configuration = new Configuration({
      apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuration);

    setIsLoading(true); 
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: inputText}],
    });
    setIsLoading(false); 

    const txt = completion.data.choices[0].message.content;

    setResult(txt);
  } catch(error) {
    console.error(error);
    alert(error.message);
  }
}