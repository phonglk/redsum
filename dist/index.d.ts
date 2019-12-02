export declare type ExtractorFn = (entry: {
    [key: string]: any;
}) => number;
export declare type Extractor = ExtractorFn | string;
export interface IObjectEntry {
    [key: string]: any;
}
declare function redsum(collection: IObjectEntry[], extractor: string): number;
declare function redsum(collection: IObjectEntry[], extractor: (entry: {
    [key: string]: any;
}) => number): number;
declare function redsum(collection: IObjectEntry[], extractors: string[]): number[];
declare function redsum(collection: IObjectEntry[], extractors: Array<(entry: {
    [key: string]: any;
}) => number>): number[];
export default redsum;
