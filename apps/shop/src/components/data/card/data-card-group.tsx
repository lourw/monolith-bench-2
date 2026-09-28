import { DataCard } from './data-card';
import type { DataCardGroupProps, DataCardItem } from './data-card.types';
import { toneFromValue } from './data-card-variants';

export function DataCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-card-group',
  onSelect,
}: DataCardGroupProps) {
  const handleSelect = (item: DataCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataCard
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

export default DataCardGroup;
