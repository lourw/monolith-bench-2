import { TypographyToolbarGroup } from '../../../components/typography/toolbar/typography-toolbar-group';
import { buildLoyaltyListItems } from './loyalty-list.model';
import { LOYALTY_LIST_FEATURE } from './loyalty-list.routes';
import {
  pickLoyaltyListHighlights,
  totalLoyaltyList,
} from './loyalty-list.utils';

export interface LoyaltyListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyListSummary({
  compact = false,
  limit = 3,
}: LoyaltyListSummaryProps) {
  const items = buildLoyaltyListItems();
  const totals = totalLoyaltyList(items);
  const highlights = pickLoyaltyListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{LOYALTY_LIST_FEATURE.title}</h3>
      <TypographyToolbarGroup
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
