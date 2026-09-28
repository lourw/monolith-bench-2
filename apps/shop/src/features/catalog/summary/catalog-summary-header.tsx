import { CommerceTile } from '../../../components/commerce/tile/commerce-tile';
import { CATALOG_SUMMARY_FEATURE } from './catalog-summary.routes';

export interface CatalogSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_SUMMARY_FEATURE.domain} · {CATALOG_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceTile label="Items" value={count} tone="info" />
        <CommerceTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
