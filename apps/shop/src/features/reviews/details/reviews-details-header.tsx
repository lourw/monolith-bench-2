import { CoreBadge } from '../../../components/core/badge/core-badge';
import { REVIEWS_DETAILS_FEATURE } from './reviews-details.routes';

export interface ReviewsDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_DETAILS_FEATURE.domain} · {REVIEWS_DETAILS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreBadge label="Items" value={count} tone="info" />
        <CoreBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
