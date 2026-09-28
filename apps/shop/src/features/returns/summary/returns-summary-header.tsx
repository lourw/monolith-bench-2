import { ChartsList } from '../../../components/charts/list/charts-list';
import { RETURNS_SUMMARY_FEATURE } from './returns-summary.routes';

export interface ReturnsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function ReturnsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: ReturnsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{RETURNS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {RETURNS_SUMMARY_FEATURE.domain} · {RETURNS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsList label="Items" value={count} tone="info" />
        <ChartsList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${RETURNS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
