import { LayoutChip } from '../../../components/layout/chip/layout-chip';
import { GIFT_CARDS_DASHBOARD_FEATURE } from './gift-cards-dashboard.routes';

export interface GiftCardsDashboardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsDashboardHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsDashboardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_DASHBOARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_DASHBOARD_FEATURE.domain} ·{' '}
          {GIFT_CARDS_DASHBOARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutChip label="Items" value={count} tone="info" />
        <LayoutChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_DASHBOARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
