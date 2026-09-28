import { CoreCard } from '../../../components/core/card/core-card';
import { SIZING_LIST_FEATURE } from './sizing-list.routes';

export interface SizingListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingListHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_LIST_FEATURE.domain} · {SIZING_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CoreCard label="Items" value={count} tone="info" />
        <CoreCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SIZING_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
