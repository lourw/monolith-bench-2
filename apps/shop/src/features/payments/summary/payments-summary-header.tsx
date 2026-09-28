import { CoreStat } from '../../../components/core/stat/core-stat';
import { PAYMENTS_SUMMARY_FEATURE } from './payments-summary.routes';

export interface PaymentsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PaymentsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: PaymentsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PAYMENTS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PAYMENTS_SUMMARY_FEATURE.domain} · {PAYMENTS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreStat label="Items" value={count} tone="info" />
        <CoreStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PAYMENTS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
