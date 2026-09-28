import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import { NOTIFICATIONS_HISTORY_FEATURE } from './notifications-history.routes';

export interface NotificationsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function NotificationsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: NotificationsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{NOTIFICATIONS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {NOTIFICATIONS_HISTORY_FEATURE.domain} ·{' '}
          {NOTIFICATIONS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingBanner label="Items" value={count} tone="info" />
        <MarketingBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${NOTIFICATIONS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
