import { ChartsCard } from './charts-card';
import type { ChartsCardGroupProps, ChartsCardItem } from './charts-card.types';
import { toneFromValue } from './charts-card-variants';

export function ChartsCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-card-group',
  onSelect,
}: ChartsCardGroupProps) {
  const handleSelect = (item: ChartsCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsCard
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

export default ChartsCardGroup;
