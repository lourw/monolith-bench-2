import { ChartsTile } from '../../../components/charts/tile/charts-tile';
import { PAYMENTS_DASHBOARD_FEATURE } from './payments-dashboard.routes';

export interface PaymentsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_DASHBOARD_FEATURE.domain} ·{' '}
          {PAYMENTS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsTile label="Items" value={count} tone="info" />
        <ChartsTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
