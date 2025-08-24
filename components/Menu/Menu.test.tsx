import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Menu from './Menu';

jest.mock('./Menu.styles', () => ({
  menuWrapper: {},
  subMenu: {},
  betweenContainer: {},
  button: { backgroundColor: 'white' },
  buttonSelected: { backgroundColor: 'blue' },
  buttonText: {},
}));

describe('Menu Component', () => {
  it('renders sort and filter options correctly', () => {
    const mockOnSort = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByText } = render(
      <Menu
        currentSort="nameAsc"
        currentFilter="all"
        onSort={mockOnSort}
        onFilter={mockOnFilter}
      />,
    );

    expect(getByText('Name (a-z)')).toBeTruthy();
    expect(getByText('Name (z-a)')).toBeTruthy();
    expect(getByText('Price ▲')).toBeTruthy();
    expect(getByText('Price ▼')).toBeTruthy();

    expect(getByText('All')).toBeTruthy();
    expect(getByText('Stock')).toBeTruthy();
    expect(getByText('Crypto')).toBeTruthy();
    expect(getByText('Top Gainers')).toBeTruthy();
    expect(getByText('Top Losers')).toBeTruthy();
  });

  it('calls onSort when a sort button is pressed', () => {
    const mockOnSort = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByText } = render(
      <Menu
        currentSort="nameAsc"
        currentFilter="all"
        onSort={mockOnSort}
        onFilter={mockOnFilter}
      />,
    );

    const sortButton = getByText('Name (z-a)');
    fireEvent.press(sortButton);

    expect(mockOnSort).toHaveBeenCalledWith('nameDesc');
  });

  it('calls onFilter when a filter button is pressed', () => {
    const mockOnSort = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByText } = render(
      <Menu
        currentSort="nameAsc"
        currentFilter="all"
        onSort={mockOnSort}
        onFilter={mockOnFilter}
      />,
    );

    const filterButton = getByText('Crypto');
    fireEvent.press(filterButton);

    expect(mockOnFilter).toHaveBeenCalledWith('crypto');
  });

  it('applies selected style to the current sort option', () => {
    const mockOnSort = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByTestId } = render(
      <Menu
        currentSort="perfDesc"
        currentFilter="all"
        onSort={mockOnSort}
        onFilter={mockOnFilter}
      />,
    );

    const selectedButton = getByTestId('sort-button-perfDesc');
    expect(selectedButton).toHaveStyle({ backgroundColor: 'blue' });
  });

  it('applies selected style to the current filter option', () => {
    const mockOnSort = jest.fn();
    const mockOnFilter = jest.fn();

    const { getByTestId } = render(
      <Menu
        currentSort="nameAsc"
        currentFilter="stock"
        onSort={mockOnSort}
        onFilter={mockOnFilter}
      />,
    );

    const selectedButton = getByTestId('filter-button-stock');
    expect(selectedButton).toHaveStyle({ backgroundColor: 'blue' });
  });
});
