import { ChartsTile } from './charts-tile';
import type { ChartsTileGroupProps, ChartsTileItem } from './charts-tile.types';
import { toneFromValue } from './charts-tile-variants';

export function ChartsTileGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-tile-group',
  onSelect,
}: ChartsTileGroupProps) {
  const handleSelect = (item: ChartsTileItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsTile
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

export default ChartsTileGroup;
