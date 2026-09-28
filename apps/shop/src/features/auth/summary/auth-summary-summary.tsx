import { CommerceStatGroup } from '../../../components/commerce/stat/commerce-stat-group';
import { buildAuthSummaryItems } from './auth-summary.model';
import { AUTH_SUMMARY_FEATURE } from './auth-summary.routes';
import {
  pickAuthSummaryHighlights,
  totalAuthSummary,
} from './auth-summary.utils';

export interface AuthSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthSummarySummary({
  compact = false,
  limit = 3,
}: AuthSummarySummaryProps) {
  const items = buildAuthSummaryItems();
  const totals = totalAuthSummary(items);
  const highlights = pickAuthSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_SUMMARY_FEATURE.title}</h3>
      <CommerceStatGroup
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
