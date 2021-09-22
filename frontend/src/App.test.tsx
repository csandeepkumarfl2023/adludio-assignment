import 'babel-polyfill'
import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

jest.mock("./services/user.service", () => {
  return {
    createUserService: jest.fn(() => Promise.resolve({user: {id: 1, deviceId: "123"}}))
  };
});
jest.mock("./services/order.service", () => {
  return {
    getAllOrdersService: jest.fn(() => Promise.resolve({status: 200, data: {order: []}}))
  };
});


test('renders warm welcome', () => {
  const { getByText } = render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = getByText(/Get Started/i);
  expect(linkElement).toBeInTheDocument();
});
