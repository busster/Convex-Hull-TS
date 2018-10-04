import * as fs from 'fs';
import path from 'path';
import readline from 'readline';

export default class TestFileReader {
  filePath: string;
  lines: Array<string>;
  constructor (fileName: string) {
    this.filePath = path.join(__dirname, '..', 'test-files', fileName);
    this.lines = [];
  }

  readFile () {
    let l = this.lines;
    let processingData = new Promise((resolve, reject) => {
      let lineReader = readline.createInterface({
        input: fs.createReadStream(this.filePath)
      });
      lineReader.on('line', function (line: string) {
        l.push(line)
      });
      lineReader.on('close', resolve);
    });
    return new Promise<Array<Array<number>>>((resolve, reject) => {
      processingData.then(data => resolve(l.map(this.processFile)))
    })
  }

  processFile (data: string) {
    return data.split(' ').map(s => parseInt(s))
  }
}
