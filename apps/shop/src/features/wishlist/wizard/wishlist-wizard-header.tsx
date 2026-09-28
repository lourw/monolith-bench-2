import { DataList } from '../../../components/data/list/data-list';
import { WISHLIST_WIZARD_FEATURE } from './wishlist-wizard.routes';

export interface WishlistWizardHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function WishlistWizardHeader({
  count,
  total,
  loading,
  onRefresh,
}: WishlistWizardHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{WISHLIST_WIZARD_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {WISHLIST_WIZARD_FEATURE.domain} · {WISHLIST_WIZARD_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <DataList label="Items" value={count} tone="info" />
        <DataList label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
