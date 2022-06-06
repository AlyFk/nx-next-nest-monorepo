import UserCard from '../UserCard';
import { screen, render } from '@testing-library/react';
import { getMockUsers } from '@dpg-code-challenge/data';
test('should render information in the card', () => {
  const { id, login, avatar_url } = getMockUsers(1, 1).items[0];

  render(<UserCard id={id} login={login} avatar_url={avatar_url} />);

  expect(screen.getByText(login)).toBeInTheDocument();
  expect(screen.getByText(`User ID: ${id}`)).toBeInTheDocument();
  expect(screen.getByAltText(`avatar-${login}`)).toBeInTheDocument();
});
