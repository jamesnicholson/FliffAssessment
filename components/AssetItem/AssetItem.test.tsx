import { render, screen, fireEvent } from '@testing-library/react-native';
import React from 'react';
import AssetItem from './AssetItem';
import { AssetProps } from './AssetItem.type';

jest.mock('./AssetItem.styles', () => ({
  assetContainer: {},
  assetLabel: {},
  assetValue: {},
  symbol: {},
  symbolText: {},
}));

describe('AssetItem', () => {
  const mockOnPress = jest.fn();
  const defaultProps: AssetProps = {
    asset: {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      type: 'crypto',
      currentPrice: 50000,
      dailyChangePercent: 2.5,
    },
    onPress: mockOnPress,
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly with provided props', () => {
    render(<AssetItem {...defaultProps} />);

    expect(screen.getByText('Bitcoin')).toBeOnTheScreen();
    expect(screen.getByText('BTC')).toBeOnTheScreen();
    expect(screen.getByText('DPC: 2.5')).toBeOnTheScreen();
    expect(screen.getByText('Asset Price: 50000')).toBeOnTheScreen();
  });

  it('renders correctly with different asset data', () => {
    const differentProps: AssetProps = {
      asset: {
        id: 2,
        name: 'Ethereum',
        symbol: 'ETH',
        type: 'crypto',
        currentPrice: 3000,
        dailyChangePercent: -1.2,
      },
      onPress: mockOnPress,
    };

    render(<AssetItem {...differentProps} />);

    expect(screen.getByText('Ethereum')).toBeOnTheScreen();
    expect(screen.getByText('ETH')).toBeOnTheScreen();
    expect(screen.getByText('DPC: -1.2')).toBeOnTheScreen();
    expect(screen.getByText('Asset Price: 3000')).toBeOnTheScreen();
  });

  it('displays different asset types correctly', () => {
    const stockProps: AssetProps = {
      asset: {
        id: 3,
        name: 'Apple',
        symbol: 'AAPL',
        type: 'stock',
        currentPrice: 150.75,
        dailyChangePercent: 0.8,
      },
    };

    render(<AssetItem {...stockProps} />);

    expect(screen.getByText('Apple')).toBeOnTheScreen();
    expect(screen.getByText('AAPL')).toBeOnTheScreen();
    expect(screen.getByText('DPC: 0.8')).toBeOnTheScreen();
    expect(screen.getByText('Asset Price: 150.75')).toBeOnTheScreen();
  });
});
