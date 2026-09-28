import { OverlayChip } from '../../../components/overlay/chip/overlay-chip';
import { CATALOG_DASHBOARD_FEATURE } from './catalog-dashboard.routes';

export interface CatalogDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_DASHBOARD_FEATURE.domain} · {CATALOG_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <OverlayChip label="Items" value={count} tone="info" />
        <OverlayChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
