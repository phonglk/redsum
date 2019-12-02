"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:enable:unified-signatures */
function redsum(collection, extractorsParam) {
    if (!Array.isArray(collection)) {
        throw new Error('first parameter must be an array');
    }
    var extractors = [].concat(extractorsParam);
    var extractFns = extractors.map(function (extractor) {
        if (typeof extractor === 'function') {
            return extractor;
        }
        var accessKey = extractor;
        var extractorFn = function (entry) { return entry[accessKey]; };
        return extractorFn;
    });
    var initialCounts = __spreadArrays(new Array(extractFns.length)).map(function () { return 0; });
    var total = collection.reduce(function (counts, entry) { return counts.map(function (prev, i) { return prev + extractFns[i](entry); }); }, initialCounts);
    if (extractFns.length === 1) {
        return total[0];
    } // if there is only one sum, then return it
    return total;
}
exports.default = redsum;
module.exports = redsum;
