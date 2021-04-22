import { render, fireEvent, waitFor } from '@testing-library/react';
import InputSearch from './InputSearch';

const setup = (props) => {
  const utils = render(<InputSearch {...props} />);
  const input = utils.getByTestId('input');
  return { input, ...utils };
};

test('It should keep a $ in front of the input', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: 'jane' } });
  expect(input.value).toBe('jane');
});

test('It should allow a $ to be in the input when the value is changed', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'janet' } })
  expect(input.value).toBe('janet')
});

test('It should allow the $ to be deleted', () => {
  const { input } = setup();
  fireEvent.change(input, { target: { value: 'jane' } });
  expect(input.value).toBe('jane')
  fireEvent.change(input, { target: { value: '' } })
  expect(input.value).toBe('')
});

test('It should allow the loading icon to be null', () => {
  const { queryAllByTestId } = setup();
  const loaders = queryAllByTestId('loader');
  expect(loaders).toHaveLength(0);
});

test('It should allow the loading icon appears on document', () => {
  const { getByTestId } = setup({ loading: true });
  const loader = getByTestId('loader');
  expect(loader).toBeInTheDocument();
});

test('It should allow a $ trigger event onChange when the input value is changed', () => {
  const onChange = (event) => { event.target.value = "changed"; };
  const { input } = setup({ onChange });
  fireEvent.change(input, { target: { value: 'janet' } });
  expect(input.value).toBe('changed');
});
