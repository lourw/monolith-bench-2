import { MarketingBanner } from '../../../components/marketing/banner/marketing-banner';
import { PROMOTIONS_OVERVIEW_FEATURE } from './promotions-overview.routes';

export interface PromotionsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_OVERVIEW_FEATURE.domain} ·{' '}
          {PROMOTIONS_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingBanner label="Items" value={count} tone="info" />
        <MarketingBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
