var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "fs", "path", "readline"], function (require, exports, fs, path_1, readline_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    fs = __importStar(fs);
    path_1 = __importDefault(path_1);
    readline_1 = __importDefault(readline_1);
    class TestFileReader {
        constructor(fileName) {
            this.filePath = path_1.default.join(__dirname, '..', 'test-files', fileName);
            this.lines = [];
        }
        readFile() {
            let l = this.lines;
            let processingData = new Promise((resolve, reject) => {
                let lineReader = readline_1.default.createInterface({
                    input: fs.createReadStream(this.filePath)
                });
                lineReader.on('line', function (line) {
                    l.push(line);
                });
                lineReader.on('close', resolve);
            });
            return new Promise((resolve, reject) => {
                processingData.then(data => resolve(l.map(this.processFile)));
            });
        }
        processFile(data) {
            return data.split(' ').map(s => parseInt(s));
        }
    }
    exports.default = TestFileReader;
});
