import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { buildGiftCardsSummaryItems } from './gift-cards-summary.model';
import { GIFT_CARDS_SUMMARY_FEATURE } from './gift-cards-summary.routes';
import {
  pickGiftCardsSummaryHighlights,
  totalGiftCardsSummary,
} from './gift-cards-summary.utils';

export interface GiftCardsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsSummarySummary({
  compact = false,
  limit = 3,
}: GiftCardsSummarySummaryProps) {
  const items = buildGiftCardsSummaryItems();
  const totals = totalGiftCardsSummary(items);
  const highlights = pickGiftCardsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_SUMMARY_FEATURE.title}
      </h3>
      <CommerceToolbarGroup
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
