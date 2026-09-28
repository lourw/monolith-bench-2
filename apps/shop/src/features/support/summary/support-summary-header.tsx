import { DataCard } from '../../../components/data/card/data-card';
import { SUPPORT_SUMMARY_FEATURE } from './support-summary.routes';

export interface SupportSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_SUMMARY_FEATURE.domain} · {SUPPORT_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataCard label="Items" value={count} tone="info" />
        <DataCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
