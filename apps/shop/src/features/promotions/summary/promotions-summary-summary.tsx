import { InputsChipGroup } from '../../../components/inputs/chip/inputs-chip-group';
import { buildPromotionsSummaryItems } from './promotions-summary.model';
import { PROMOTIONS_SUMMARY_FEATURE } from './promotions-summary.routes';
import {
  pickPromotionsSummaryHighlights,
  totalPromotionsSummary,
} from './promotions-summary.utils';

export interface PromotionsSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsSummarySummary({
  compact = false,
  limit = 3,
}: PromotionsSummarySummaryProps) {
  const items = buildPromotionsSummaryItems();
  const totals = totalPromotionsSummary(items);
  const highlights = pickPromotionsSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROMOTIONS_SUMMARY_FEATURE.title}
      </h3>
      <InputsChipGroup
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
