import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import { AUTH_HISTORY_FEATURE } from './auth-history.routes';

export interface AuthHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AuthHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AuthHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${AUTH_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{AUTH_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {AUTH_HISTORY_FEATURE.domain} · {AUTH_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackHeader label="Items" value={count} tone="info" />
        <FeedbackHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${AUTH_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
