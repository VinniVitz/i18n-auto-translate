import axios from "axios";
import { readFileSync, writeFileSync } from "fs";

const api_key = process.env.API_KEY as string;
const target_lang = process.env.TARGET_LANG as string;
const source_lang = process.env.SOURCE_LANG as string;
const file_path = process.env.FILE_PATH as string;
const out_dir = process.env.OUT_DIR as string;

async function init(): Promise<void> {
  try {
    if (!api_key) {
      throw "No API key provided.";
    } else if (!target_lang) {
      throw "No target language provided.";
    } else if (!source_lang) {
      throw "No source language provided.";
    } else if (!file_path) {
      throw "No source file path provided.";
    }
    const result = await translate(
      JSON.parse(readFileSync(`${file_path}`).toString())
    );
    writeFileSync(
      `${out_dir ? out_dir + "/" : ""}${target_lang
        .substring(0, target_lang.indexOf("-"))
        .toLowerCase()}.json`,
      JSON.stringify(result),
      { flag: "w" }
    );
  } catch (err) {
    console.log(err);
  }
}

async function translate(data: any): Promise<any> {
  const keys = Object.keys(data);
  await executeSequentially(
    keys,
    async (key) =>
      (data[key] =
        typeof data[key] === "string"
          ? (
              await axios.post(
                "https://api-free.deepl.com/v2/translate",
                {},
                {
                  params: {
                    text: data[key],
                    target_lang: target_lang.toUpperCase(),
                    source_lang: source_lang.toUpperCase(),
                  },
                  headers: { Authorization: `DeepL-Auth-Key ${api_key}` },
                }
              )
            )?.data?.translations[0].text
          : await translate(data[key]))
  );
  return data;
}

async function executeSequentially<T>(
  items: T[],
  handler: (e: T) => Promise<any>
): Promise<void> {
  for (const item of items) {
    await handler(item);
  }
}

init();
