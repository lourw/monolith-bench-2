import { DataHeaderGroup } from '../../../components/data/header/data-header-group';
import { buildReturnsWizardItems } from './returns-wizard.model';
import { RETURNS_WIZARD_FEATURE } from './returns-wizard.routes';
import {
  pickReturnsWizardHighlights,
  totalReturnsWizard,
} from './returns-wizard.utils';

export interface ReturnsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ReturnsWizardSummary({
  compact = false,
  limit = 3,
}: ReturnsWizardSummaryProps) {
  const items = buildReturnsWizardItems();
  const totals = totalReturnsWizard(items);
  const highlights = pickReturnsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${RETURNS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{RETURNS_WIZARD_FEATURE.title}</h3>
      <DataHeaderGroup
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
