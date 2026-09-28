import { LayoutToolbar } from '../../../components/layout/toolbar/layout-toolbar';
import type { WishlistEditorItem } from './wishlist-editor.model';
import { WISHLIST_EDITOR_FEATURE } from './wishlist-editor.routes';
import {
  formatWishlistEditorAmount,
  wishlistEditorStatusTone,
} from './wishlist-editor.utils';

export interface WishlistEditorTableProps {
  items: ReadonlyArray<WishlistEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistEditorTable({
  items,
  selectedId,
  onSelect,
}: WishlistEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-empty`}
      >
        No wishlist editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <LayoutToolbar
                label={item.status}
                tone={wishlistEditorStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
