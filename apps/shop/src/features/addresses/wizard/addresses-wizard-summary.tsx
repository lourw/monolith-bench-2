import { NavigationTileGroup } from '../../../components/navigation/tile/navigation-tile-group';
import { buildAddressesWizardItems } from './addresses-wizard.model';
import { ADDRESSES_WIZARD_FEATURE } from './addresses-wizard.routes';
import {
  pickAddressesWizardHighlights,
  totalAddressesWizard,
} from './addresses-wizard.utils';

export interface AddressesWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AddressesWizardSummary({
  compact = false,
  limit = 3,
}: AddressesWizardSummaryProps) {
  const items = buildAddressesWizardItems();
  const totals = totalAddressesWizard(items);
  const highlights = pickAddressesWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ADDRESSES_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {ADDRESSES_WIZARD_FEATURE.title}
      </h3>
      <NavigationTileGroup
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
