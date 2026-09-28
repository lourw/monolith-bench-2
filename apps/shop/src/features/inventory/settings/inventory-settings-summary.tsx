import { TypographyHeaderGroup } from '../../../components/typography/header/typography-header-group';
import { buildInventorySettingsItems } from './inventory-settings.model';
import { INVENTORY_SETTINGS_FEATURE } from './inventory-settings.routes';
import {
  pickInventorySettingsHighlights,
  totalInventorySettings,
} from './inventory-settings.utils';

export interface InventorySettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventorySettingsSummary({
  compact = false,
  limit = 3,
}: InventorySettingsSummaryProps) {
  const items = buildInventorySettingsItems();
  const totals = totalInventorySettings(items);
  const highlights = pickInventorySettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_SETTINGS_FEATURE.title}
      </h3>
      <TypographyHeaderGroup
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
