import { CommercePanel } from '../../../components/commerce/panel/commerce-panel';
import { GIFT_CARDS_WIZARD_FEATURE } from './gift-cards-wizard.routes';

export interface GiftCardsWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_WIZARD_FEATURE.domain} · {GIFT_CARDS_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommercePanel label="Items" value={count} tone="info" />
        <CommercePanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
