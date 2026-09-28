import { FormsBadge } from '../../../components/forms/badge/forms-badge';
import { SIZING_DETAILS_FEATURE } from './sizing-details.routes';

export interface SizingDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SizingDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SizingDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SIZING_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SIZING_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SIZING_DETAILS_FEATURE.domain} · {SIZING_DETAILS_FEATURE.kind}
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
          data-testid={`${SIZING_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
