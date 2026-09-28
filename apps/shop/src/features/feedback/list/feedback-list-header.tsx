import { MarketingHeader } from '../../../components/marketing/header/marketing-header';
import { FEEDBACK_LIST_FEATURE } from './feedback-list.routes';

export interface FeedbackListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function FeedbackListHeader({
  count,
  total,
  loading,
  onRefresh,
}: FeedbackListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${FEEDBACK_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{FEEDBACK_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {FEEDBACK_LIST_FEATURE.domain} · {FEEDBACK_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MarketingHeader label="Items" value={count} tone="info" />
        <MarketingHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${FEEDBACK_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
