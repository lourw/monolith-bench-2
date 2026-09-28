import { DataChip } from '../../../components/data/chip/data-chip';
import { REVIEWS_INSIGHTS_FEATURE } from './reviews-insights.routes';

export interface ReviewsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_INSIGHTS_FEATURE.domain} · {REVIEWS_INSIGHTS_FEATURE.kind}
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
          data-testid={`${REVIEWS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
