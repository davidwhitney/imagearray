const ImageMap = require('./imageMap');

describe('Transcoder', () => {
    it('Can preview transcoding in the terminal', async () => {
        const mapped = new ImageMap();

        await mapped.load('./app/cat.jpg');

        console.log(mapped.visualizeForDisplay());
    });

    it('Can generate an array of bytes to be embedded', async () => {
        const mapped = new ImageMap();

        await mapped.load('./app/cat.jpg');

        console.log(mapped.generateArray());
    });

});
