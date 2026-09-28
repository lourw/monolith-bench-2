import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import { SIZING_DASHBOARD_FEATURE } from './sizing-dashboard.routes';

export interface SizingDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_DASHBOARD_FEATURE.domain} · {SIZING_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceStat label="Items" value={count} tone="info" />
        <CommerceStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SIZING_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
