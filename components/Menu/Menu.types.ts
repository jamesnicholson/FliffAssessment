type AssetFilter = 'all' | 'stock' | 'crypto' | 'gainers' | 'losers';
type AssetSort = 'nameAsc' | 'nameDesc' | 'perfAsc' | 'perfDesc';

export interface MenuProps {
  currentFilter: AssetFilter;
  currentSort: AssetSort;
  onSort: (sortType: AssetSort) => void;
  onFilter: (filter: AssetFilter) => void;
}