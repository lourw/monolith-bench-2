import { DataTileGroup } from '../../../components/data/tile/data-tile-group';
import { buildPreordersOverviewItems } from './preorders-overview.model';
import { PREORDERS_OVERVIEW_FEATURE } from './preorders-overview.routes';
import {
  pickPreordersOverviewHighlights,
  totalPreordersOverview,
} from './preorders-overview.utils';

export interface PreordersOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PreordersOverviewSummary({
  compact = false,
  limit = 3,
}: PreordersOverviewSummaryProps) {
  const items = buildPreordersOverviewItems();
  const totals = totalPreordersOverview(items);
  const highlights = pickPreordersOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PREORDERS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PREORDERS_OVERVIEW_FEATURE.title}
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
