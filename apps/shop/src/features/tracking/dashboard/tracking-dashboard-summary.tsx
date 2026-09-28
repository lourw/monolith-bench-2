import { TypographyTileGroup } from '../../../components/typography/tile/typography-tile-group';
import { buildTrackingDashboardItems } from './tracking-dashboard.model';
import { TRACKING_DASHBOARD_FEATURE } from './tracking-dashboard.routes';
import {
  pickTrackingDashboardHighlights,
  totalTrackingDashboard,
} from './tracking-dashboard.utils';

export interface TrackingDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingDashboardSummary({
  compact = false,
  limit = 3,
}: TrackingDashboardSummaryProps) {
  const items = buildTrackingDashboardItems();
  const totals = totalTrackingDashboard(items);
  const highlights = pickTrackingDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {TRACKING_DASHBOARD_FEATURE.title}
      </h3>
      <TypographyTileGroup
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
