import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { buildSupportListItems } from './support-list.model';
import { SUPPORT_LIST_FEATURE } from './support-list.routes';
import {
  pickSupportListHighlights,
  totalSupportList,
} from './support-list.utils';

export interface SupportListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportListSummary({
  compact = false,
  limit = 3,
}: SupportListSummaryProps) {
  const items = buildSupportListItems();
  const totals = totalSupportList(items);
  const highlights = pickSupportListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SUPPORT_LIST_FEATURE.title}</h3>
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
