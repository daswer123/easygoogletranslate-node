const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs').promises;

class EasyGoogleTranslate {
    constructor(sourceLanguage = 'auto', targetLanguage = 'tr', timeout = 5000) {
        this.sourceLanguage = sourceLanguage;
        this.targetLanguage = targetLanguage;
        this.timeout = timeout;
    }

    async makeRequest(targetLanguage, sourceLanguage, text) {
        const response = await axios.get('https://translate.google.com/m', {
            params: {
                tl: targetLanguage,
                sl: sourceLanguage,
                q: text
            },
            timeout: this.timeout
        });

        const $ = cheerio.load(response.data);
        return $('.result-container').text();
    }

    async translate(text, targetLanguage = this.targetLanguage, sourceLanguage = this.sourceLanguage) {
        if (text.length > 5000) {
            throw new Error('It can only detect 5000 characters at once.');
        }

        if (Array.isArray(targetLanguage)) {
            return Promise.all(targetLanguage.map(lang => this.makeRequest(lang, sourceLanguage, text)));
        }

        return this.makeRequest(targetLanguage, sourceLanguage, text);
    }

    async translateFile(filePath, targetLanguage = this.targetLanguage, sourceLanguage = this.sourceLanguage) {
        const text = await fs.readFile(filePath, 'utf8');
        return this.translate(text, targetLanguage, sourceLanguage);
    }
}

module.exports = EasyGoogleTranslate;