import { TypographyChip } from '../../../components/typography/chip/typography-chip';
import { NOTIFICATIONS_DASHBOARD_FEATURE } from './notifications-dashboard.routes';

export interface NotificationsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function NotificationsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: NotificationsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {NOTIFICATIONS_DASHBOARD_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {NOTIFICATIONS_DASHBOARD_FEATURE.domain} ·{' '}
          {NOTIFICATIONS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyChip label="Items" value={count} tone="info" />
        <TypographyChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${NOTIFICATIONS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
