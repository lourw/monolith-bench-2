import { DataTileGroup } from '../../../components/data/tile/data-tile-group';
import { buildPromotionsDashboardItems } from './promotions-dashboard.model';
import { PROMOTIONS_DASHBOARD_FEATURE } from './promotions-dashboard.routes';
import {
  pickPromotionsDashboardHighlights,
  totalPromotionsDashboard,
} from './promotions-dashboard.utils';

export interface PromotionsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsDashboardSummary({
  compact = false,
  limit = 3,
}: PromotionsDashboardSummaryProps) {
  const items = buildPromotionsDashboardItems();
  const totals = totalPromotionsDashboard(items);
  const highlights = pickPromotionsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_DASHBOARD_FEATURE.title}
      </h3>
      <DataTileGroup
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
