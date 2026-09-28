import { TypographyBanner } from '../../../components/typography/banner/typography-banner';
import { CATALOG_OVERVIEW_FEATURE } from './catalog-overview.routes';

export interface CatalogOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CatalogOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: CatalogOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CATALOG_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CATALOG_OVERVIEW_FEATURE.domain} · {CATALOG_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyBanner label="Items" value={count} tone="info" />
        <TypographyBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
