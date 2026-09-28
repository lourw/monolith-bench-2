import { CoreHeaderGroup } from '../../../components/core/header/core-header-group';
import { buildAccountDetailsItems } from './account-details.model';
import { ACCOUNT_DETAILS_FEATURE } from './account-details.routes';
import {
  pickAccountDetailsHighlights,
  totalAccountDetails,
} from './account-details.utils';

export interface AccountDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountDetailsSummary({
  compact = false,
  limit = 3,
}: AccountDetailsSummaryProps) {
  const items = buildAccountDetailsItems();
  const totals = totalAccountDetails(items);
  const highlights = pickAccountDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ACCOUNT_DETAILS_FEATURE.title}</h3>
      <CoreHeaderGroup
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
