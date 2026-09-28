import { CommerceTileGroup } from '../../../components/commerce/tile/commerce-tile-group';
import { buildProfileHistoryItems } from './profile-history.model';
import { PROFILE_HISTORY_FEATURE } from './profile-history.routes';
import {
  pickProfileHistoryHighlights,
  totalProfileHistory,
} from './profile-history.utils';

export interface ProfileHistorySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileHistorySummary({
  compact = false,
  limit = 3,
}: ProfileHistorySummaryProps) {
  const items = buildProfileHistoryItems();
  const totals = totalProfileHistory(items);
  const highlights = pickProfileHistoryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_HISTORY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PROFILE_HISTORY_FEATURE.title}</h3>
      <CommerceTileGroup
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
