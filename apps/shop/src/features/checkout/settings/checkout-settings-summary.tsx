import { TypographyBadgeGroup } from '../../../components/typography/badge/typography-badge-group';
import { buildCheckoutSettingsItems } from './checkout-settings.model';
import { CHECKOUT_SETTINGS_FEATURE } from './checkout-settings.routes';
import {
  pickCheckoutSettingsHighlights,
  totalCheckoutSettings,
} from './checkout-settings.utils';

export interface CheckoutSettingsSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CheckoutSettingsSummary({
  compact = false,
  limit = 3,
}: CheckoutSettingsSummaryProps) {
  const items = buildCheckoutSettingsItems();
  const totals = totalCheckoutSettings(items);
  const highlights = pickCheckoutSettingsHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CHECKOUT_SETTINGS_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {CHECKOUT_SETTINGS_FEATURE.title}
      </h3>
      <TypographyBadgeGroup
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
