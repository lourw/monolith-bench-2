import { CommerceToolbarGroup } from '../../../components/commerce/toolbar/commerce-toolbar-group';
import { buildBundlesDashboardItems } from './bundles-dashboard.model';
import { BUNDLES_DASHBOARD_FEATURE } from './bundles-dashboard.routes';
import {
  pickBundlesDashboardHighlights,
  totalBundlesDashboard,
} from './bundles-dashboard.utils';

export interface BundlesDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function BundlesDashboardSummary({
  compact = false,
  limit = 3,
}: BundlesDashboardSummaryProps) {
  const items = buildBundlesDashboardItems();
  const totals = totalBundlesDashboard(items);
  const highlights = pickBundlesDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${BUNDLES_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {BUNDLES_DASHBOARD_FEATURE.title}
      </h3>
      <CommerceToolbarGroup
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
