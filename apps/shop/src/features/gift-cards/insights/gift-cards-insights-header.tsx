import { DataChip } from '../../../components/data/chip/data-chip';
import { GIFT_CARDS_INSIGHTS_FEATURE } from './gift-cards-insights.routes';

export interface GiftCardsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_INSIGHTS_FEATURE.domain} ·{' '}
          {GIFT_CARDS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataChip label="Items" value={count} tone="info" />
        <DataChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
