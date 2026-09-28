import { MediaCardGroup } from '../../../components/media/card/media-card-group';
import { buildProfileDetailsItems } from './profile-details.model';
import { PROFILE_DETAILS_FEATURE } from './profile-details.routes';
import {
  pickProfileDetailsHighlights,
  totalProfileDetails,
} from './profile-details.utils';

export interface ProfileDetailsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileDetailsSummary({
  compact = false,
  limit = 3,
}: ProfileDetailsSummaryProps) {
  const items = buildProfileDetailsItems();
  const totals = totalProfileDetails(items);
  const highlights = pickProfileDetailsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_DETAILS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PROFILE_DETAILS_FEATURE.title}</h3>
      <MediaCardGroup
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
