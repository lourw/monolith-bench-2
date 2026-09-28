import { MediaStatGroup } from '../../../components/media/stat/media-stat-group';
import { buildTrackingWizardItems } from './tracking-wizard.model';
import { TRACKING_WIZARD_FEATURE } from './tracking-wizard.routes';
import {
  pickTrackingWizardHighlights,
  totalTrackingWizard,
} from './tracking-wizard.utils';

export interface TrackingWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function TrackingWizardSummary({
  compact = false,
  limit = 3,
}: TrackingWizardSummaryProps) {
  const items = buildTrackingWizardItems();
  const totals = totalTrackingWizard(items);
  const highlights = pickTrackingWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${TRACKING_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{TRACKING_WIZARD_FEATURE.title}</h3>
      <MediaStatGroup
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
