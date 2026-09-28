import { FeedbackTileGroup } from '../../../components/feedback/tile/feedback-tile-group';
import { buildAuthWizardItems } from './auth-wizard.model';
import { AUTH_WIZARD_FEATURE } from './auth-wizard.routes';
import { pickAuthWizardHighlights, totalAuthWizard } from './auth-wizard.utils';

export interface AuthWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthWizardSummary({
  compact = false,
  limit = 3,
}: AuthWizardSummaryProps) {
  const items = buildAuthWizardItems();
  const totals = totalAuthWizard(items);
  const highlights = pickAuthWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_WIZARD_FEATURE.title}</h3>
      <FeedbackTileGroup
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
