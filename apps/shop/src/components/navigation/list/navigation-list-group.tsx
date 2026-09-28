import { NavigationList } from './navigation-list';
import type {
  NavigationListGroupProps,
  NavigationListItem,
} from './navigation-list.types';
import { toneFromValue } from './navigation-list-variants';

export function NavigationListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-list-group',
  onSelect,
}: NavigationListGroupProps) {
  const handleSelect = (item: NavigationListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationList
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

export default NavigationListGroup;
