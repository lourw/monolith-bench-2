import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import { FEEDBACK_OVERVIEW_FEATURE } from './feedback-overview.routes';

export interface FeedbackOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_OVERVIEW_FEATURE.domain} · {FEEDBACK_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceStat label="Items" value={count} tone="info" />
        <CommerceStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${FEEDBACK_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
