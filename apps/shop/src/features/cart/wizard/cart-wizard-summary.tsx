import { CoreTileGroup } from '../../../components/core/tile/core-tile-group';
import { buildCartWizardItems } from './cart-wizard.model';
import { CART_WIZARD_FEATURE } from './cart-wizard.routes';
import { pickCartWizardHighlights, totalCartWizard } from './cart-wizard.utils';

export interface CartWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CartWizardSummary({
  compact = false,
  limit = 3,
}: CartWizardSummaryProps) {
  const items = buildCartWizardItems();
  const totals = totalCartWizard(items);
  const highlights = pickCartWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CART_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CART_WIZARD_FEATURE.title}</h3>
      <CoreTileGroup
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
