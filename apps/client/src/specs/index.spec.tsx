import React from 'react';
import { screen } from '@testing-library/react';

import Home from '../pages/index';
import { renderWithClient } from 'test-utils/wrapper';
import { getMockUsers } from '@dpg-code-challenge/data';
import {
  MockedObserver,
  traceMethodCalls,
  IntersectionCallBack,
} from 'test-utils/mockedObserverIntersection';

const limit = 12;
describe('home page', () => {
  let observer: any;
  let mockedObserverCalls: { [k: string]: any } = {};

  beforeEach(() => {
    Object.defineProperty(window, 'IntersectionObserver', {
      writable: true,
      value: jest
        .fn()
        .mockImplementation(function TrackMock(
          cb: IntersectionCallBack,
          options: IntersectionObserverInit
        ) {
          observer = traceMethodCalls(
            new MockedObserver(cb, options),
            mockedObserverCalls
          );

          return observer;
        }),
    });
  });
  afterEach(() => {
    observer = null;
    mockedObserverCalls = {};
  });
  it('should show pages', async () => {
    renderWithClient(<Home />);
    const target = screen.getByTestId('show more');
    const cards = await screen.findAllByRole('figure');
    expect(cards).toHaveLength(1 * limit);

    const mockedObserver = observer as unknown as MockedObserver;

    const entry1 = {
      target,
      intersectionRatio: 0.7,
      isIntersecting: true,
    };
    mockedObserver.fire([entry1 as unknown as IntersectionObserverEntry]);

    await screen.findByText(getMockUsers(2, limit).items[0].login);
    expect(await screen.getAllByRole('figure')).toHaveLength(2 * limit);
  });
});
