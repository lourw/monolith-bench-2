import { FormsToolbarGroup } from '../../../components/forms/toolbar/forms-toolbar-group';
import { buildProfileInsightsItems } from './profile-insights.model';
import { PROFILE_INSIGHTS_FEATURE } from './profile-insights.routes';
import {
  pickProfileInsightsHighlights,
  totalProfileInsights,
} from './profile-insights.utils';

export interface ProfileInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileInsightsSummary({
  compact = false,
  limit = 3,
}: ProfileInsightsSummaryProps) {
  const items = buildProfileInsightsItems();
  const totals = totalProfileInsights(items);
  const highlights = pickProfileInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PROFILE_INSIGHTS_FEATURE.title}
      </h3>
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
