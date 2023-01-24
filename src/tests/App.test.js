import React, { useContext } from 'react';
import { render, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { mockPlanets } from './mocks';
import { act } from 'react-dom/test-utils';
import Table from '../components/Table';

describe('Testa aplicalçao' , () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockPlanets)
    })
  })

  afterEach(() => {
    jest.clearAllMocks();
  })


  test('Testando inputs', async () => {
  await act(() => render(<App />));
  const categoryInput = screen.getByTestId('column-filter', {name:/population/i});
  const comparissonInput = screen.getByTestId('comparison-filter', {name:/maior que/i});
  const valueInput = screen.getByTestId('value-filter', {value: 0});
  const searchInput = screen.getByRole('button', { name: /pesquisar/i})
  const searchText = screen.getByText(/busca por nome/i)
  const nameInput = screen.getByTestId('name-filter');
  const ascInput = screen.getByText(/ascendente/i)
  const descInput = screen.getByText(/descendente/i)
  const sortInput = screen.getByRole('button', {name: /ordenar/i})
  const removeFilters = screen.getByRole('button', {name: /remover todos os filtros/i})
  const ascRadio = screen.getByTestId('column-sort-input-asc')
  const descRadio = screen.getByTestId('column-sort-input-desc')
  expect(categoryInput).toBeInTheDocument();
  expect(comparissonInput).toBeInTheDocument();
  expect(valueInput).toBeInTheDocument();
  expect(searchInput).toBeInTheDocument();
  expect(searchText).toBeInTheDocument();
  expect(nameInput).toBeInTheDocument();
  expect(ascInput).toBeInTheDocument();
  expect(descInput).toBeInTheDocument();
  expect(sortInput).toBeInTheDocument();
  expect(removeFilters).toBeInTheDocument();
  expect(ascRadio).toBeInTheDocument()
  expect(descRadio).toBeInTheDocument()

  userEvent.type(nameInput, 'oo')
  expect(nameInput).toHaveValue('oo');
});

test('testando a API', async () => {
 await act(() => render(<App />));
 const table = await screen.getByRole('table');
 expect(table).toBeInTheDocument();
 
 const allPlanets = await screen.findAllByTestId("planet-name");
 expect(allPlanets).toHaveLength(10);
 const onlyPlanet = await screen.findByText('Naboo')
 expect(onlyPlanet).toBeInTheDocument();
 const searchInput = screen.getByTestId('button-filter')
 expect(searchInput).toBeInTheDocument();
 userEvent.click(searchInput);
 await expect(await screen.findAllByTestId("planet-name")).toHaveLength(8);
 const categoryInput = screen.getByTestId('column-filter')
 userEvent.selectOptions(categoryInput, 'surface_water')
 userEvent.click(searchInput);
 await expect(await screen.findAllByTestId("planet-name")).toHaveLength(6);
 const removeAllFilters = screen.getByRole('button', {
  name: /remover todos os filtros/i
})
userEvent.click(removeAllFilters)
await expect(await screen.findAllByTestId("planet-name")).toHaveLength(10);
const comparissonInput = screen.getByTestId('comparison-filter')
userEvent.selectOptions(comparissonInput, 'menor que');
const valueInput = screen.getByTestId('value-filter')
userEvent.type(valueInput, '10000');
userEvent.click(searchInput);
await expect(await screen.findAllByTestId("planet-name")).toHaveLength(1);
})
})

