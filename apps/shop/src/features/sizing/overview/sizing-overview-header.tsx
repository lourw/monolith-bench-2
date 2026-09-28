import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import { SIZING_OVERVIEW_FEATURE } from './sizing-overview.routes';

export interface SizingOverviewHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingOverviewHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingOverviewHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_OVERVIEW_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_OVERVIEW_FEATURE.domain} · {SIZING_OVERVIEW_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <FormsBadge label="Items" value={count} tone="info" />
        <FormsBadge label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SIZING_OVERVIEW_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
