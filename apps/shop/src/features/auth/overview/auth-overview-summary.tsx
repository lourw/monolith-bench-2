import { FormsToolbarGroup } from '../../../components/forms/toolbar/forms-toolbar-group';
import { buildAuthOverviewItems } from './auth-overview.model';
import { AUTH_OVERVIEW_FEATURE } from './auth-overview.routes';
import {
  pickAuthOverviewHighlights,
  totalAuthOverview,
} from './auth-overview.utils';

export interface AuthOverviewSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthOverviewSummary({
  compact = false,
  limit = 3,
}: AuthOverviewSummaryProps) {
  const items = buildAuthOverviewItems();
  const totals = totalAuthOverview(items);
  const highlights = pickAuthOverviewHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_OVERVIEW_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_OVERVIEW_FEATURE.title}</h3>
      <FormsToolbarGroup
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
