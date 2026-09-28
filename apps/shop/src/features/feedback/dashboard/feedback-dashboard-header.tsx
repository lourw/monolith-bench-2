import { InputsCard } from '../../../components/inputs/card/inputs-card';
import { FEEDBACK_DASHBOARD_FEATURE } from './feedback-dashboard.routes';

export interface FeedbackDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_DASHBOARD_FEATURE.domain} ·{' '}
          {FEEDBACK_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsCard label="Items" value={count} tone="info" />
        <InputsCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${FEEDBACK_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
