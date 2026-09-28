import { FormsBannerGroup } from '../../../components/forms/banner/forms-banner-group';
import { buildStoreLocatorWizardItems } from './store-locator-wizard.model';
import { STORE_LOCATOR_WIZARD_FEATURE } from './store-locator-wizard.routes';
import {
  pickStoreLocatorWizardHighlights,
  totalStoreLocatorWizard,
} from './store-locator-wizard.utils';

export interface StoreLocatorWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function StoreLocatorWizardSummary({
  compact = false,
  limit = 3,
}: StoreLocatorWizardSummaryProps) {
  const items = buildStoreLocatorWizardItems();
  const totals = totalStoreLocatorWizard(items);
  const highlights = pickStoreLocatorWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${STORE_LOCATOR_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {STORE_LOCATOR_WIZARD_FEATURE.title}
      </h3>
      <FormsBannerGroup
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
