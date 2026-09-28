import { LayoutBanner } from '../../../components/layout/banner/layout-banner';
import { SIZING_INSIGHTS_FEATURE } from './sizing-insights.routes';

export interface SizingInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_INSIGHTS_FEATURE.domain} · {SIZING_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutBanner label="Items" value={count} tone="info" />
        <LayoutBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SIZING_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
