import { LayoutChipGroup } from '../../../components/layout/chip/layout-chip-group';
import { buildGiftCardsDashboardItems } from './gift-cards-dashboard.model';
import { GIFT_CARDS_DASHBOARD_FEATURE } from './gift-cards-dashboard.routes';
import {
  pickGiftCardsDashboardHighlights,
  totalGiftCardsDashboard,
} from './gift-cards-dashboard.utils';

export interface GiftCardsDashboardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsDashboardSummary({
  compact = false,
  limit = 3,
}: GiftCardsDashboardSummaryProps) {
  const items = buildGiftCardsDashboardItems();
  const totals = totalGiftCardsDashboard(items);
  const highlights = pickGiftCardsDashboardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_DASHBOARD_FEATURE.title}
      </h3>
      <LayoutChipGroup
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
