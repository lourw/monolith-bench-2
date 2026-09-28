import { ChartsList } from './charts-list';
import type { ChartsListGroupProps, ChartsListItem } from './charts-list.types';
import { toneFromValue } from './charts-list-variants';

export function ChartsListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-list-group',
  onSelect,
}: ChartsListGroupProps) {
  const handleSelect = (item: ChartsListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsList
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

export default ChartsListGroup;
