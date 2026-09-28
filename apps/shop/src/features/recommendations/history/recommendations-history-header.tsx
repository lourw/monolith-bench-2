import { ChartsHeader } from '../../../components/charts/header/charts-header';
import { RECOMMENDATIONS_HISTORY_FEATURE } from './recommendations-history.routes';

export interface RecommendationsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function RecommendationsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: RecommendationsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">
          {RECOMMENDATIONS_HISTORY_FEATURE.title}
        </h1>
        <p className="feature-subtitle">
          {RECOMMENDATIONS_HISTORY_FEATURE.domain} ·{' '}
          {RECOMMENDATIONS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsHeader label="Items" value={count} tone="info" />
        <ChartsHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RECOMMENDATIONS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
