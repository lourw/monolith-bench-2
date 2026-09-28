import { LayoutHeader } from '../../../components/layout/header/layout-header';
import { SIZING_SUMMARY_FEATURE } from './sizing-summary.routes';

export interface SizingSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_SUMMARY_FEATURE.domain} · {SIZING_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <LayoutHeader label="Items" value={count} tone="info" />
        <LayoutHeader label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SIZING_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
