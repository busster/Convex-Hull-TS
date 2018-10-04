var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "./runner"], function (require, exports, runner_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    runner_1 = __importDefault(runner_1);
    const runner = new runner_1.default();
    runner.runTests();
});
