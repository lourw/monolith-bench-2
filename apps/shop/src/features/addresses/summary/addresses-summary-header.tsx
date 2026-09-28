import { MediaList } from '../../../components/media/list/media-list';
import { ADDRESSES_SUMMARY_FEATURE } from './addresses-summary.routes';

export interface AddressesSummaryHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function AddressesSummaryHeader({
  count,
  total,
  loading,
  onRefresh,
}: AddressesSummaryHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{ADDRESSES_SUMMARY_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {ADDRESSES_SUMMARY_FEATURE.domain} · {ADDRESSES_SUMMARY_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <MediaList label="Items" value={count} tone="info" />
        <MediaList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${ADDRESSES_SUMMARY_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
