import { DataChipGroup } from '../../../components/data/chip/data-chip-group';
import { buildGiftCardsInsightsItems } from './gift-cards-insights.model';
import { GIFT_CARDS_INSIGHTS_FEATURE } from './gift-cards-insights.routes';
import {
  pickGiftCardsInsightsHighlights,
  totalGiftCardsInsights,
} from './gift-cards-insights.utils';

export interface GiftCardsInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsInsightsSummary({
  compact = false,
  limit = 3,
}: GiftCardsInsightsSummaryProps) {
  const items = buildGiftCardsInsightsItems();
  const totals = totalGiftCardsInsights(items);
  const highlights = pickGiftCardsInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_INSIGHTS_FEATURE.title}
      </h3>
      <DataChipGroup
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
