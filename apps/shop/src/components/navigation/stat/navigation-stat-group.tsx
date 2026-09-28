import { NavigationStat } from './navigation-stat';
import type {
  NavigationStatGroupProps,
  NavigationStatItem,
} from './navigation-stat.types';
import { toneFromValue } from './navigation-stat-variants';

export function NavigationStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-stat-group',
  onSelect,
}: NavigationStatGroupProps) {
  const handleSelect = (item: NavigationStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationStat
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

export default NavigationStatGroup;
