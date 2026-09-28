import { FeedbackBanner } from '../../../components/feedback/banner/feedback-banner';
import type { ProfileEditorItem } from './profile-editor.model';
import { PROFILE_EDITOR_FEATURE } from './profile-editor.routes';
import {
  formatProfileEditorAmount,
  profileEditorStatusTone,
} from './profile-editor.utils';

export interface ProfileEditorTableProps {
  items: ReadonlyArray<ProfileEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function ProfileEditorTable({
  items,
  selectedId,
  onSelect,
}: ProfileEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${PROFILE_EDITOR_FEATURE.testId}-empty`}
      >
        No profile editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${PROFILE_EDITOR_FEATURE.testId}-table`}
    >
      <thead>
        <tr>
          <th>Name</th>
          <th>Amount</th>
          <th>Qty</th>
          <th>Status</th>
          <th>Tags</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => (
          <tr
            key={item.id}
            className={
              item.id === selectedId ? 'feature-row selected' : 'feature-row'
            }
            data-testid={`${PROFILE_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatProfileEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackBanner
                label={item.status}
                tone={profileEditorStatusTone(item.status)}
                size="sm"
                testId={`${PROFILE_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
