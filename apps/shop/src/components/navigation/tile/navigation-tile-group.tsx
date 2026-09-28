import { NavigationTile } from './navigation-tile';
import type {
  NavigationTileGroupProps,
  NavigationTileItem,
} from './navigation-tile.types';
import { toneFromValue } from './navigation-tile-variants';

export function NavigationTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-tile-group',
  onSelect,
}: NavigationTileGroupProps) {
  const handleSelect = (item: NavigationTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationTile
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

export default NavigationTileGroup;
