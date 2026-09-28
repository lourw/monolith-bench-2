import { MarketingToolbarGroup } from '../../../components/marketing/toolbar/marketing-toolbar-group';
import { buildGiftCardsHistoryItems } from './gift-cards-history.model';
import { GIFT_CARDS_HISTORY_FEATURE } from './gift-cards-history.routes';
import {
  pickGiftCardsHistoryHighlights,
  totalGiftCardsHistory,
} from './gift-cards-history.utils';

export interface GiftCardsHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsHistorySummary({
  compact = false,
  limit = 3,
}: GiftCardsHistorySummaryProps) {
  const items = buildGiftCardsHistoryItems();
  const totals = totalGiftCardsHistory(items);
  const highlights = pickGiftCardsHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_HISTORY_FEATURE.title}
      </h3>
      <MarketingToolbarGroup
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
