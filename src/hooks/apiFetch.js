export function apiFetch() {
  const fetchData = async () => {
    const fetchUrl = await fetch('https://swapi.dev/api/planets');
    const response = await fetchUrl.json();
    delete response.results.residents;
    const dataResponse = await response.results;
    return dataResponse;
  };

  return { fetchData };
}

export default apiFetch;
