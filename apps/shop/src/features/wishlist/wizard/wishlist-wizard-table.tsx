import { FeedbackList } from '../../../components/feedback/list/feedback-list';
import type { WishlistWizardItem } from './wishlist-wizard.model';
import { WISHLIST_WIZARD_FEATURE } from './wishlist-wizard.routes';
import {
  formatWishlistWizardAmount,
  wishlistWizardStatusTone,
} from './wishlist-wizard.utils';

export interface WishlistWizardTableProps {
  items: ReadonlyArray<WishlistWizardItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function WishlistWizardTable({
  items,
  selectedId,
  onSelect,
}: WishlistWizardTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-empty`}
      >
        No wishlist wizard entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-table`}
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
            data-testid={`${WISHLIST_WIZARD_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatWishlistWizardAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FeedbackList
                label={item.status}
                tone={wishlistWizardStatusTone(item.status)}
                size="sm"
                testId={`${WISHLIST_WIZARD_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
