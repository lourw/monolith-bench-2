import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import { CART_DASHBOARD_FEATURE } from './cart-dashboard.routes';

export interface CartDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CartDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CartDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CART_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CART_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CART_DASHBOARD_FEATURE.domain} · {CART_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackStat label="Items" value={count} tone="info" />
        <FeedbackStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CART_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
