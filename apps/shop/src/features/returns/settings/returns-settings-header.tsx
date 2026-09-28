import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import { RETURNS_SETTINGS_FEATURE } from './returns-settings.routes';

export interface ReturnsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_SETTINGS_FEATURE.domain} · {RETURNS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackHeader label="Items" value={count} tone="info" />
        <FeedbackHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RETURNS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
