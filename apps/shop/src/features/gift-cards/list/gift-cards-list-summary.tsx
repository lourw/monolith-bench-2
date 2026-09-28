import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { buildGiftCardsListItems } from './gift-cards-list.model';
import { GIFT_CARDS_LIST_FEATURE } from './gift-cards-list.routes';
import {
  pickGiftCardsListHighlights,
  totalGiftCardsList,
} from './gift-cards-list.utils';

export interface GiftCardsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsListSummary({
  compact = false,
  limit = 3,
}: GiftCardsListSummaryProps) {
  const items = buildGiftCardsListItems();
  const totals = totalGiftCardsList(items);
  const highlights = pickGiftCardsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{GIFT_CARDS_LIST_FEATURE.title}</h3>
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
