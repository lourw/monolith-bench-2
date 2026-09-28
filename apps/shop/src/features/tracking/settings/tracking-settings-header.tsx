import { FeedbackList } from '../../../components/feedback/list/feedback-list';
import { TRACKING_SETTINGS_FEATURE } from './tracking-settings.routes';

export interface TrackingSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_SETTINGS_FEATURE.domain} · {TRACKING_SETTINGS_FEATURE.kind}
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
          data-testid={`${TRACKING_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
