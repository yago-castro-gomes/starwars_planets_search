import React, { useContext, useState } from 'react';
import dataContext from '../context/dataContext';

const myStyle = {
  color: 'white',
  backgroundColor: 'black',
};

function Table() {
  const [searchName, setSearchName] = useState('');
  const { data } = useContext(dataContext);

  const filtredName = data.filter((dat) => dat.name.includes(searchName));
  return (
    <>
      <label htmlFor="searchingname">
        Busca por nome
        <input
          data-testid="name-filter"
          name="searchingname"
          type="text"
          placeholder="Digite o nome de um planeta"
          onChange={ (e) => setSearchName(e.target.value) }
          value={ searchName }
        />
      </label>
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
          { filtredName.map((infos) => (
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
