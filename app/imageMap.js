const Jimp = require('jimp');

class ImageMap {
    constructor() {
        this.lines = [];
    }

    async load(imagePath) {
        const originalImage = await Jimp.read(imagePath);
        const image = originalImage.resize(10, 10);

        for (let y = 0; y < image.bitmap.height; y++) {
            const row = [];

            for (let x = 0; x < image.bitmap.width; x++) {
                const hex = image.getPixelColor(x, y);
                const pixel = Jimp.intToRGBA(hex);
                row.push(pixel);
            }

            this.lines.push(row);
        }
        return this;
    }

    visualizeForDisplay() {
        return this.visualize(this.formatSinglePixelForPreview, this.formatEachRowForPreview, this.removeBlacksForPreview);
    }

    generateArray(snake = true) {
        const rowFormatter = snake ? this.trimAndSnakeRows: this.trimRows;
        return this.visualize(this.formatSinglePixelForHardware, rowFormatter, this.removeDoubleCommasFromArray);
    }
    
    visualize(pixelFormatter, rowFormatter, imageFormatter) {
        let output = '';
        for (let rowIndex = 0; rowIndex < this.lines.length; rowIndex++) {
            const line = this.lines[rowIndex];

            let lineBuffer = '';
            for(let pixelOnThisRowIndex in line) {
                lineBuffer += pixelFormatter(line[pixelOnThisRowIndex]);
            }

            output += rowFormatter(lineBuffer, rowIndex);
        }

        return imageFormatter(output);
    }

    // Preview formatting
    removeBlacksForPreview(image) { return image.replace(/000-000-000/g, "           ");  }
    formatSinglePixelForPreview(pixel) { return `[${pixel.r.toString().padStart(3, '0')}-${pixel.g.toString().padStart(3, '0')}-${pixel.b.toString().padStart(3, '0')}] `; }
    formatEachRowForPreview(rowOfPixels, index) {
        rowOfPixels = rowOfPixels.trim();
        rowOfPixels += '\r\n\r\n\r\n';
        return rowOfPixels;
    }

    // Byte array formatting
    trimRows(rowOfPixels, index) { return rowOfPixels.trim();  }
    removeDoubleCommasFromArray(image) { return image.replace(/,,/g, ","); }
    formatSinglePixelForHardware(pixel) { return `${pixel.r.toString().padStart(3, '0')}-${pixel.g.toString().padStart(3, '0')}-${pixel.b.toString().padStart(3, '0')},`; }
    trimAndSnakeRows(rowOfPixels, index) {
        rowOfPixels = rowOfPixels.trim();
        if (index % 2 != 0) {
            rowOfPixels = rowOfPixels.split("").reverse().join("");
        }
        return rowOfPixels;
    }
}

module.exports = ImageMap;
