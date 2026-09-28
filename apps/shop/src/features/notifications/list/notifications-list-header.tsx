import { NavigationBadge } from '../../../components/navigation/badge/navigation-badge';
import { NOTIFICATIONS_LIST_FEATURE } from './notifications-list.routes';

export interface NotificationsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function NotificationsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: NotificationsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{NOTIFICATIONS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {NOTIFICATIONS_LIST_FEATURE.domain} ·{' '}
          {NOTIFICATIONS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <NavigationBadge label="Items" value={count} tone="info" />
        <NavigationBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${NOTIFICATIONS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
