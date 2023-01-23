import React, { useContext, useEffect, useState } from 'react';
import dataContext from '../context/dataContext';

const myStyle = {
  color: 'white',
  backgroundColor: 'black',
};

function Table() {
  const [searchName, setSearchName] = useState('');
  const [category, setCategory] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtred, setFiltred] = useState([]);

  const { data } = useContext(dataContext);
  useEffect(() => setFiltred(data), [data]);

  const filtredName = data.filter((dat) => dat.name.includes(searchName));

  useEffect(() => setFiltred(filtredName), [searchName]);

  const filterCategory = () => {
    if (comparison === 'maior que') {
      const highThan = data.filter((cat) => (+cat[category]) > valueFilter);
      setFiltred(highThan);
    }
    if (comparison === 'menor que') {
      const highThan = data.filter((cat) => (+cat[category]) < valueFilter);
      setFiltred(highThan);
    }
    if (comparison === 'igual a') {
      const highThan = data.filter((cat) => (cat[category]) === valueFilter);
      setFiltred(highThan);
    }
    if (valueFilter === '') {
      setFiltred(data);
    }
  };

  return (
    <>
      <label htmlFor="category">
        <select
          data-testid="column-filter"
          name="category"
          onChange={ (e) => setCategory(e.target.value) }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
      </label>
      <label htmlFor="comparison">
        <select
          data-testid="comparison-filter"
          name="comparison"
          onChange={ (e) => setComparison(e.target.value) }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
      </label>
      <label htmlFor="valuefilter">
        <input
          type="text"
          data-testid="value-filter"
          name="valuefilter"
          value={ valueFilter }
          onChange={ (e) => setValueFilter(e.target.value) }
        />
      </label>
      <button
        data-testid="button-filter"
        onClick={ filterCategory }
      >
        Pesquisar

      </button>
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
          { filtred.map((infos) => (
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
