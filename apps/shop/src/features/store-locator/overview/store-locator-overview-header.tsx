import { FormsTile } from '../../../components/forms/tile/forms-tile';
import { STORE_LOCATOR_OVERVIEW_FEATURE } from './store-locator-overview.routes';

export interface StoreLocatorOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {STORE_LOCATOR_OVERVIEW_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_OVERVIEW_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsTile label="Items" value={count} tone="info" />
        <FormsTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
