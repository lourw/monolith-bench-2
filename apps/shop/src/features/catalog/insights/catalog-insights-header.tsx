import { TypographyBadge } from '../../../components/typography/badge/typography-badge';
import { CATALOG_INSIGHTS_FEATURE } from './catalog-insights.routes';

export interface CatalogInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_INSIGHTS_FEATURE.domain} · {CATALOG_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyBadge label="Items" value={count} tone="info" />
        <TypographyBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
