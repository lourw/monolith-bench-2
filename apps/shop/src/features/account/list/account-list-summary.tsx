import { CoreTileGroup } from '../../../components/core/tile/core-tile-group';
import { buildAccountListItems } from './account-list.model';
import { ACCOUNT_LIST_FEATURE } from './account-list.routes';
import {
  pickAccountListHighlights,
  totalAccountList,
} from './account-list.utils';

export interface AccountListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountListSummary({
  compact = false,
  limit = 3,
}: AccountListSummaryProps) {
  const items = buildAccountListItems();
  const totals = totalAccountList(items);
  const highlights = pickAccountListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ACCOUNT_LIST_FEATURE.title}</h3>
      <CoreTileGroup
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
