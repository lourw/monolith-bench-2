import { CommerceBanner } from '../../../components/commerce/banner/commerce-banner';
import { TRACKING_INSIGHTS_FEATURE } from './tracking-insights.routes';

export interface TrackingInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function TrackingInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: TrackingInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{TRACKING_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {TRACKING_INSIGHTS_FEATURE.domain} · {TRACKING_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceBanner label="Items" value={count} tone="info" />
        <CommerceBanner label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${TRACKING_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
