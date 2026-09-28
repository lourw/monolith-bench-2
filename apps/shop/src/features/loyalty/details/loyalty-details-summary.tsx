import { CommerceBadgeGroup } from '../../../components/commerce/badge/commerce-badge-group';
import { buildLoyaltyDetailsItems } from './loyalty-details.model';
import { LOYALTY_DETAILS_FEATURE } from './loyalty-details.routes';
import {
  pickLoyaltyDetailsHighlights,
  totalLoyaltyDetails,
} from './loyalty-details.utils';

export interface LoyaltyDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function LoyaltyDetailsSummary({
  compact = false,
  limit = 3,
}: LoyaltyDetailsSummaryProps) {
  const items = buildLoyaltyDetailsItems();
  const totals = totalLoyaltyDetails(items);
  const highlights = pickLoyaltyDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${LOYALTY_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{LOYALTY_DETAILS_FEATURE.title}</h3>
      <CommerceBadgeGroup
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
