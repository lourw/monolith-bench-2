import { CoreHeader } from '../../../components/core/header/core-header';
import { PREORDERS_DASHBOARD_FEATURE } from './preorders-dashboard.routes';

export interface PreordersDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_DASHBOARD_FEATURE.domain} ·{' '}
          {PREORDERS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreHeader label="Items" value={count} tone="info" />
        <CoreHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
