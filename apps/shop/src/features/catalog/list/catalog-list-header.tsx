import { MarketingCard } from '../../../components/marketing/card/marketing-card';
import { CATALOG_LIST_FEATURE } from './catalog-list.routes';

export interface CatalogListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogListHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_LIST_FEATURE.domain} · {CATALOG_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingCard label="Items" value={count} tone="info" />
        <MarketingCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
