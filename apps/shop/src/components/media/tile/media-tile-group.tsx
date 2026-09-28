import { MediaTile } from './media-tile';
import type { MediaTileGroupProps, MediaTileItem } from './media-tile.types';
import { toneFromValue } from './media-tile-variants';

export function MediaTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-media-tile-group',
  onSelect,
}: MediaTileGroupProps) {
  const handleSelect = (item: MediaTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MediaTile
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

export default MediaTileGroup;
