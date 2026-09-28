import { FeedbackHeaderGroup } from '../../../components/feedback/header/feedback-header-group';
import { buildProfileWizardItems } from './profile-wizard.model';
import { PROFILE_WIZARD_FEATURE } from './profile-wizard.routes';
import {
  pickProfileWizardHighlights,
  totalProfileWizard,
} from './profile-wizard.utils';

export interface ProfileWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileWizardSummary({
  compact = false,
  limit = 3,
}: ProfileWizardSummaryProps) {
  const items = buildProfileWizardItems();
  const totals = totalProfileWizard(items);
  const highlights = pickProfileWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PROFILE_WIZARD_FEATURE.title}</h3>
      <FeedbackHeaderGroup
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
