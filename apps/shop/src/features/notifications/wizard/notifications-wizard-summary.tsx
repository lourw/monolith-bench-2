import { FormsCardGroup } from '../../../components/forms/card/forms-card-group';
import { buildNotificationsWizardItems } from './notifications-wizard.model';
import { NOTIFICATIONS_WIZARD_FEATURE } from './notifications-wizard.routes';
import {
  pickNotificationsWizardHighlights,
  totalNotificationsWizard,
} from './notifications-wizard.utils';

export interface NotificationsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function NotificationsWizardSummary({
  compact = false,
  limit = 3,
}: NotificationsWizardSummaryProps) {
  const items = buildNotificationsWizardItems();
  const totals = totalNotificationsWizard(items);
  const highlights = pickNotificationsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${NOTIFICATIONS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {NOTIFICATIONS_WIZARD_FEATURE.title}
      </h3>
      <FormsCardGroup
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
