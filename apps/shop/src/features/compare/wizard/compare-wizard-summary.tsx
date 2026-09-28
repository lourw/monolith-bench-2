import { OverlayChipGroup } from '../../../components/overlay/chip/overlay-chip-group';
import { buildCompareWizardItems } from './compare-wizard.model';
import { COMPARE_WIZARD_FEATURE } from './compare-wizard.routes';
import {
  pickCompareWizardHighlights,
  totalCompareWizard,
} from './compare-wizard.utils';

export interface CompareWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CompareWizardSummary({
  compact = false,
  limit = 3,
}: CompareWizardSummaryProps) {
  const items = buildCompareWizardItems();
  const totals = totalCompareWizard(items);
  const highlights = pickCompareWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${COMPARE_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{COMPARE_WIZARD_FEATURE.title}</h3>
      <OverlayChipGroup
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
