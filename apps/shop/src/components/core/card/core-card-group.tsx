import { CoreCard } from './core-card';
import type { CoreCardGroupProps, CoreCardItem } from './core-card.types';
import { toneFromValue } from './core-card-variants';

export function CoreCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-core-card-group',
  onSelect,
}: CoreCardGroupProps) {
  const handleSelect = (item: CoreCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CoreCard
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

export default CoreCardGroup;
