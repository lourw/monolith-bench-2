import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import { CHECKOUT_DASHBOARD_FEATURE } from './checkout-dashboard.routes';

export interface CheckoutDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_DASHBOARD_FEATURE.domain} ·{' '}
          {CHECKOUT_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingCard label="Items" value={count} tone="info" />
        <MarketingCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CHECKOUT_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
