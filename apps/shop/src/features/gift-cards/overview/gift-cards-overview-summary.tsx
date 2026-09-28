import { TypographyChipGroup } from '../../../components/typography/chip/typography-chip-group';
import { buildGiftCardsOverviewItems } from './gift-cards-overview.model';
import { GIFT_CARDS_OVERVIEW_FEATURE } from './gift-cards-overview.routes';
import {
  pickGiftCardsOverviewHighlights,
  totalGiftCardsOverview,
} from './gift-cards-overview.utils';

export interface GiftCardsOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsOverviewSummary({
  compact = false,
  limit = 3,
}: GiftCardsOverviewSummaryProps) {
  const items = buildGiftCardsOverviewItems();
  const totals = totalGiftCardsOverview(items);
  const highlights = pickGiftCardsOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_OVERVIEW_FEATURE.title}
      </h3>
      <TypographyChipGroup
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
