import { MediaList } from '../../../components/media/list/media-list';
import { SUPPORT_DETAILS_FEATURE } from './support-details.routes';

export interface SupportDetailsHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportDetailsHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportDetailsHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_DETAILS_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_DETAILS_FEATURE.domain} · {SUPPORT_DETAILS_FEATURE.kind}
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
          data-testid={`${SUPPORT_DETAILS_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
