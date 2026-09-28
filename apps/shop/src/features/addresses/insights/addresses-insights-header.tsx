import { ChartsChip } from '../../../components/charts/chip/charts-chip';
import { ADDRESSES_INSIGHTS_FEATURE } from './addresses-insights.routes';

export interface AddressesInsightsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesInsightsHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesInsightsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_INSIGHTS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_INSIGHTS_FEATURE.domain} ·{' '}
          {ADDRESSES_INSIGHTS_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <ChartsChip label="Items" value={count} tone="info" />
        <ChartsChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_INSIGHTS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
