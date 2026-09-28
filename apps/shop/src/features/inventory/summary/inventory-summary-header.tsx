import { TypographyCard } from '../../../components/typography/card/typography-card';
import { INVENTORY_SUMMARY_FEATURE } from './inventory-summary.routes';

export interface InventorySummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function InventorySummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: InventorySummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{INVENTORY_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {INVENTORY_SUMMARY_FEATURE.domain} · {INVENTORY_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <TypographyCard label="Items" value={count} tone="info" />
        <TypographyCard label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${INVENTORY_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
