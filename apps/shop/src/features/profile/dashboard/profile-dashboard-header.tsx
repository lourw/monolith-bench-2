import { FeedbackList } from '../../../components/feedback/list/feedback-list';
import { PROFILE_DASHBOARD_FEATURE } from './profile-dashboard.routes';

export interface ProfileDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ProfileDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: ProfileDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROFILE_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROFILE_DASHBOARD_FEATURE.domain} · {PROFILE_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackList label="Items" value={count} tone="info" />
        <FeedbackList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROFILE_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
