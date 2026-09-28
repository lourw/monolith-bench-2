import { FeedbackStat } from '../../../components/feedback/stat/feedback-stat';
import { COMPARE_SETTINGS_FEATURE } from './compare-settings.routes';

export interface CompareSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_SETTINGS_FEATURE.domain} · {COMPARE_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackStat label="Items" value={count} tone="info" />
        <FeedbackStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
