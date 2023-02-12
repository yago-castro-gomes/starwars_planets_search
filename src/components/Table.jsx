import React, { useContext, useEffect, useState } from 'react';
import dataContext from '../context/dataContext';
import { myStyle, arrayOptions, arraySort } from '../helpers';

function Table() {
  const [searchName, setSearchName] = useState('');
  const [category, setCategory] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [valueFilter, setValueFilter] = useState(0);
  const [filtred, setFiltred] = useState([]);
  const [filterShowing, setFilterShowing] = useState([]);
  const [optionsKeys, setOptionsKeys] = useState([]);
  const [lastState, setLastState] = useState([]);
  const [sortCategory, setSortCategory] = useState('population');
  const [sortInput, setSortInput] = useState('');

  const { data } = useContext(dataContext);
  const filtredName = data.filter((dat) => dat.name.includes(searchName));
  useEffect(() => setFiltred(data), [data]);
  useEffect(() => setOptionsKeys(arrayOptions), []);
  useEffect(() => setFiltred(filtredName), [searchName]);

  const showFilter = {
    column: category,
    comparison,
    value: valueFilter,
  };
  const filterCategory = () => {
    setLastState((prevstate) => [...prevstate, filtred]);
    if (comparison === 'maior que') {
      const highThan = data.filter((cat) => (+cat[category]) > valueFilter);
      setFilterShowing((prevstate) => [...prevstate, showFilter]);
      setFiltred(highThan);
      if (highThan.length > 1) {
        const highTwo = filtred.filter((cat) => (+cat[category]) > valueFilter);
        setFiltred(highTwo);
      }
    }
    if (comparison === 'menor que') {
      const highThan = data.filter((cat) => (+cat[category]) < valueFilter);
      setFilterShowing((prevstate) => [...prevstate, showFilter]);
      setFiltred(highThan);
      if (highThan.length > 1) {
        const highTwo = filtred.filter((cat) => (+cat[category]) < valueFilter);
        setFiltred(highTwo);
      }
    }
    if (comparison === 'igual a') {
      const highThan = data.filter((cat) => (cat[category]) === valueFilter);
      setFilterShowing((prevstate) => [...prevstate, showFilter]);
      setFiltred(highThan);
      if (highThan.length > 1) {
        const highTwo = filtred.filter((cat) => (cat[category]) === valueFilter);
        setFiltred(highTwo);
      }
    }
    if (valueFilter === '') {
      setFiltred(data);
    }
    const removeArray = optionsKeys.filter((cat) => cat !== category);
    setOptionsKeys(removeArray);
    setCategory(removeArray[0]);
  };
  const removeAllFilters = () => {
    setFiltred(data);
    setOptionsKeys(arrayOptions);
    setCategory('population');
    setFilterShowing([]);
    setValueFilter(0);
  };
  const removeSelectedFilter = () => {
    const anyLess = lastState.pop();
    setFiltred(anyLess);
    const filterPop = filterShowing.pop();
    console.log(filterPop);
    setOptionsKeys(filterPop);
  };

  const sortButton = () => {
    const MAGICNUMBER = -1;
    if (sortInput === 'ASC') {
      const ascFiltred = filtred.filter((asc) => (asc[sortCategory]))
        .sort((a, b) => {
          if (a[sortCategory] === 'unknown') return 1;
          if (b[sortCategory] === 'unknown') return MAGICNUMBER;
          return +a[sortCategory] - +b[sortCategory];
        });
      setFiltred(ascFiltred);
    }
    if (sortInput === 'DESC') {
      const descFiltred = filtred.filter((asc) => (asc[sortCategory]))
        .sort((a, b) => {
          if (a === 'unknown') return 1;
          if (b === 'unknown') return MAGICNUMBER;
          return +b[sortCategory] - +a[sortCategory];
        });
      setFiltred(descFiltred);
    }
  };

  console.log(sortInput);
  return (
    <>
      <label htmlFor="category">
        <select
          data-testid="column-filter"
          name="category"
          onChange={ (e) => setCategory(e.target.value) }
        >
          { optionsKeys.map((opt) => ((
            <option key={ opt } value={ opt }>
              { opt }
            </option>
          )))}
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
        onClick={ () => filterCategory() }
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
      <label htmlFor="ascdesc">
        <select
          data-testid="column-sort"
          name="ascdesc"
          onChange={ (e) => setSortCategory(e.target.value) }
        >
          { arraySort.map((opt) => ((
            <option key={ opt } value={ opt }>
              { opt }
            </option>
          )))}
        </select>
      </label>
      <label htmlFor="inputSort">
        Ascendente
        <input
          id="inputSortAsc"
          type="radio"
          data-testid="column-sort-input-asc"
          value="ASC"
          name="radiosort"
          onChange={ (e) => setSortInput(e.target.value) }
        />
      </label>
      <label htmlFor="inputSortDesc">
        Descendente
        <input
          name="radiosort"
          id="inputSortDesc"
          type="radio"
          data-testid="column-sort-input-desc"
          value="DESC"
          onChange={ (e) => setSortInput(e.target.value) }
        />
      </label>
      <button data-testid="column-sort-button" onClick={ sortButton }> Ordenar </button>
      <div>
        { filterShowing.map((show, i) => (
          <div key={ i } data-testid="filter">
            { show.column }
            { show.comparison }
            { show.value }
            <button onClick={ removeSelectedFilter }>delete</button>
          </div>
        )) }
      </div>
      <button
        data-testid="button-remove-filters"
        onClick={ removeAllFilters }
      >
        Remover todos os filtros
      </button>
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
              <td data-testid="planet-name">{ infos.name }</td>
              <td>{ infos.rotation_period }</td>
              <td>{ infos.orbital_period }</td>
              <td>{ infos.diameter }</td>
              <td>{ infos.climate }</td>
              <td>{ infos.gravity }</td>
              <td>{ infos.terrain }</td>
              <td>{ infos.surface_water }</td>
              <td>{ infos.population }</td>
              <td>{ infos.films }</td>
              <td>{ infos.created }</td>
              <td>{ infos.edited }</td>
              <td>{ infos.url }</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
export default Table;
