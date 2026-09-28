import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import { GIFT_CARDS_SUMMARY_FEATURE } from './gift-cards-summary.routes';

export interface GiftCardsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_SUMMARY_FEATURE.domain} ·{' '}
          {GIFT_CARDS_SUMMARY_FEATURE.kind}
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
          data-testid={`${GIFT_CARDS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
