import { MarketingToolbar } from '../../../components/marketing/toolbar/marketing-toolbar';
import { GIFT_CARDS_HISTORY_FEATURE } from './gift-cards-history.routes';

export interface GiftCardsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_HISTORY_FEATURE.domain} ·{' '}
          {GIFT_CARDS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingToolbar label="Items" value={count} tone="info" />
        <MarketingToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
