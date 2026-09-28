import { TypographyChip } from '../../../components/typography/chip/typography-chip';
import { GIFT_CARDS_OVERVIEW_FEATURE } from './gift-cards-overview.routes';

export interface GiftCardsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_OVERVIEW_FEATURE.domain} ·{' '}
          {GIFT_CARDS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyChip label="Items" value={count} tone="info" />
        <TypographyChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
