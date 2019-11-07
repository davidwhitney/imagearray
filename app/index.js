const ImageMap = require('./imageMap');
const file = process.argv[2];
const preview = process.argv[3] === '--preview';
const snake = process.argv[3] === '--snake';

console.log('Image reducer');
console.log(`Processing ${file}`);

const mapped = new ImageMap();

mapped.load(file)
    .then((image) => {
        if (preview) {
            console.log(image.visualizeForDisplay());
            return;
        }

        if (snake) { console.log('Array is generated "pre-snaked"...'); }
        console.log(image.generateArray(snake));
    });