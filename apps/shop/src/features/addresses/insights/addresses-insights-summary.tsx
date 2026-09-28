import { ChartsChipGroup } from '../../../components/charts/chip/charts-chip-group';
import { buildAddressesInsightsItems } from './addresses-insights.model';
import { ADDRESSES_INSIGHTS_FEATURE } from './addresses-insights.routes';
import {
  pickAddressesInsightsHighlights,
  totalAddressesInsights,
} from './addresses-insights.utils';

export interface AddressesInsightsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesInsightsSummary({
  compact = false,
  limit = 3,
}: AddressesInsightsSummaryProps) {
  const items = buildAddressesInsightsItems();
  const totals = totalAddressesInsights(items);
  const highlights = pickAddressesInsightsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_INSIGHTS_FEATURE.title}
      </h3>
      <ChartsChipGroup
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
