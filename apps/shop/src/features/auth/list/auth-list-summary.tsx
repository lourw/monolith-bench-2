import { FormsBannerGroup } from '../../../components/forms/banner/forms-banner-group';
import { buildAuthListItems } from './auth-list.model';
import { AUTH_LIST_FEATURE } from './auth-list.routes';
import { pickAuthListHighlights, totalAuthList } from './auth-list.utils';

export interface AuthListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthListSummary({
  compact = false,
  limit = 3,
}: AuthListSummaryProps) {
  const items = buildAuthListItems();
  const totals = totalAuthList(items);
  const highlights = pickAuthListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_LIST_FEATURE.title}</h3>
      <FormsBannerGroup
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
