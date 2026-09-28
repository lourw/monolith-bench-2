import { OverlayBadge } from '../../../components/overlay/badge/overlay-badge';
import { ORDERS_DASHBOARD_FEATURE } from './orders-dashboard.routes';

export interface OrdersDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function OrdersDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: OrdersDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ORDERS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ORDERS_DASHBOARD_FEATURE.domain} · {ORDERS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayBadge label="Items" value={count} tone="info" />
        <OverlayBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ORDERS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
