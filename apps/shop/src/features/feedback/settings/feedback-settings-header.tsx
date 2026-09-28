import { NavigationBadge } from '../../../components/navigation/badge/navigation-badge';
import { FEEDBACK_SETTINGS_FEATURE } from './feedback-settings.routes';

export interface FeedbackSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_SETTINGS_FEATURE.domain} · {FEEDBACK_SETTINGS_FEATURE.kind}
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
          data-testid={`${FEEDBACK_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
