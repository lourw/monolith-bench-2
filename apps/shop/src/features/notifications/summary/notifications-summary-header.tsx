import { OverlayPanel } from '../../../components/overlay/panel/overlay-panel';
import { NOTIFICATIONS_SUMMARY_FEATURE } from './notifications-summary.routes';

export interface NotificationsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function NotificationsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: NotificationsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{NOTIFICATIONS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {NOTIFICATIONS_SUMMARY_FEATURE.domain} ·{' '}
          {NOTIFICATIONS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayPanel label="Items" value={count} tone="info" />
        <OverlayPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${NOTIFICATIONS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
