import { InputsTile } from '../../../components/inputs/tile/inputs-tile';
import { REVIEWS_SETTINGS_FEATURE } from './reviews-settings.routes';

export interface ReviewsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_SETTINGS_FEATURE.domain} · {REVIEWS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsTile label="Items" value={count} tone="info" />
        <InputsTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
