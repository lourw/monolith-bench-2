import { CoreTile } from '../../../components/core/tile/core-tile';
import { STORE_LOCATOR_LIST_FEATURE } from './store-locator-list.routes';

export interface StoreLocatorListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorListHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{STORE_LOCATOR_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_LIST_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreTile label="Items" value={count} tone="info" />
        <CoreTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
