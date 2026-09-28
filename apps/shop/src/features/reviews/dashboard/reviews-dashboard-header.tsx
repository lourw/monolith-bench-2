import { FormsHeader } from '../../../components/forms/header/forms-header';
import { REVIEWS_DASHBOARD_FEATURE } from './reviews-dashboard.routes';

export interface ReviewsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_DASHBOARD_FEATURE.domain} · {REVIEWS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsHeader label="Items" value={count} tone="info" />
        <FormsHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
