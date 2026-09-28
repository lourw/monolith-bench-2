import { DataCardGroup } from '../../../components/data/card/data-card-group';
import { buildAuthDetailsItems } from './auth-details.model';
import { AUTH_DETAILS_FEATURE } from './auth-details.routes';
import {
  pickAuthDetailsHighlights,
  totalAuthDetails,
} from './auth-details.utils';

export interface AuthDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthDetailsSummary({
  compact = false,
  limit = 3,
}: AuthDetailsSummaryProps) {
  const items = buildAuthDetailsItems();
  const totals = totalAuthDetails(items);
  const highlights = pickAuthDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_DETAILS_FEATURE.title}</h3>
      <DataCardGroup
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
