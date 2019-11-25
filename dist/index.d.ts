export declare type ExtractorFn = (entry: {
    [key: string]: any;
}) => number;
export declare type Extractor = ExtractorFn | string;
export declare type ObjectEntry = {
    [key: string]: any;
};
declare function redsum(collections: Array<Object>, extractor: string): number;
declare function redsum(collections: Array<Object>, extractor: (entry: {
    [key: string]: any;
}) => number): number;
declare function redsum(collections: Array<Object>, extractors: Array<string>): number[];
declare function redsum(collections: Array<Object>, extractors: Array<(entry: {
    [key: string]: any;
}) => number>): number[];
export default redsum;
