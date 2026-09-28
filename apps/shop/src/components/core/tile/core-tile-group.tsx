import { CoreTile } from './core-tile';
import type { CoreTileGroupProps, CoreTileItem } from './core-tile.types';
import { toneFromValue } from './core-tile-variants';

export function CoreTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-core-tile-group',
  onSelect,
}: CoreTileGroupProps) {
  const handleSelect = (item: CoreTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CoreTile
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

export default CoreTileGroup;
