import { TypographyBanner } from '../../../components/typography/banner/typography-banner';
import { RECOMMENDATIONS_SETTINGS_FEATURE } from './recommendations-settings.routes';

export interface RecommendationsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_SETTINGS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_SETTINGS_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyBanner label="Items" value={count} tone="info" />
        <TypographyBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
