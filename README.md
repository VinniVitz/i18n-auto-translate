# i18n-auto-translate
Translate i18n JSON files with the Free DeepL API

## Setup project
Create a free account on https://www.deepl.com/pro-api for your API key.
Run `npm install` or `yarn install`

## Run project
Add an `.env` file to the root directory.
Specify the following environment variables:
```
SOURCE_LANG= // example: EN-US
TARGET_LANG= // example: DE
API_KEY=your_api_key
FILE_PATH=path.to.source.file
OUT_DIR=path.to.target.dir // optional
```
For all available source and target languages see https://www.deepl.com/docs-api/translating-text/request/.
