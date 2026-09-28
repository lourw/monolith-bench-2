import { ChartsBadgeGroup } from '../../../components/charts/badge/charts-badge-group';
import { buildPaymentsSettingsItems } from './payments-settings.model';
import { PAYMENTS_SETTINGS_FEATURE } from './payments-settings.routes';
import {
  pickPaymentsSettingsHighlights,
  totalPaymentsSettings,
} from './payments-settings.utils';

export interface PaymentsSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function PaymentsSettingsSummary({
  compact = false,
  limit = 3,
}: PaymentsSettingsSummaryProps) {
  const items = buildPaymentsSettingsItems();
  const totals = totalPaymentsSettings(items);
  const highlights = pickPaymentsSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PAYMENTS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {PAYMENTS_SETTINGS_FEATURE.title}
      </h3>
      <ChartsBadgeGroup
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
