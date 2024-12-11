const fs = require('fs');

class WordsExtractor {
    constructor() {
        this.question1Words = [];
        this.question2Words = [];
        this.question3Words = [];
    }

    countWordFrequency(words) {
        const frequency = {};
        words.forEach(word => {
            frequency[word] = (frequency[word] || 0) + 1;
        });
        return frequency;
    }

    formatForCSV(wordFrequency) {
        const uniqueWords = Object.keys(wordFrequency);
        const frequencies = uniqueWords.map(word => wordFrequency[word]);
        return {
            words: uniqueWords.join(','),
            counts: frequencies.join(',')
        };
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

            // Process and write each question's data
            this.processAndWriteToFile('question_1_words.csv', this.question1Words);
            this.processAndWriteToFile('question_2_words.csv', this.question2Words);
            this.processAndWriteToFile('question_3_words.csv', this.question3Words);

            // Print statistics
            console.log('\nStatistics:');
            console.log(`Question 1 unique words: ${new Set(this.question1Words).size}`);
            console.log(`Question 2 unique words: ${new Set(this.question2Words).size}`);
            console.log(`Question 3 unique words: ${new Set(this.question3Words).size}`);

        } catch (error) {
            console.error('Error during extraction:', error.message);
            throw error;
        }
    }

    processAndWriteToFile(filename, words) {
        try {
            const frequency = this.countWordFrequency(words);
            const csvContent = this.formatForCSV(frequency);
            
            // Write both lines to the file
            fs.writeFileSync(filename, csvContent.words + '\n' + csvContent.counts);
            console.log(`Successfully wrote ${filename}`);
        } catch (error) {
            console.error(`Error writing ${filename}:`, error.message);
        }
    }
}

// Usage
const extractor = new WordsExtractor();
extractor.extractWords('input.json');