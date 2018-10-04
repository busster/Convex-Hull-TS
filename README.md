Jason Buss
CSC-421
Programming Assignment - Convex Hull

Url: https://github.com/busster/Convex-Hull-TS

Getting Started:

`git clone https://github.com/busster/Convex-Hull-TS.git`

`cd Convex-Hull-TS`

This solution was written in Typescript and compiled to Javascript (CommonJs and RequireJs) and can either be run in a node environment, or in the browser. Note: the `.ts` files have already been compiled, you do not need to do this.

The source code is all under the `lib/` directory, and the main class can be found at `lib/convex-hull/index.ts`

If you have Node installed (I'm running v10.9.0) you can simply navigate to the root directory and run the script `npm test`. This just runs `node dist/lib/index.js`.

If you do not, then you can simply open the `index.html` file in the root directory your browser. The test cases will write to the document and the Developer Tools Console.

All of the test files will run sequentially in whichever environment you choose, no input is required.
