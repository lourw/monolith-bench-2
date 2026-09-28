import { CoreStat } from './core-stat';
import type { CoreStatGroupProps, CoreStatItem } from './core-stat.types';
import { toneFromValue } from './core-stat-variants';

export function CoreStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-core-stat-group',
  onSelect,
}: CoreStatGroupProps) {
  const handleSelect = (item: CoreStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CoreStat
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

export default CoreStatGroup;
