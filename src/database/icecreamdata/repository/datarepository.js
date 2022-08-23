import fileSystem from 'fs'
import path from 'path'

let geoJsonFileExt = '.geojson';
let root = ".."

const cities = fileSystem
  .readdirSync(root)
  .filter((filename) => filename.endsWith(geoJsonFileExt))
  .map((filename) => path.basename(filename, geoJsonFileExt));


const getCityGeoJSON = (city) => path.resolve(root, city + geoJsonFileExt);

export {
  cities,
  getCityGeoJSON
}



