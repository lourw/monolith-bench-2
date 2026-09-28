import { CommercePanelGroup } from '../../../components/commerce/panel/commerce-panel-group';
import { buildCompareListItems } from './compare-list.model';
import { COMPARE_LIST_FEATURE } from './compare-list.routes';
import {
  pickCompareListHighlights,
  totalCompareList,
} from './compare-list.utils';

export interface CompareListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareListSummary({
  compact = false,
  limit = 3,
}: CompareListSummaryProps) {
  const items = buildCompareListItems();
  const totals = totalCompareList(items);
  const highlights = pickCompareListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{COMPARE_LIST_FEATURE.title}</h3>
      <CommercePanelGroup
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
