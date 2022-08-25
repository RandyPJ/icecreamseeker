import data from '../icecreamdata/icecream.json'

const frozenData = Object.freeze(data);

export const getGeoData = () => Object.freeze(frozenData.features.map(f => ( {
      ...f,
      coordinates: f.geometry.coordinates
    }))
 );

export function searchData(searchString)
{
  return getGeoData().filter((d) => {
    return (
      d.properties.name
        .toLowerCase()
        .includes(searchString.value.toLowerCase()) ||
      d.coordinates.toString().includes(searchString.value.toLowerCase())
    );
  });
} 
