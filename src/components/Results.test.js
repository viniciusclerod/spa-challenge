import { render } from '@testing-library/react';
import Results from './Results';
import users from '../mocks/users.json';

const setup = (props) => {
  const utils = render(<Results {...props} />);
  const results = utils.getByTestId('results');
  return { results, ...utils };
};

test('It should allow the no result message to be null', () => {
  const { queryAllByTestId } = setup();
  const noResults = queryAllByTestId('no-results');
  expect(noResults).toHaveLength(0);
});

test('It should allow the no result message appears on document', () => {
  const { getByTestId } = setup({ noResults: true });
  const noResult = getByTestId('no-results');
  expect(noResult).toBeInTheDocument();
});

test('It should allow the empty list', () => {
  const { queryAllByTestId } = setup({ data: [] });
  const items = queryAllByTestId('item');
  expect(items).toHaveLength(0);
});

test('It should allow the list with 2 items', () => {
  const size = 2;
  const { queryAllByTestId } = setup({ data: users.slice(0, size) });
  const items = queryAllByTestId('item');
  expect(items).toHaveLength(size);
});
