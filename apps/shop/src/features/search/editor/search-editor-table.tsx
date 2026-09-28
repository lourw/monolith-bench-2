import { MediaToolbar } from '../../../components/media/toolbar/media-toolbar';
import type { SearchEditorItem } from './search-editor.model';
import { SEARCH_EDITOR_FEATURE } from './search-editor.routes';
import {
  formatSearchEditorAmount,
  searchEditorStatusTone,
} from './search-editor.utils';

export interface SearchEditorTableProps {
  items: ReadonlyArray<SearchEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function SearchEditorTable({
  items,
  selectedId,
  onSelect,
}: SearchEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${SEARCH_EDITOR_FEATURE.testId}-empty`}
      >
        No search editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${SEARCH_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${SEARCH_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatSearchEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <MediaToolbar
                label={item.status}
                tone={searchEditorStatusTone(item.status)}
                size="sm"
                testId={`${SEARCH_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
