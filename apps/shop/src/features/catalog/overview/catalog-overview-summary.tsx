import { TypographyBannerGroup } from '../../../components/typography/banner/typography-banner-group';
import { buildCatalogOverviewItems } from './catalog-overview.model';
import { CATALOG_OVERVIEW_FEATURE } from './catalog-overview.routes';
import {
  pickCatalogOverviewHighlights,
  totalCatalogOverview,
} from './catalog-overview.utils';

export interface CatalogOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogOverviewSummary({
  compact = false,
  limit = 3,
}: CatalogOverviewSummaryProps) {
  const items = buildCatalogOverviewItems();
  const totals = totalCatalogOverview(items);
  const highlights = pickCatalogOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CATALOG_OVERVIEW_FEATURE.title}
      </h3>
      <TypographyBannerGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
