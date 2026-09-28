import { MarketingTile } from './marketing-tile';
import type {
  MarketingTileGroupProps,
  MarketingTileItem,
} from './marketing-tile.types';
import { toneFromValue } from './marketing-tile-variants';

export function MarketingTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-marketing-tile-group',
  onSelect,
}: MarketingTileGroupProps) {
  const handleSelect = (item: MarketingTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <MarketingTile
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

export default MarketingTileGroup;
