import { InputsStat } from '../../../components/inputs/stat/inputs-stat';
import { SUPPORT_HISTORY_FEATURE } from './support-history.routes';

export interface SupportHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_HISTORY_FEATURE.domain} · {SUPPORT_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsStat label="Items" value={count} tone="info" />
        <InputsStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
