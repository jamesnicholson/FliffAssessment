import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { Text } from 'react-native';
import HomeScreen from './Home.screen';

jest.mock('../../financial_assets.json', () => [
  {
    id: 1,
    name: 'Apple',
    type: 'stock',
    currentPrice: 150.0,
    dailyChangePercent: 2.5,
  },
  {
    id: 2,
    name: 'Bitcoin',
    type: 'crypto',
    currentPrice: 40000.0,
    dailyChangePercent: -1.0,
  },
  {
    id: 3,
    name: 'Tesla',
    type: 'stock',
    currentPrice: 700.0,
    dailyChangePercent: 3.0,
  },
  {
    id: 4,
    name: 'Ethereum',
    type: 'crypto',
    currentPrice: 3000.0,
    dailyChangePercent: -2.0,
  },
]);

jest.mock('./Home.styles', () => ({
  container: {},
}));

jest.mock('../../components/Menu/Menu.styles', () => ({
  menuWrapper: {},
  subMenu: {},
  betweenContainer: {},
  button: { backgroundColor: 'white' },
  buttonSelected: { backgroundColor: 'blue' },
  buttonText: {},
}));

jest.mock('../../components/AssetItem/AssetItem.styles', () => ({
  container: {},
  name: {},
  price: {},
  change: {},
}));

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: mockNavigate,
  }),
}));
jest.mock('../../screens/AssetDetails', () => ({
  AssetDetailScreen: () => null,
}));
jest.mock('@react-navigation/stack', () => ({
  createStackNavigator: () => ({
    Navigator: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    Screen: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  }),
}));

describe('HomeScreen', () => {
  const renderWithNavigation = () => render(<HomeScreen />);

  beforeEach(() => {
    jest.useFakeTimers();
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('renders HomeScreen with Menu and FlatList', () => {
    const { getByTestId } = renderWithNavigation();
    expect(getByTestId('home-screen')).toBeTruthy();
    expect(getByTestId('asset-list')).toBeTruthy();
    expect(getByTestId('sort-button-nameAsc')).toBeTruthy();
  });

  it('displays initial assets correctly', () => {
    const { getByText } = renderWithNavigation();
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('Tesla')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();
  });

  it('filters assets by type when filter is applied', () => {
    const { getByTestId, queryByText, getByText } = renderWithNavigation();
    fireEvent.press(getByTestId('filter-button-stock'));
    expect(getByText('Apple')).toBeTruthy(); // Stock
    expect(getByText('Tesla')).toBeTruthy(); // Stock
    expect(queryByText('Bitcoin')).toBeNull(); // Crypto
    expect(queryByText('Ethereum')).toBeNull(); // Crypto
  });

  it('sorts assets by name descending when sort is applied', () => {
    const { getByTestId, getAllByTestId } = renderWithNavigation();
    fireEvent.press(getByTestId('sort-button-nameDesc'));
    const assetItems = getAllByTestId(/asset-name/);
    const assetNames = assetItems.map(
      item => item.findByType(Text).props.children,
    );
    expect(assetNames).toEqual(['Tesla', 'Ethereum', 'Bitcoin', 'Apple']);
  });

  it('loads more assets when onEndReached is triggered', () => {
    const { getByTestId, getByText } = renderWithNavigation();
    const flatList = getByTestId('asset-list');
    fireEvent(flatList, 'onEndReached');
    expect(getByText('Ethereum')).toBeTruthy();
  });

  it('updates asset prices every 5 seconds', async () => {
    const { getByTestId, getAllByTestId } = renderWithNavigation();
    const initialPrice =
      getAllByTestId('asset-price')[0].findByType(Text).props.children;
    jest.advanceTimersByTime(5000);
    await waitFor(() => {
      const updatedPrice =
        getAllByTestId('asset-price')[0].findByType(Text).props.children;
      expect(updatedPrice).not.toBe(initialPrice);
    });
  });
});
