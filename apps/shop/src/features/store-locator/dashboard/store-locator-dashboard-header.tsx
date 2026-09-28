import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import { STORE_LOCATOR_DASHBOARD_FEATURE } from './store-locator-dashboard.routes';

export interface StoreLocatorDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {STORE_LOCATOR_DASHBOARD_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_DASHBOARD_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutChip label="Items" value={count} tone="info" />
        <LayoutChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
