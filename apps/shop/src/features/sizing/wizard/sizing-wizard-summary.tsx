import { CoreTileGroup } from '../../../components/core/tile/core-tile-group';
import { buildSizingWizardItems } from './sizing-wizard.model';
import { SIZING_WIZARD_FEATURE } from './sizing-wizard.routes';
import {
  pickSizingWizardHighlights,
  totalSizingWizard,
} from './sizing-wizard.utils';

export interface SizingWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function SizingWizardSummary({
  compact = false,
  limit = 3,
}: SizingWizardSummaryProps) {
  const items = buildSizingWizardItems();
  const totals = totalSizingWizard(items);
  const highlights = pickSizingWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${SIZING_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{SIZING_WIZARD_FEATURE.title}</h3>
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
