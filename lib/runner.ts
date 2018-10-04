// import TestFileReader from './testFileReader';
import Tests from '../test-files-ts/index';
import ConvexHull from './convex-hull/index';
import { IPoint } from './convex-hull/point';

interface TestObject {
  name : string,
  data : Array<string>
}

export default class Runner {
  runTests () {
    Tests.forEach(test => {
      this.runTest(test);
    });
  }

  processTestFile (fileData : Array<string>) {
    return fileData.map(d => d.split(' ').map(n => parseInt(n)))
  }

  runTest (testFile: TestObject) {
    // const data = await new TestFileReader(testFile).readFile();
    const data = this.processTestFile(testFile.data);
    const answer = new ConvexHull(data).computeConvexHull();
    this.printTestResults(testFile.name, data, answer);
  }

  printTestResults (testFile:string, testData:Array<Array<number>>, testAnswer:Array<IPoint>|undefined) {
    console.log(`Calculating Convex Hull for ${testFile}:\n`)
    this.printTestFile('node', testData);
    console.log('\n  Convex Hull: \n')
    this.printAnswer('node', testAnswer);
    console.log('\n--------------------------------------\n\n')
    if (typeof <any>window !== 'undefined') {
      document.write(`Calculating Convex Hull for ${testFile}:<br>`)
      this.printTestFile('window', testData);
      document.write('<br>  Convex Hull: <br>')
      this.printAnswer('window', testAnswer);
      document.write('<br>--------------------------------------<br><br>')
      document.body.style.whiteSpace = 'pre'
    }
  }

  printTestFile (env:string, data: Array<Array<number>>) {
    data.forEach(d => {
      console.log(`    ${d.join(', ')}`)
    })
    if (env === 'window') {
      data.forEach(d => {
        document.write(`    ${d.join(', ')}<br>`)
      })
    }
  }

  printAnswer (env:string, data: Array<IPoint> | undefined) {
    if (data === undefined) console.log('    Cannot construct convex hull from less than 3 points');
    else {
      data.forEach(d => {
        console.log(`    ${d.x}, ${d.y}`)
      })
    }
    if (env === 'window') {
      if (data === undefined) document.write('    Cannot construct convex hull from less than 3 points<br>');
      else {
        data.forEach(d => {
          document.write(`    ${d.x}, ${d.y}<br>`)
        })
      }
    }
  }
}
