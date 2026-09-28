import { MarketingToolbar } from '../../../components/marketing/toolbar/marketing-toolbar';
import { FEEDBACK_INSIGHTS_FEATURE } from './feedback-insights.routes';

export interface FeedbackInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_INSIGHTS_FEATURE.domain} · {FEEDBACK_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingToolbar label="Items" value={count} tone="info" />
        <MarketingToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${FEEDBACK_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
