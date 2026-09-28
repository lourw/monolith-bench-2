import { MediaCard } from '../../../components/media/card/media-card';
import { STORE_LOCATOR_SETTINGS_FEATURE } from './store-locator-settings.routes';

export interface StoreLocatorSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {STORE_LOCATOR_SETTINGS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_SETTINGS_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_SETTINGS_FEATURE.kind}
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
          data-testid={`${STORE_LOCATOR_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
