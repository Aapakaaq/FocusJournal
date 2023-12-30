
import {describe} from '@jest/globals';
describe("Test", () => {
    type Int = number & { __int__: void };
    const test: Int = 5 as Int;
})
