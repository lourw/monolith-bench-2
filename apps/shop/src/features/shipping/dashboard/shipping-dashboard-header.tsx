import { FeedbackBadge } from '../../../components/feedback/badge/feedback-badge';
import { SHIPPING_DASHBOARD_FEATURE } from './shipping-dashboard.routes';

export interface ShippingDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ShippingDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ShippingDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SHIPPING_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SHIPPING_DASHBOARD_FEATURE.domain} ·{' '}
          {SHIPPING_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackBadge label="Items" value={count} tone="info" />
        <FeedbackBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SHIPPING_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
