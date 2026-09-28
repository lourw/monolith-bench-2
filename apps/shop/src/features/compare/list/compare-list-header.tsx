import { CommercePanel } from '../../../components/commerce/panel/commerce-panel';
import { COMPARE_LIST_FEATURE } from './compare-list.routes';

export interface CompareListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function CompareListHeader({
  count,
  total,
  loading,
  onRefresh,
}: CompareListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${COMPARE_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{COMPARE_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {COMPARE_LIST_FEATURE.domain} · {COMPARE_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommercePanel label="Items" value={count} tone="info" />
        <CommercePanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${COMPARE_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
