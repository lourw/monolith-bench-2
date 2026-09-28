import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { buildPromotionsListItems } from './promotions-list.model';
import { PROMOTIONS_LIST_FEATURE } from './promotions-list.routes';
import {
  pickPromotionsListHighlights,
  totalPromotionsList,
} from './promotions-list.utils';

export interface PromotionsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PromotionsListSummary({
  compact = false,
  limit = 3,
}: PromotionsListSummaryProps) {
  const items = buildPromotionsListItems();
  const totals = totalPromotionsList(items);
  const highlights = pickPromotionsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PROMOTIONS_LIST_FEATURE.title}</h3>
      <DataStatGroup
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
