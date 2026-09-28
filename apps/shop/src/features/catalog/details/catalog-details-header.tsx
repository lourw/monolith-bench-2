import { CommercePanel } from '../../../components/commerce/panel/commerce-panel';
import { CATALOG_DETAILS_FEATURE } from './catalog-details.routes';

export interface CatalogDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_DETAILS_FEATURE.domain} · {CATALOG_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommercePanel label="Items" value={count} tone="info" />
        <CommercePanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
