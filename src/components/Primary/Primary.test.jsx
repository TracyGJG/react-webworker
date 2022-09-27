import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { toUpper, Converter } from '../utilities';

jest.mock('../utilities', () => ({
	toUpper: jest.fn(text => text.toLowerCase()),
	Converter: jest.fn(() => ({
		testMessage: 'Not yet',
	})),
}));

import Primary from './Primary.jsx';

describe('Primary component', () => {
	afterEach(cleanup);

	test('can be instantiated', () => {
		render(<Primary text="Hello, World!"></Primary>);

		const componentText = screen.getByText('not yet');
		expect(componentText).toBeInTheDocument();

		screen.debug();
	});
});
