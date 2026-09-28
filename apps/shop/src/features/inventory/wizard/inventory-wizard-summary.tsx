import { InputsToolbarGroup } from '../../../components/inputs/toolbar/inputs-toolbar-group';
import { buildInventoryWizardItems } from './inventory-wizard.model';
import { INVENTORY_WIZARD_FEATURE } from './inventory-wizard.routes';
import {
  pickInventoryWizardHighlights,
  totalInventoryWizard,
} from './inventory-wizard.utils';

export interface InventoryWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function InventoryWizardSummary({
  compact = false,
  limit = 3,
}: InventoryWizardSummaryProps) {
  const items = buildInventoryWizardItems();
  const totals = totalInventoryWizard(items);
  const highlights = pickInventoryWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${INVENTORY_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {INVENTORY_WIZARD_FEATURE.title}
      </h3>
      <InputsToolbarGroup
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
