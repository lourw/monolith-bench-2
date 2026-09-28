import { CommerceTile } from './commerce-tile';
import type {
  CommerceTileGroupProps,
  CommerceTileItem,
} from './commerce-tile.types';
import { toneFromValue } from './commerce-tile-variants';

export function CommerceTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-tile-group',
  onSelect,
}: CommerceTileGroupProps) {
  const handleSelect = (item: CommerceTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceTile
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

export default CommerceTileGroup;
