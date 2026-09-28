import { FormsCardGroup } from '../../../components/forms/card/forms-card-group';
import { buildProfileListItems } from './profile-list.model';
import { PROFILE_LIST_FEATURE } from './profile-list.routes';
import {
  pickProfileListHighlights,
  totalProfileList,
} from './profile-list.utils';

export interface ProfileListSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileListSummary({
  compact = false,
  limit = 3,
}: ProfileListSummaryProps) {
  const items = buildProfileListItems();
  const totals = totalProfileList(items);
  const highlights = pickProfileListHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_LIST_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PROFILE_LIST_FEATURE.title}</h3>
      <FormsCardGroup
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
