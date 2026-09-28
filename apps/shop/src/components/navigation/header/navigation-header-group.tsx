import { NavigationHeader } from './navigation-header';
import type {
  NavigationHeaderGroupProps,
  NavigationHeaderItem,
} from './navigation-header.types';
import { toneFromValue } from './navigation-header-variants';

export function NavigationHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-header-group',
  onSelect,
}: NavigationHeaderGroupProps) {
  const handleSelect = (item: NavigationHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationHeader
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

export default NavigationHeaderGroup;
