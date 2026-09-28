import { LayoutCardGroup } from '../../../components/layout/card/layout-card-group';
import { buildShippingSettingsItems } from './shipping-settings.model';
import { SHIPPING_SETTINGS_FEATURE } from './shipping-settings.routes';
import {
  pickShippingSettingsHighlights,
  totalShippingSettings,
} from './shipping-settings.utils';

export interface ShippingSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingSettingsSummary({
  compact = false,
  limit = 3,
}: ShippingSettingsSummaryProps) {
  const items = buildShippingSettingsItems();
  const totals = totalShippingSettings(items);
  const highlights = pickShippingSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {SHIPPING_SETTINGS_FEATURE.title}
      </h3>
      <LayoutCardGroup
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
