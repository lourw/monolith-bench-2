import { InputsBannerGroup } from '../../../components/inputs/banner/inputs-banner-group';
import { buildBundlesHistoryItems } from './bundles-history.model';
import { BUNDLES_HISTORY_FEATURE } from './bundles-history.routes';
import {
  pickBundlesHistoryHighlights,
  totalBundlesHistory,
} from './bundles-history.utils';

export interface BundlesHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesHistorySummary({
  compact = false,
  limit = 3,
}: BundlesHistorySummaryProps) {
  const items = buildBundlesHistoryItems();
  const totals = totalBundlesHistory(items);
  const highlights = pickBundlesHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{BUNDLES_HISTORY_FEATURE.title}</h3>
      <InputsBannerGroup
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
