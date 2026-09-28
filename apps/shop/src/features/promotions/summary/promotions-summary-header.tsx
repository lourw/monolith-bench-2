import { InputsChip } from '../../../components/inputs/chip/inputs-chip';
import { PROMOTIONS_SUMMARY_FEATURE } from './promotions-summary.routes';

export interface PromotionsSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PromotionsSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: PromotionsSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PROMOTIONS_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PROMOTIONS_SUMMARY_FEATURE.domain} ·{' '}
          {PROMOTIONS_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <InputsChip label="Items" value={count} tone="info" />
        <InputsChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PROMOTIONS_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
