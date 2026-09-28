import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import { ACCOUNT_SUMMARY_FEATURE } from './account-summary.routes';

export interface AccountSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AccountSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AccountSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ACCOUNT_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ACCOUNT_SUMMARY_FEATURE.domain} · {ACCOUNT_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FeedbackChip label="Items" value={count} tone="info" />
        <FeedbackChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ACCOUNT_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
