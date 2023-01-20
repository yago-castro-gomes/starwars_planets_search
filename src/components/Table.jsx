import React, { useContext } from 'react';
import dataContext from '../context/dataContext';

const myStyle = {
  color: 'white',
  backgroundColor: 'black',
};

function Table() {
  const { data } = useContext(dataContext);
  console.log(data);
  return (
    <>
      <div>Tabela</div>
      <table border="1">
        <thead style={ myStyle }>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surface Water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          { data.map((infos) => (
            <tr key={ infos.name }>
              <td>
                { infos.name }
              </td>
              <td>
                { infos.rotation_period }
              </td>
              <td>
                { infos.orbital_period }
              </td>
              <td>
                { infos.diameter }
              </td>
              <td>
                { infos.climate }
              </td>
              <td>
                { infos.gravity }
              </td>
              <td>
                { infos.terrain }
              </td>
              <td>
                { infos.surface_water }
              </td>
              <td>
                { infos.population }
              </td>
              <td>
                { infos.films }
              </td>
              <td>
                { infos.created }
              </td>
              <td>
                { infos.edited }
              </td>
              <td>
                { infos.url }
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
