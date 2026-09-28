import { LayoutTileGroup } from '../../../components/layout/tile/layout-tile-group';
import { buildSupportOverviewItems } from './support-overview.model';
import { SUPPORT_OVERVIEW_FEATURE } from './support-overview.routes';
import {
  pickSupportOverviewHighlights,
  totalSupportOverview,
} from './support-overview.utils';

export interface SupportOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportOverviewSummary({
  compact = false,
  limit = 3,
}: SupportOverviewSummaryProps) {
  const items = buildSupportOverviewItems();
  const totals = totalSupportOverview(items);
  const highlights = pickSupportOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUPPORT_OVERVIEW_FEATURE.title}
      </h3>
      <LayoutTileGroup
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
