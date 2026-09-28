import { OverlayChipGroup } from '../../../components/overlay/chip/overlay-chip-group';
import { buildCatalogDashboardItems } from './catalog-dashboard.model';
import { CATALOG_DASHBOARD_FEATURE } from './catalog-dashboard.routes';
import {
  pickCatalogDashboardHighlights,
  totalCatalogDashboard,
} from './catalog-dashboard.utils';

export interface CatalogDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogDashboardSummary({
  compact = false,
  limit = 3,
}: CatalogDashboardSummaryProps) {
  const items = buildCatalogDashboardItems();
  const totals = totalCatalogDashboard(items);
  const highlights = pickCatalogDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CATALOG_DASHBOARD_FEATURE.title}
      </h3>
      <OverlayChipGroup
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
