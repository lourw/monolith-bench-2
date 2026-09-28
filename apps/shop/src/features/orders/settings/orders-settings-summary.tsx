import { TypographyToolbarGroup } from '../../../components/typography/toolbar/typography-toolbar-group';
import { buildOrdersSettingsItems } from './orders-settings.model';
import { ORDERS_SETTINGS_FEATURE } from './orders-settings.routes';
import {
  pickOrdersSettingsHighlights,
  totalOrdersSettings,
} from './orders-settings.utils';

export interface OrdersSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function OrdersSettingsSummary({
  compact = false,
  limit = 3,
}: OrdersSettingsSummaryProps) {
  const items = buildOrdersSettingsItems();
  const totals = totalOrdersSettings(items);
  const highlights = pickOrdersSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ORDERS_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ORDERS_SETTINGS_FEATURE.title}</h3>
      <TypographyToolbarGroup
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
