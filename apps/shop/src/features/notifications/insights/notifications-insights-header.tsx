import { InputsCard } from '../../../components/inputs/card/inputs-card';
import { NOTIFICATIONS_INSIGHTS_FEATURE } from './notifications-insights.routes';

export interface NotificationsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function NotificationsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: NotificationsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {NOTIFICATIONS_INSIGHTS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {NOTIFICATIONS_INSIGHTS_FEATURE.domain} ·{' '}
          {NOTIFICATIONS_INSIGHTS_FEATURE.kind}
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
          data-testid={`${NOTIFICATIONS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
