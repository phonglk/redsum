"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function redsum(collections, extractorsParam) {
    if (!Array.isArray(collections))
        throw new Error('first parameter must be an array');
    const extractors = [].concat(extractorsParam);
    const extractFns = extractors
        .map(extractor => {
        if (typeof extractor === 'function')
            return extractor;
        const accessKey = extractor;
        const extractorFn = (entry) => entry[accessKey];
        return extractorFn;
    });
    const initialCounts = [...new Array(extractFns.length)].map(() => 0);
    const total = collections
        .reduce((counts, entry) => counts.map((prev, i) => prev + extractFns[i](entry)), initialCounts);
    if (extractFns.length === 1)
        return total[0]; // if there is only one sum, then return it
    return total;
}
// sum.extractNested = (key, extractors) => entry => sum(entry[key], extractors)
// sum.getLengthOf = key => entry => entry[key].length
exports.default = redsum;
