import { LayoutChipGroup } from '../../../components/layout/chip/layout-chip-group';
import { buildAccountWizardItems } from './account-wizard.model';
import { ACCOUNT_WIZARD_FEATURE } from './account-wizard.routes';
import {
  pickAccountWizardHighlights,
  totalAccountWizard,
} from './account-wizard.utils';

export interface AccountWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AccountWizardSummary({
  compact = false,
  limit = 3,
}: AccountWizardSummaryProps) {
  const items = buildAccountWizardItems();
  const totals = totalAccountWizard(items);
  const highlights = pickAccountWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${ACCOUNT_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{ACCOUNT_WIZARD_FEATURE.title}</h3>
      <LayoutChipGroup
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
