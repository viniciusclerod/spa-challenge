import { fireEvent, render, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Search from './Search';

const setup = async () => {
  const utils = render(<Search />);
  const { search, input, results } = await waitFor(() => {
    const search = utils.getByTestId('search');
    const input = utils.getByTestId('input');
    const results = utils.getByTestId('results');
    return { search, input, results };
  });
  return { search, input, results, ...utils };
};

const waitTime = async (time = 1000) => {
  return new Promise((r) => setTimeout(r, time));
};

test('It should allow the Search Component appears on document', async () => {
  const { search, input, results } = await waitFor(setup);
  expect(search).toBeInTheDocument();
  expect(input).toBeInTheDocument();
  expect(results).toBeInTheDocument();
});

test('It should allow typing on input search', async () => {
  const { input, queryAllByTestId } = await waitFor(setup);
  fireEvent.change(input, { target: { value: 'jane' } });
  expect(input.value).toBe('jane');
  await act(waitTime);
  await waitFor(() => {
    const items = queryAllByTestId('item');
    expect(items).toHaveLength(2);
  });
});

test('It should allow change value on input search', async () => {
  const { input, queryAllByTestId } = await waitFor(setup);
  fireEvent.change(input, { target: { value: 'jan' } });
  expect(input.value).toBe('jan');
  await act(waitTime);
  await waitFor(() => {
    const items = queryAllByTestId('item');
    expect(items).toHaveLength(3);
  });
  fireEvent.change(input, { target: { value: 'jane' } });
  expect(input.value).toBe('jane');
  await act(waitTime);
  await waitFor(() => {
    const items = queryAllByTestId('item');
    expect(items).toHaveLength(2);
  });
});

test('It should allow empty value on input search', async () => {
  const { input, queryAllByTestId, getByTestId } = await waitFor(setup);
  fireEvent.change(input, { target: { value: 'jan' } });
  expect(input.value).toBe('jan');
  await act(waitTime);
  await waitFor(() => {
    const items = queryAllByTestId('item');
    expect(items).toHaveLength(3);
  });
  fireEvent.change(input, { target: { value: '' } });
  expect(input.value).toBe('');
  await act(waitTime);
  await waitFor(() => {
    const items = queryAllByTestId('item');
    expect(items).toHaveLength(0);
    const noResults = queryAllByTestId('no-results');
    expect(noResults).toHaveLength(0);
  });
});

test('It should allow empty value on input search', async () => {
  const { input, queryAllByTestId, getByTestId } = await waitFor(setup);
  fireEvent.change(input, { target: { value: 'janete' } });
  expect(input.value).toBe('janete');
  await act(waitTime);
  await waitFor(() => {
    const items = queryAllByTestId('item');
    expect(items).toHaveLength(0);
    const noResult = getByTestId('no-results');
    expect(noResult).toBeInTheDocument();
  });
});
