import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './components/Table';
import dataContext from './context/dataContext';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const fetchUrl = await fetch('https://swapi.dev/api/planets');
      const response = await fetchUrl.json();
      const dataResponse = await response.results;
      const removeResidents = dataResponse
        .filter((remove) => delete remove.residents);
      setData(removeResidents);
    };
    fetchData();
  }, []);

  const context = {
    data,
  };

  return (
    <dataContext.Provider value={ context }>
      <Table />
    </dataContext.Provider>
  );
}

export default App;
