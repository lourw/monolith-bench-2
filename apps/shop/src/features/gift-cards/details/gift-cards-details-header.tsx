import { MarketingPanel } from '../../../components/marketing/panel/marketing-panel';
import { GIFT_CARDS_DETAILS_FEATURE } from './gift-cards-details.routes';

export interface GiftCardsDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_DETAILS_FEATURE.domain} ·{' '}
          {GIFT_CARDS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingPanel label="Items" value={count} tone="info" />
        <MarketingPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
