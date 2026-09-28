import { MarketingTileGroup } from '../../../components/marketing/tile/marketing-tile-group';
import { buildCompareDetailsItems } from './compare-details.model';
import { COMPARE_DETAILS_FEATURE } from './compare-details.routes';
import {
  pickCompareDetailsHighlights,
  totalCompareDetails,
} from './compare-details.utils';

export interface CompareDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareDetailsSummary({
  compact = false,
  limit = 3,
}: CompareDetailsSummaryProps) {
  const items = buildCompareDetailsItems();
  const totals = totalCompareDetails(items);
  const highlights = pickCompareDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{COMPARE_DETAILS_FEATURE.title}</h3>
      <MarketingTileGroup
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
