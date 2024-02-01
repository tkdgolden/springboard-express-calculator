const {validate, getMean, getMedian, getMode} = require("./app");
const ExpressError = require("./expressError");

describe("validate", function() {
    it("throws error for empty query", function() {
        const request = {};
        request["query"] = {};
        expect(() => { validate(request); }).toThrow(ExpressError);
    });

    it("throws error for NaN", function() {
        const request = {};
        request["query"] = {"nums" : "1,2,foo"};
        expect(() => { validate(request); }).toThrow(ExpressError);
    });

    it("returns numsStringArray when proper inputs", function() {
        const request = {};
        request["query"] = {"nums" : "1,2,3"};
        const result = validate(request);
        expect(result).toEqual(["1", "2", "3"]);
    })
});

describe("getMean", function() {
    it("returns accurate mean", function() {
        const array = [1, 3, 5, 7];
        const result = getMean(array);
        expect(result).toEqual(4);
    });

    it("returns accurate mean with one input", function() {
        const array = [1];
        const result = getMean(array);
        expect(result).toEqual(1);
    });
});

describe("getMedian", function() {
    it("returns accurate median with even number of inputs", function() {
        const array = [1, 3, 5, 7];
        const result = getMedian(array);
        expect(result).toEqual(4);
    });

    it("returns accurate median with odd number of inputs", function() {
        const array = [1, 3, 5, 7, 9];
        const result = getMedian(array);
        expect(result).toEqual(5);
    });

    it("returns accurate median with out of order inputs", function() {
        const array = [1, 9, 3, 5 ,7];
        const result = getMedian(array);
        expect(result).toEqual(5);
    });

    it("returns accurate median with one input", function() {
        const array = [1];
        const result = getMedian(array);
        expect(result).toEqual(1);
    });

    describe("getMode", function() {
        it("returns accurate mode with same count of inputs", function() {
            const array = [1, 3, 5, 7];
            const result = getMode(array);
            expect(result).toEqual([]);
        });
    
        it("returns accurate mode with one input", function() {
            const array = [1];
            const result = getMode(array);
            expect(result).toEqual([]);
        });

        it("returns accurate mode with one mode inputs", function() {
            const array = [1, 2, 3, 3, 4];
            const result = getMode(array);
            expect(result).toEqual([3]);
        });

        it("returns accurate mode with one mode out of order inputs", function() {
            const array = [3, 1, 2, 4, 3];
            const result = getMode(array);
            expect(result).toEqual([3]);
        });

        it("returns accurate mode with two modes input", function() {
            const array = [3, 1, 2, 4, 3, 1];
            const result = getMode(array);
            expect(result).toEqual([1, 3]);
        });
    });
});