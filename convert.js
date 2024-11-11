const fs = require('fs');

class WordsExtractor {
    constructor() {
        this.question1Words = [];
        this.question2Words = [];
        this.question3Words = [];
    }

    extractWords(inputFile) {
        try {
            console.log('Reading JSON file...');
            const jsonData = JSON.parse(fs.readFileSync(inputFile, 'utf8'));

            // Process question1
            if (jsonData.question1) {
                Object.values(jsonData.question1).forEach(wordArray => {
                    if (Array.isArray(wordArray)) {
                        this.question1Words.push(...wordArray);
                    }
                });
            }

            // Process question2
            if (jsonData.question2) {
                Object.values(jsonData.question2).forEach(wordArray => {
                    if (Array.isArray(wordArray)) {
                        this.question2Words.push(...wordArray);
                    }
                });
            }

            // Process question3
            if (jsonData.question3) {
                Object.values(jsonData.question3).forEach(wordArray => {
                    if (Array.isArray(wordArray)) {
                        this.question3Words.push(...wordArray);
                    }
                });
            }

            // Write to CSV files
            this.writeWordsToFile('question_1_words.csv', this.question1Words);
            this.writeWordsToFile('question_2_words.csv', this.question2Words);
            this.writeWordsToFile('question_3_words.csv', this.question3Words);

            // Print statistics
            console.log('\nStatistics:');
            console.log(`Question 1 total words: ${this.question1Words.length}`);
            console.log(`Question 2 total words: ${this.question2Words.length}`);
            console.log(`Question 3 total words: ${this.question3Words.length}`);

        } catch (error) {
            console.error('Error during extraction:', error.message);
            throw error;
        }
    }

    writeWordsToFile(filename, words) {
        try {
            fs.writeFileSync(filename, words.join(','));
            console.log(`Successfully wrote ${filename}`);
        } catch (error) {
            console.error(`Error writing ${filename}:`, error.message);
        }
    }
}

// Usage
const extractor = new WordsExtractor();
extractor.extractWords('input.json');