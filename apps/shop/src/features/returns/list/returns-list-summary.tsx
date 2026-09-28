import { MarketingToolbarGroup } from '../../../components/marketing/toolbar/marketing-toolbar-group';
import { buildReturnsListItems } from './returns-list.model';
import { RETURNS_LIST_FEATURE } from './returns-list.routes';
import {
  pickReturnsListHighlights,
  totalReturnsList,
} from './returns-list.utils';

export interface ReturnsListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsListSummary({
  compact = false,
  limit = 3,
}: ReturnsListSummaryProps) {
  const items = buildReturnsListItems();
  const totals = totalReturnsList(items);
  const highlights = pickReturnsListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{RETURNS_LIST_FEATURE.title}</h3>
      <MarketingToolbarGroup
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
