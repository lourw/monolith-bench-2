import { CommercePanelGroup } from '../../../components/commerce/panel/commerce-panel-group';
import { buildGiftCardsWizardItems } from './gift-cards-wizard.model';
import { GIFT_CARDS_WIZARD_FEATURE } from './gift-cards-wizard.routes';
import {
  pickGiftCardsWizardHighlights,
  totalGiftCardsWizard,
} from './gift-cards-wizard.utils';

export interface GiftCardsWizardSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function GiftCardsWizardSummary({
  compact = false,
  limit = 3,
}: GiftCardsWizardSummaryProps) {
  const items = buildGiftCardsWizardItems();
  const totals = totalGiftCardsWizard(items);
  const highlights = pickGiftCardsWizardHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">
        {GIFT_CARDS_WIZARD_FEATURE.title}
      </h3>
      <CommercePanelGroup
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
