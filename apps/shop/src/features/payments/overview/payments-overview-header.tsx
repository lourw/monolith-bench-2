import { FeedbackChip } from '../../../components/feedback/chip/feedback-chip';
import { PAYMENTS_OVERVIEW_FEATURE } from './payments-overview.routes';

export interface PaymentsOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_OVERVIEW_FEATURE.domain} · {PAYMENTS_OVERVIEW_FEATURE.kind}
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
          data-testid={`${PAYMENTS_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
