import { FeedbackHeader } from '../../../components/feedback/header/feedback-header';
import { CHECKOUT_SUMMARY_FEATURE } from './checkout-summary.routes';

export interface CheckoutSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CheckoutSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: CheckoutSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{CHECKOUT_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {CHECKOUT_SUMMARY_FEATURE.domain} · {CHECKOUT_SUMMARY_FEATURE.kind}
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
          data-testid={`${CHECKOUT_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
