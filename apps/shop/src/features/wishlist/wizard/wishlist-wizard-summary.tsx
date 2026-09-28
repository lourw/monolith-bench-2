import { DataListGroup } from '../../../components/data/list/data-list-group';
import { buildWishlistWizardItems } from './wishlist-wizard.model';
import { WISHLIST_WIZARD_FEATURE } from './wishlist-wizard.routes';
import {
  pickWishlistWizardHighlights,
  totalWishlistWizard,
} from './wishlist-wizard.utils';

export interface WishlistWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function WishlistWizardSummary({
  compact = false,
  limit = 3,
}: WishlistWizardSummaryProps) {
  const items = buildWishlistWizardItems();
  const totals = totalWishlistWizard(items);
  const highlights = pickWishlistWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{WISHLIST_WIZARD_FEATURE.title}</h3>
      <DataListGroup
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
