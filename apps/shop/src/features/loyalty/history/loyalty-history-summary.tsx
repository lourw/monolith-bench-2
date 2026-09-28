import { ChartsChipGroup } from '../../../components/charts/chip/charts-chip-group';
import { buildLoyaltyHistoryItems } from './loyalty-history.model';
import { LOYALTY_HISTORY_FEATURE } from './loyalty-history.routes';
import {
  pickLoyaltyHistoryHighlights,
  totalLoyaltyHistory,
} from './loyalty-history.utils';

export interface LoyaltyHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyHistorySummary({
  compact = false,
  limit = 3,
}: LoyaltyHistorySummaryProps) {
  const items = buildLoyaltyHistoryItems();
  const totals = totalLoyaltyHistory(items);
  const highlights = pickLoyaltyHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{LOYALTY_HISTORY_FEATURE.title}</h3>
      <ChartsChipGroup
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
