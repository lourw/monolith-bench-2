import { ErrorMessage } from '../../../components/shared/error-message/error-message';
import { LoadingSpinner } from '../../../components/shared/loading-spinner/loading-spinner';
import { GiftCardsEditorFilters } from './gift-cards-editor-filters';
import { GiftCardsEditorHeader } from './gift-cards-editor-header';
import { GiftCardsEditorPanel } from './gift-cards-editor-panel';
import { GiftCardsEditorTable } from './gift-cards-editor-table';
import { GIFT_CARDS_EDITOR_FEATURE } from './gift-cards-editor.routes';
import { useGiftCardsEditor } from './use-gift-cards-editor';

export function GiftCardsEditorPage() {
  const {
    items,
    selected,
    query,
    sortKey,
    loading,
    error,
    totals,
    select,
    setQuery,
    setSortKey,
    refresh,
  } = useGiftCardsEditor();

  return (
    <section
      className="feature-page"
      data-testid={GIFT_CARDS_EDITOR_FEATURE.testId}
    >
      <GiftCardsEditorHeader
        count={items.length}
        total={totals.amount}
        loading={loading}
        onRefresh={refresh}
      />
      <GiftCardsEditorFilters
        query={query}
        sortKey={sortKey}
        onQueryChange={setQuery}
        onSortChange={setSortKey}
      />
      {error ? <ErrorMessage message={error} onRetry={refresh} /> : null}
      {loading ? <LoadingSpinner /> : null}
      <div className="feature-body">
        <div className="feature-main">
          <GiftCardsEditorTable
            items={items}
            selectedId={selected?.id ?? null}
            onSelect={select}
          />
        </div>
        <div className="feature-side">
          <GiftCardsEditorPanel
            selected={selected}
            onClear={() => select(null)}
          />
        </div>
      </div>
    </section>
  );
}

export default GiftCardsEditorPage;
