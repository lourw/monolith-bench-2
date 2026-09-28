import { CommerceStat } from '../../../components/commerce/stat/commerce-stat';
import { GIFT_CARDS_EDITOR_FEATURE } from './gift-cards-editor.routes';

export interface GiftCardsEditorHeaderProps {
  count: number;
  total: number;
  loading: boolean;
  onRefresh: () => void;
}

export function GiftCardsEditorHeader({
  count,
  total,
  loading,
  onRefresh,
}: GiftCardsEditorHeaderProps) {
  return (
    <header
      className="feature-header"
      data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-header`}
    >
      <div>
        <h1 className="feature-title">{GIFT_CARDS_EDITOR_FEATURE.title}</h1>
        <p className="feature-subtitle">
          {GIFT_CARDS_EDITOR_FEATURE.domain} · {GIFT_CARDS_EDITOR_FEATURE.kind}
        </p>
      </div>
      <div className="feature-header-actions">
        <CommerceStat label="Items" value={count} tone="info" />
        <CommerceStat label="Total" value={total} tone="success" />
        <button
          type="button"
          className="feature-button"
          onClick={onRefresh}
          disabled={loading}
          data-testid={`${GIFT_CARDS_EDITOR_FEATURE.testId}-refresh`}
        >
          {loading ? 'Refreshing…' : 'Refresh'}
        </button>
      </div>
    </header>
  );
}
