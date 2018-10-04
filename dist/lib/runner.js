"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import TestFileReader from './testFileReader';
const index_1 = __importDefault(require("../test-files-ts/index"));
const index_2 = __importDefault(require("./convex-hull/index"));
class Runner {
    runTests() {
        index_1.default.forEach(test => {
            this.runTest(test);
        });
    }
    processTestFile(fileData) {
        return fileData.map(d => d.split(' ').map(n => parseInt(n)));
    }
    runTest(testFile) {
        // const data = await new TestFileReader(testFile).readFile();
        const data = this.processTestFile(testFile.data);
        const answer = new index_2.default(data).computeConvexHull();
        this.printTestResults(testFile.name, data, answer);
    }
    printTestResults(testFile, testData, testAnswer) {
        console.log(`Calculating Convex Hull for ${testFile}:\n`);
        this.printTestFile('node', testData);
        console.log('\n  Convex Hull: \n');
        this.printAnswer('node', testAnswer);
        console.log('\n--------------------------------------\n\n');
        if (typeof window !== 'undefined') {
            document.write(`Calculating Convex Hull for ${testFile}:<br>`);
            this.printTestFile('window', testData);
            document.write('<br>  Convex Hull: <br>');
            this.printAnswer('window', testAnswer);
            document.write('<br>--------------------------------------<br><br>');
            document.body.style.whiteSpace = 'pre';
        }
    }
    printTestFile(env, data) {
        data.forEach(d => {
            console.log(`    ${d.join(', ')}`);
        });
        if (env === 'window') {
            data.forEach(d => {
                document.write(`    ${d.join(', ')}<br>`);
            });
        }
    }
    printAnswer(env, data) {
        if (data === undefined)
            console.log('    Cannot construct convex hull from less than 3 points');
        else {
            data.forEach(d => {
                console.log(`    ${d.x}, ${d.y}`);
            });
        }
        if (env === 'window') {
            if (data === undefined)
                document.write('    Cannot construct convex hull from less than 3 points<br>');
            else {
                data.forEach(d => {
                    document.write(`    ${d.x}, ${d.y}<br>`);
                });
            }
        }
    }
}
exports.default = Runner;
//# sourceMappingURL=runner.js.map