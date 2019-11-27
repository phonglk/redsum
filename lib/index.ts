export type ExtractorFn = (entry: {[key: string]: any}) => number
export type Extractor = ExtractorFn | string
export type ObjectEntry = {
  [key: string]: any
}
function redsum(collection: Array<ObjectEntry>, extractor: string) : number
function redsum(collection: Array<ObjectEntry>, extractor: (entry: {[key: string]: any}) => number) : number
function redsum(collection: Array<ObjectEntry>, extractors: Array<string>) : number[]
function redsum(collection: Array<ObjectEntry>, extractors: Array<(entry: {[key: string]: any}) => number>) : number[]
function redsum(collection: Array<ObjectEntry>, extractorsParam: Extractor | Array<Extractor>) {
  if (!Array.isArray(collection)) throw new Error('first parameter must be an array')
  const extractors: Array<Extractor> = ([] as Array<Extractor>).concat(extractorsParam)
  const extractFns: Array<ExtractorFn> = extractors
    .map(extractor => {
      if (typeof extractor === 'function') return extractor
      const accessKey: string = extractor
      const extractorFn = (entry: ObjectEntry) => entry[accessKey]
      return extractorFn
    })
  const initialCounts = [...new Array<number>(extractFns.length)].map(() => 0)
  const total = collection
    .reduce<Array<number>>((counts, entry: ObjectEntry) => 
      counts.map((prev, i) => prev + extractFns[i](entry)),
    initialCounts)
  if (extractFns.length === 1) return total[0] // if there is only one sum, then return it
  return total
}

export default redsum;