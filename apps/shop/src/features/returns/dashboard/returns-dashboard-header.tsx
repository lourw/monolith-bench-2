import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import { RETURNS_DASHBOARD_FEATURE } from './returns-dashboard.routes';

export interface ReturnsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_DASHBOARD_FEATURE.domain} · {RETURNS_DASHBOARD_FEATURE.kind}
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
          data-testid={`${RETURNS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
