import { MediaHeaderGroup } from '../../../components/media/header/media-header-group';
import { buildSupportDashboardItems } from './support-dashboard.model';
import { SUPPORT_DASHBOARD_FEATURE } from './support-dashboard.routes';
import {
  pickSupportDashboardHighlights,
  totalSupportDashboard,
} from './support-dashboard.utils';

export interface SupportDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SupportDashboardSummary({
  compact = false,
  limit = 3,
}: SupportDashboardSummaryProps) {
  const items = buildSupportDashboardItems();
  const totals = totalSupportDashboard(items);
  const highlights = pickSupportDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SUPPORT_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SUPPORT_DASHBOARD_FEATURE.title}
      </h3>
      <MediaHeaderGroup
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
