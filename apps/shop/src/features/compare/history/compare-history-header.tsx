import { FormsCard } from '../../../components/forms/card/forms-card';
import { COMPARE_HISTORY_FEATURE } from './compare-history.routes';

export interface CompareHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_HISTORY_FEATURE.domain} · {COMPARE_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsCard label="Items" value={count} tone="info" />
        <FormsCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
