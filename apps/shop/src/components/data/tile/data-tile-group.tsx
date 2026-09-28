import { DataTile } from './data-tile';
import type { DataTileGroupProps, DataTileItem } from './data-tile.types';
import { toneFromValue } from './data-tile-variants';

export function DataTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-tile-group',
  onSelect,
}: DataTileGroupProps) {
  const handleSelect = (item: DataTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataTile
            key={item.id}
            label={item.label}
            value={item.value}
            size={size}
            tone={item.tone ?? toneFromValue(item.value)}
            testId={`${testId}-${item.id}`}
            onSelect={onSelect ? handleSelect(item) : undefined}
          />
        ))}
      </div>
      {items.length === 0 ? (
        <p className="ui-group-empty">Nothing to show</p>
      ) : null}
    </section>
  );
}

export default DataTileGroup;
