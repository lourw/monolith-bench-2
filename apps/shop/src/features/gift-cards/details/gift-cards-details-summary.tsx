import { MarketingPanelGroup } from '../../../components/marketing/panel/marketing-panel-group';
import { buildGiftCardsDetailsItems } from './gift-cards-details.model';
import { GIFT_CARDS_DETAILS_FEATURE } from './gift-cards-details.routes';
import {
  pickGiftCardsDetailsHighlights,
  totalGiftCardsDetails,
} from './gift-cards-details.utils';

export interface GiftCardsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsDetailsSummary({
  compact = false,
  limit = 3,
}: GiftCardsDetailsSummaryProps) {
  const items = buildGiftCardsDetailsItems();
  const totals = totalGiftCardsDetails(items);
  const highlights = pickGiftCardsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_DETAILS_FEATURE.title}
      </h3>
      <MarketingPanelGroup
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
