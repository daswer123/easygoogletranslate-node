# easygoogletranslate
        
Unofficial Google Translate API. 

This library does not need an api key or something else to use, it's free and simple.
You can either use a string or a file to translate but the text must be equal to or less than 5000 character. 
You can split your text into 5000 characters to translate more.

Google Translate supports 108 different languages. You can use any of them as source and target language in this application.
If source language is not specified, it will detect source language automatically.
This application supports multi thread translation, you can use it to translate multiple languages at once.
Detailed language list can be found here:  https://cloud.google.com/translate/docs/languages


## Installation:
The easiest way to install easygoogletranslateis to download it from PyPI. Then you will be able to use the library.

```
npm i free-google-translate
```


## Examples:
1. Specify default source and target language at beginning and use it any time.
```
const EasyGoogleTranslate = require('free-google-translate');

const translator = new EasyGoogleTranslate(
    'en',
    'de',
    10000
);

translator.translate('This is an example.')
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Output: Dies ist ein Beispiel.
```

2. Don't specify default parameters.
```
const EasyGoogleTranslate = require('free-google-translate');
const translator = new EasyGoogleTranslate();

translator.translate('This is an example.', 'tr')
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Output: Bu bir örnektir.
```

3. Override default parameters.
```
const EasyGoogleTranslate = require('free-google-translate');

const translator = new EasyGoogleTranslate('tr');

translator.translate('This is an example.', 'fr')
    .then(result => console.log(result))
    .catch(error => console.error(error));
    
// Output: Ceci est un exemple.
```

4. Translate a text in multiple languages at once via multi-threading.
```
const EasyGoogleTranslate = require('free-google-translate');

const translator = new EasyGoogleTranslate();
const text = This is an example

Promise.all([
    translator.translate(text, 'tr'),
    translator.translate(text, 'fr'),
    translator.translate(text, 'de')
])
.then(results => console.log(results))
.catch(error => console.error(error));

// Output: ['Bu bir örnektir.', 'Ceci est un exemple.', 'Dies ist ein Beispiel.']
```

5. Translate a file in multiple languages at once via multi-threading.
```
const fs = require('fs').promises;
const EasyGoogleTranslate = require('free-google-translate');

const translator = new EasyGoogleTranslate();

fs.readFile('text.txt', 'utf8')
    .then(text => Promise.all([
        translator.translate(text, 'tr'),
        translator.translate(text, 'fr'),
        translator.translate(text, 'de')
    ]))
    .then(results => console.log(results))
    .catch(error => console.error(error));

// Output: ['Nasılsın?', 'Comment ca va?', 'Wie geht es Ihnen?']
// Text inside file: How are you?
```

## Disclaimer
This package is not an official library and is not associated with Google. This package is only developed for educational and test purposes, can be removed if desired. Do not use this package on a real life project. If you want to use a translate service on a real project use official [Google Cloud Translate](https://cloud.google.com/translate/) service.