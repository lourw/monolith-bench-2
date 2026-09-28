import { CoreBadge } from '../../../components/core/badge/core-badge';
import { CATALOG_SETTINGS_FEATURE } from './catalog-settings.routes';

export interface CatalogSettingsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogSettingsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogSettingsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_SETTINGS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_SETTINGS_FEATURE.domain} · {CATALOG_SETTINGS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreBadge label="Items" value={count} tone="info" />
        <CoreBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_SETTINGS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
