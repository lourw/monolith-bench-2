import { DataCard } from '../../../components/data/card/data-card';
import { AUTH_DASHBOARD_FEATURE } from './auth-dashboard.routes';

export interface AuthDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_DASHBOARD_FEATURE.domain} · {AUTH_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataCard label="Items" value={count} tone="info" />
        <DataCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
