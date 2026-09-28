import { FeedbackList } from '../../../components/feedback/list/feedback-list';
import { ADDRESSES_DASHBOARD_FEATURE } from './addresses-dashboard.routes';

export interface AddressesDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_DASHBOARD_FEATURE.domain} ·{' '}
          {ADDRESSES_DASHBOARD_FEATURE.kind}
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
          data-testid={`${ADDRESSES_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
