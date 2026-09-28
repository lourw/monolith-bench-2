import { MarketingBannerGroup } from '../../../components/marketing/banner/marketing-banner-group';
import { buildShippingWizardItems } from './shipping-wizard.model';
import { SHIPPING_WIZARD_FEATURE } from './shipping-wizard.routes';
import {
  pickShippingWizardHighlights,
  totalShippingWizard,
} from './shipping-wizard.utils';

export interface ShippingWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ShippingWizardSummary({
  compact = false,
  limit = 3,
}: ShippingWizardSummaryProps) {
  const items = buildShippingWizardItems();
  const totals = totalShippingWizard(items);
  const highlights = pickShippingWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SHIPPING_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SHIPPING_WIZARD_FEATURE.title}</h3>
      <MarketingBannerGroup
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
