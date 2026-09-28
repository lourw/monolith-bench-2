import { MediaBadgeGroup } from '../../../components/media/badge/media-badge-group';
import { buildProfileEditorItems } from './profile-editor.model';
import { PROFILE_EDITOR_FEATURE } from './profile-editor.routes';
import {
  pickProfileEditorHighlights,
  totalProfileEditor,
} from './profile-editor.utils';

export interface ProfileEditorSummaryProps {
  compact?: boolean;
  limit?: number;
}

/**
 * Compact, self-contained summary of this feature. Other features embed it to
 * surface related information without owning the data themselves.
 */
export function ProfileEditorSummary({
  compact = false,
  limit = 3,
}: ProfileEditorSummaryProps) {
  const items = buildProfileEditorItems();
  const totals = totalProfileEditor(items);
  const highlights = pickProfileEditorHighlights(items, limit);

  return (
    <section
      className={compact ? 'feature-summary compact' : 'feature-summary'}
      data-testid={`${PROFILE_EDITOR_FEATURE.testId}-summary`}
    >
      <h3 className="feature-summary-title">{PROFILE_EDITOR_FEATURE.title}</h3>
      <MediaBadgeGroup
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
