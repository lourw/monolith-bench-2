import { CoreHeader } from '../../../components/core/header/core-header';
import { ANALYTICS_SETTINGS_FEATURE } from './analytics-settings.routes';

export interface AnalyticsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AnalyticsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AnalyticsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ANALYTICS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ANALYTICS_SETTINGS_FEATURE.domain} ·{' '}
          {ANALYTICS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreHeader label="Items" value={count} tone="info" />
        <CoreHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ANALYTICS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
