import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import { GIFT_CARDS_LIST_FEATURE } from './gift-cards-list.routes';

export interface GiftCardsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_LIST_FEATURE.domain} · {GIFT_CARDS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceToolbar label="Items" value={count} tone="info" />
        <CommerceToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
