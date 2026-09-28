import { OverlayTile } from './overlay-tile';
import type {
  OverlayTileGroupProps,
  OverlayTileItem,
} from './overlay-tile.types';
import { toneFromValue } from './overlay-tile-variants';

export function OverlayTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-tile-group',
  onSelect,
}: OverlayTileGroupProps) {
  const handleSelect = (item: OverlayTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayTile
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

export default OverlayTileGroup;
