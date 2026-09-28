import { FormsStat } from '../../../components/forms/stat/forms-stat';
import type { BundlesEditorItem } from './bundles-editor.model';
import { BUNDLES_EDITOR_FEATURE } from './bundles-editor.routes';
import {
  formatBundlesEditorAmount,
  bundlesEditorStatusTone,
} from './bundles-editor.utils';

export interface BundlesEditorTableProps {
  items: ReadonlyArray<BundlesEditorItem>;
  selectedId: string | null;
  onSelect: (id: string) => void;
}

export function BundlesEditorTable({
  items,
  selectedId,
  onSelect,
}: BundlesEditorTableProps) {
  if (items.length === 0) {
    return (
      <p
        className="feature-empty"
        data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-empty`}
      >
        No bundles editor entries match the current filter.
      </p>
    );
  }

  return (
    <table
      className="feature-table"
      data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-table`}
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
            data-testid={`${BUNDLES_EDITOR_FEATURE.testId}-row`}
            data-item-id={item.id}
            aria-selected={item.id === selectedId}
            onClick={() => onSelect(item.id)}
          >
            <td className="feature-row-name">{item.name}</td>
            <td>{formatBundlesEditorAmount(item.amount)}</td>
            <td>{item.quantity}</td>
            <td>
              <FormsStat
                label={item.status}
                tone={bundlesEditorStatusTone(item.status)}
                size="sm"
                testId={`${BUNDLES_EDITOR_FEATURE.testId}-status-${item.id}`}
              />
            </td>
            <td>{item.tags.join(', ')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
