import { MarketingBannerGroup } from '../../../components/marketing/banner/marketing-banner-group';
import { buildAuthEditorItems } from './auth-editor.model';
import { AUTH_EDITOR_FEATURE } from './auth-editor.routes';
import { pickAuthEditorHighlights, totalAuthEditor } from './auth-editor.utils';

export interface AuthEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function AuthEditorSummary({
  compact = false,
  limit = 3,
}: AuthEditorSummaryProps) {
  const items = buildAuthEditorItems();
  const totals = totalAuthEditor(items);
  const highlights = pickAuthEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${AUTH_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{AUTH_EDITOR_FEATURE.title}</h3>
      <MarketingBannerGroup
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
