import { NavigationPanel } from '../../../components/navigation/panel/navigation-panel';
import { LOYALTY_DASHBOARD_FEATURE } from './loyalty-dashboard.routes';

export interface LoyaltyDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function LoyaltyDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: LoyaltyDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{LOYALTY_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {LOYALTY_DASHBOARD_FEATURE.domain} · {LOYALTY_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationPanel label="Items" value={count} tone="info" />
        <NavigationPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${LOYALTY_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
