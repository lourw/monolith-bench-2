import { TypographyTile } from './typography-tile';
import type {
  TypographyTileGroupProps,
  TypographyTileItem,
} from './typography-tile.types';
import { toneFromValue } from './typography-tile-variants';

export function TypographyTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-typography-tile-group',
  onSelect,
}: TypographyTileGroupProps) {
  const handleSelect = (item: TypographyTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <TypographyTile
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

export default TypographyTileGroup;
