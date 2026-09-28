import { DataStat } from '../../../components/data/stat/data-stat';
import { PROMOTIONS_LIST_FEATURE } from './promotions-list.routes';

export interface PromotionsListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsListHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_LIST_FEATURE.domain} · {PROMOTIONS_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataStat label="Items" value={count} tone="info" />
        <DataStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
