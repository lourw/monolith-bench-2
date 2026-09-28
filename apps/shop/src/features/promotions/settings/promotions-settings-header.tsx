import { MediaCard } from '../../../components/media/card/media-card';
import { PROMOTIONS_SETTINGS_FEATURE } from './promotions-settings.routes';

export interface PromotionsSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_SETTINGS_FEATURE.domain} ·{' '}
          {PROMOTIONS_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaCard label="Items" value={count} tone="info" />
        <MediaCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
