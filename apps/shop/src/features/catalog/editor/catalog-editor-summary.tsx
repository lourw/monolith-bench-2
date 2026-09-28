import { DataStatGroup } from '../../../components/data/stat/data-stat-group';
import { buildCatalogEditorItems } from './catalog-editor.model';
import { CATALOG_EDITOR_FEATURE } from './catalog-editor.routes';
import {
  pickCatalogEditorHighlights,
  totalCatalogEditor,
} from './catalog-editor.utils';

export interface CatalogEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function CatalogEditorSummary({
  compact = false,
  limit = 3,
}: CatalogEditorSummaryProps) {
  const items = buildCatalogEditorItems();
  const totals = totalCatalogEditor(items);
  const highlights = pickCatalogEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${CATALOG_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{CATALOG_EDITOR_FEATURE.title}</h3>
      <DataStatGroup
        size="sm"
        items={[
          { id: 'items', label: 'Items', value: items.length },
          { id: 'amount', label: 'Amount', value: totals.amount },
          { id: 'active', label: 'Active', value: totals.active },
          { id: 'pending', label: 'Pending', value: totals.pending },
        ]}
      />
      {!compact ? (
        <ol className="feature-summary-highlights">
          {highlights.map((item) => (
            <li key={item.id}>
              {item.name} — {item.amount}
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
}
