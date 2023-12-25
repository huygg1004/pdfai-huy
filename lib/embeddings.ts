import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

export async function getEmbeddings(text: string) {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/\n/g, " "),
    });
    console.log("This step of calling open ai api has been reached ...................")
    console.log("Response:", response);
    const result = await response.json();
    console.log("Result:", result);
    if (result.data && result.data.length > 0 && result.data[0].embedding) {
      return result.data[0].embedding as number[];
    } else {
      throw new Error("Invalid response structure from OpenAI API");
    }
  } catch (error) {
    console.log("error calling openai embeddings api", error);
    throw error;
  }
}