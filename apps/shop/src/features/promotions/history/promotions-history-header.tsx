import { DataPanel } from '../../../components/data/panel/data-panel';
import { PROMOTIONS_HISTORY_FEATURE } from './promotions-history.routes';

export interface PromotionsHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_HISTORY_FEATURE.domain} ·{' '}
          {PROMOTIONS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataPanel label="Items" value={count} tone="info" />
        <DataPanel label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
