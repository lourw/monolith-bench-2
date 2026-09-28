import { FormsPanel } from '../../../components/forms/panel/forms-panel';
import { PROMOTIONS_INSIGHTS_FEATURE } from './promotions-insights.routes';

export interface PromotionsInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_INSIGHTS_FEATURE.domain} ·{' '}
          {PROMOTIONS_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsPanel label="Items" value={count} tone="info" />
        <FormsPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
