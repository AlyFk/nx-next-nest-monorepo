import React from 'react';
import { render, screen } from '@testing-library/react';
import SearchBar from '../SearchBar';
import userEvent from '@testing-library/user-event';

test('should searchbar works with click and enter', async () => {
  const handleSubmit = jest.fn();
  render(<SearchBar onSubmit={handleSubmit} />);
  const searchText = 'react';
  const input = screen.getByPlaceholderText(/search username.../i);
  await userEvent.type(input, searchText);
  await userEvent.click(screen.getByRole('button', { name: /submit/i }));
  expect(handleSubmit).toHaveBeenCalledWith(searchText);

  const searchText2 = 'js';
  await userEvent.clear(input);
  await userEvent.type(input, searchText2);
  await userEvent.type(input, '{enter}');
  expect(handleSubmit).toHaveBeenCalledWith(searchText2);
  expect(handleSubmit).toHaveBeenCalledTimes(2);
});
