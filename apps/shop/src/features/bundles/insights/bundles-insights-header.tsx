import { FormsCard } from '../../../components/forms/card/forms-card';
import { BUNDLES_INSIGHTS_FEATURE } from './bundles-insights.routes';

export interface BundlesInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function BundlesInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: BundlesInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{BUNDLES_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {BUNDLES_INSIGHTS_FEATURE.domain} · {BUNDLES_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsCard label="Items" value={count} tone="info" />
        <FormsCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${BUNDLES_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
