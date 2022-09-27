import dotenv from 'dotenv';
import ExpiryMap from 'expiry-map';
import fs from 'node:fs/promises';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Configuration as OpenAIConfiguration, OpenAIApi } from 'openai';
import pMemoize from 'p-memoize';

dotenv.config();

const {
  OPENAI_API_KEY: openaiApiKey,
} = process.env;

if (!openaiApiKey) {
  throw new Error('OPENAI_API_KEY is not set');
}

const configuration = new OpenAIConfiguration({
  apiKey: openaiApiKey,
});

const openai = new OpenAIApi(configuration);

async function loadTrainingDataset(): Promise<Map<string, string>> {
  // Read file ./voice-ai/training-dataset.jsonl JSON lines
  const fileContent = await fs.readFile(
    dirname(fileURLToPath(import.meta.url)) +
    '/voice-ai/fine-tuning-dataset.jsonl',
  );
  const lines = fileContent.toString().split('\n');
  const dataset = lines
    .map((line) => {
      const trimedLine = line.trim();
      if (trimedLine) {
        let {prompt, completion} = JSON.parse(trimedLine) as { prompt: string; completion: string };
        prompt = prompt.trim().replaceAll(/[!.?]/g, '').toLocaleLowerCase();
        completion = completion.trim().replace(/\sEND$/g, '');
        return {prompt, completion};
      }
      return undefined;
    })
    .filter((line): line is { prompt: string; completion: string } => !!line)
  return new Map(dataset.map(({prompt, completion}) => [prompt, completion]));
}

const dataset = await loadTrainingDataset();

// Return the command if it's in the training dataset, otherwise returns undefined
// Because openai manages to return invalid answers from the training dataset
function simpleCommandFromDataset(prompt: string): string | undefined {
  const promptToSearch = prompt.replaceAll(/[!.?]/g, '').toLocaleLowerCase();
  return dataset.get(promptToSearch);
}

export async function textToCommand(text: string): Promise<string> {
  const prompt = `${text.replaceAll(/\s+/g, ' ').trim()}:`;

  const potentialSimpleCommand = simpleCommandFromDataset(prompt);
  if (potentialSimpleCommand) {
    return potentialSimpleCommand;
  }

  const response = await openai.createCompletion({
    model: 'davinci:ft-sintef-2022-09-27-18-49-04',
    prompt,
    temperature: 0,
    max_tokens: 100,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: [' END'],
  });

  const responseText = response.data.choices?.[0]?.text?.trim() ?? '';
  return responseText;
}

const textToCommandCache = new ExpiryMap(/** 120 minutes */ 120 * 60 * 1000);
const textToCommandWithCache = pMemoize(
  textToCommand, { cache: textToCommandCache },
);

export default textToCommandWithCache;
