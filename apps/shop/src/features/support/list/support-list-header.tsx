import { CommerceToolbar } from '../../../components/commerce/toolbar/commerce-toolbar';
import { SUPPORT_LIST_FEATURE } from './support-list.routes';

export interface SupportListHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function SupportListHeader({
  count,
  total,
  loading,
  onRefresh,
}: SupportListHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${SUPPORT_LIST_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{SUPPORT_LIST_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {SUPPORT_LIST_FEATURE.domain} · {SUPPORT_LIST_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceToolbar label="Items" value={count} tone="info" />
        <CommerceToolbar label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${SUPPORT_LIST_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
