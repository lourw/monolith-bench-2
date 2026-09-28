import { DataHeader } from '../../../components/data/header/data-header';
import { REVIEWS_SUMMARY_FEATURE } from './reviews-summary.routes';

export interface ReviewsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReviewsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReviewsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${REVIEWS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{REVIEWS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {REVIEWS_SUMMARY_FEATURE.domain} · {REVIEWS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataHeader label="Items" value={count} tone="info" />
        <DataHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${REVIEWS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
