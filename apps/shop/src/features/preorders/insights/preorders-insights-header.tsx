import { CommerceHeader } from '../../../components/commerce/header/commerce-header';
import { PREORDERS_INSIGHTS_FEATURE } from './preorders-insights.routes';

export interface PreordersInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_INSIGHTS_FEATURE.domain} ·{' '}
          {PREORDERS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceHeader label="Items" value={count} tone="info" />
        <CommerceHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
