import { MarketingStat } from '../../../components/marketing/stat/marketing-stat';
import { CATALOG_HISTORY_FEATURE } from './catalog-history.routes';

export interface CatalogHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_HISTORY_FEATURE.domain} · {CATALOG_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingStat label="Items" value={count} tone="info" />
        <MarketingStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
