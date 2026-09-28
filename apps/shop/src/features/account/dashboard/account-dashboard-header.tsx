import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import { ACCOUNT_DASHBOARD_FEATURE } from './account-dashboard.routes';

export interface AccountDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_DASHBOARD_FEATURE.domain} · {ACCOUNT_DASHBOARD_FEATURE.kind}
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
          data-testid={`${ACCOUNT_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
