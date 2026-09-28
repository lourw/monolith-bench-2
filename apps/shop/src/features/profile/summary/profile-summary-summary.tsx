import { LayoutBadgeGroup } from '../../../components/layout/badge/layout-badge-group';
import { buildProfileSummaryItems } from './profile-summary.model';
import { PROFILE_SUMMARY_FEATURE } from './profile-summary.routes';
import {
  pickProfileSummaryHighlights,
  totalProfileSummary,
} from './profile-summary.utils';

export interface ProfileSummarySummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileSummarySummary({
  compact = false,
  limit = 3,
}: ProfileSummarySummaryProps) {
  const items = buildProfileSummaryItems();
  const totals = totalProfileSummary(items);
  const highlights = pickProfileSummaryHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_SUMMARY_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PROFILE_SUMMARY_FEATURE.title}</h3>
      <LayoutBadgeGroup
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
