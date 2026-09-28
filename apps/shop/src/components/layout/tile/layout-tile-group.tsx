import { LayoutTile } from './layout-tile';
import type { LayoutTileGroupProps, LayoutTileItem } from './layout-tile.types';
import { toneFromValue } from './layout-tile-variants';

export function LayoutTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-layout-tile-group',
  onSelect,
}: LayoutTileGroupProps) {
  const handleSelect = (item: LayoutTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <LayoutTile
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

export default LayoutTileGroup;
