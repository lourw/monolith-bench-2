import { FeedbackTile } from '../../../components/feedback/tile/feedback-tile';
import { STORE_LOCATOR_INSIGHTS_FEATURE } from './store-locator-insights.routes';

export interface StoreLocatorInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function StoreLocatorInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: StoreLocatorInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {STORE_LOCATOR_INSIGHTS_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {STORE_LOCATOR_INSIGHTS_FEATURE.domain} ·{' '}
          {STORE_LOCATOR_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackTile label="Items" value={count} tone="info" />
        <FeedbackTile label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${STORE_LOCATOR_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
