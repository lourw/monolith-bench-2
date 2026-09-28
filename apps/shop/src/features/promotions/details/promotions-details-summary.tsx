import { TypographyHeaderGroup } from '../../../components/typography/header/typography-header-group';
import { buildPromotionsDetailsItems } from './promotions-details.model';
import { PROMOTIONS_DETAILS_FEATURE } from './promotions-details.routes';
import {
  pickPromotionsDetailsHighlights,
  totalPromotionsDetails,
} from './promotions-details.utils';

export interface PromotionsDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsDetailsSummary({
  compact = false,
  limit = 3,
}: PromotionsDetailsSummaryProps) {
  const items = buildPromotionsDetailsItems();
  const totals = totalPromotionsDetails(items);
  const highlights = pickPromotionsDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_DETAILS_FEATURE.title}
      </h3>
      <TypographyHeaderGroup
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
