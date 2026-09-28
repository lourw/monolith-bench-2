import { MediaChip } from '../../../components/media/chip/media-chip';
import { PREORDERS_HISTORY_FEATURE } from './preorders-history.routes';

export interface PreordersHistoryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function PreordersHistoryHeader({
  count,
  total,
  loading,
  onRefresh,
}: PreordersHistoryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{PREORDERS_HISTORY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {PREORDERS_HISTORY_FEATURE.domain} · {PREORDERS_HISTORY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaChip label="Items" value={count} tone="info" />
        <MediaChip label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${PREORDERS_HISTORY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
