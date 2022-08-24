import data from '../icecreamdata/icecream.json'

const frozenData = Object.freeze(data);

export const getGeoData = () => Object.freeze(frozenData.features.map(f => ( {
      ...f,
      coordinates: f.geometry.coordinates
    }))
 );

export function searchData(searchString)
{
  if(searchData.toString().startsWith(typeof Number)) { 
    return data.features.map(f => f.geometry.coordinates.filter(c => c.toString().includes(searchString)));
  }else{
    return data.features.filter(f => f.properties.name.includes(searchString));
  }
} 
