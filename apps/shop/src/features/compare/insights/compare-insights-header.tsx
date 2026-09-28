import { DataBanner } from '../../../components/data/banner/data-banner';
import { COMPARE_INSIGHTS_FEATURE } from './compare-insights.routes';

export interface CompareInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_INSIGHTS_FEATURE.domain} · {COMPARE_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataBanner label="Items" value={count} tone="info" />
        <DataBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
