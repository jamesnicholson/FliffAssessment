import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { AssetDetailScreen } from './AssetDetails.screen';

jest.mock('./AssetDetails.styles', () => ({
  container: {},
  item: {},
  title: {},
  itemDetail: {},
}));

jest.mock('../../components/AssetItem/AssetItem.styles', () => ({
  container: {},
  name: {},
  price: {},
  change: {},
}));

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
  useRoute: () => ({
    params: {
      asset: {
        id: 1,
        name: 'Apple',
        symbol: 'AAPL',
        type: 'stock',
        currentPrice: 150.0,
        dailyChangePercent: 2.5,
      },
      similarAssets: [
        {
          id: 2,
          name: 'Microsoft',
          symbol: 'MSFT',
          type: 'stock',
          currentPrice: 300.0,
          dailyChangePercent: 1.5,
        },
        {
          id: 3,
          name: 'Tesla',
          symbol: 'TSLA',
          type: 'stock',
          currentPrice: 700.0,
          dailyChangePercent: 3.0,
        },
      ],
    },
  }),
}));

describe('AssetDetailScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  const screen = render(
    <AssetDetailScreen
      route={{
        params: {
          asset: {
            id: 0,
            name: 'Apple',
            symbol: 'A',
            type: 'stock',
            currentPrice: 150,
            dailyChangePercent: 2.5,
          },
          similarAssets: [
            {
              id: 1,
              name: 'Microsoft',
              symbol: 'MSFT',
              type: 'stock',
              currentPrice: 300.0,
              dailyChangePercent: 1.5,
            },
            {
              id: 2,
              name: 'Tesla',
              symbol: 'TSLA',
              type: 'stock',
              currentPrice: 700.0,
              dailyChangePercent: 3.0,
            },
          ],
        },
      }}
    />,
  );
  it('renders asset details correctly', () => {
    const { getByText } = screen;
    expect(getByText('Apple')).toBeTruthy();
    expect(getByText('Symbol: A')).toBeTruthy();
    expect(getByText('Type: stock')).toBeTruthy();
    expect(getByText('Current Price: 150')).toBeTruthy();
    expect(getByText('Daily Change %: 2.5')).toBeTruthy();
  });
});
