import { MediaStatGroup } from '../../../components/media/stat/media-stat-group';
import { buildBundlesOverviewItems } from './bundles-overview.model';
import { BUNDLES_OVERVIEW_FEATURE } from './bundles-overview.routes';
import {
  pickBundlesOverviewHighlights,
  totalBundlesOverview,
} from './bundles-overview.utils';

export interface BundlesOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesOverviewSummary({
  compact = false,
  limit = 3,
}: BundlesOverviewSummaryProps) {
  const items = buildBundlesOverviewItems();
  const totals = totalBundlesOverview(items);
  const highlights = pickBundlesOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {BUNDLES_OVERVIEW_FEATURE.title}
      </h3>
      <MediaStatGroup
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
