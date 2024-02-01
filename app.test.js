const { describe, it } = require("node:test");
const {validate, getMean, getMedian, getMode} = require("./app");
const ExpressError = require("./expressError");

// describe("validate", function() {
//     it("throws error for empty query", function() {
//         const request = {};
//         request["query"] = {};
//         const t = validate(request);
//         expect(t).toThrow();
//     });
// });

describe("getMean", function() {
    it("returns accurate mean", function() {
        const array = [1, 3, 5 ,7];
        const result = getMean(array);
        expect(result).toEqual(4);
    });
});