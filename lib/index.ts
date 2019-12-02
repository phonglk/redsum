export type ExtractorFn = (entry: { [key: string]: any }) => number;
export type Extractor = ExtractorFn | string;
export interface IObjectEntry {
  [key: string]: any;
}

/* tslint:disable:unified-signatures */
function redsum(collection: IObjectEntry[], extractor: string): number;
function redsum(collection: IObjectEntry[], extractor: (entry: { [key: string]: any }) => number): number;
function redsum(collection: IObjectEntry[], extractors: string[]): number[];
function redsum(collection: IObjectEntry[], extractors: Array<(entry: { [key: string]: any }) => number>): number[];
/* tslint:enable:unified-signatures */
function redsum(collection: IObjectEntry[], extractorsParam: Extractor | Extractor[]) {
  if (!Array.isArray(collection)) {
    throw new Error('first parameter must be an array');
  }
  const extractors: Extractor[] = ([] as Extractor[]).concat(extractorsParam);
  const extractFns: ExtractorFn[] = extractors.map(extractor => {
    if (typeof extractor === 'function') {
      return extractor;
    }
    const accessKey: string = extractor;
    const extractorFn = (entry: IObjectEntry) => entry[accessKey];
    return extractorFn;
  });
  const initialCounts = [...new Array<number>(extractFns.length)].map(() => 0);
  const total = collection.reduce<number[]>(
    (counts, entry: IObjectEntry) => counts.map((prev, i) => prev + extractFns[i](entry)),
    initialCounts,
  );
  if (extractFns.length === 1) {
    return total[0];
  } // if there is only one sum, then return it
  return total;
}

export default redsum;
declare var module: any;
module.exports = redsum;
