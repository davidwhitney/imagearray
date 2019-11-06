const ImageMap = require('./imageMap');

const mapped = new ImageMap();

// Usage: node app/index.js app/cat.jpg
const file = process.argv[2];
const preview = process.argv[3] === '--preview';
const snake = process.argv[3] === '--snake';

console.log('Image reducer');
console.log(`Processing ${file}`);

mapped.load(file)
    .then((image) => {
        let output;
        if (preview) {
            console.log(image.visualizeForDisplay());
            return;
        }

        if (snake) { console.log('Array is generated "pre-snaked"...'); }
        console.log(image.generateArray(snake));
    });