import { NavigationToolbar } from './navigation-toolbar';
import type {
  NavigationToolbarGroupProps,
  NavigationToolbarItem,
} from './navigation-toolbar.types';
import { toneFromValue } from './navigation-toolbar-variants';

export function NavigationToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-toolbar-group',
  onSelect,
}: NavigationToolbarGroupProps) {
  const handleSelect = (item: NavigationToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationToolbar
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

export default NavigationToolbarGroup;
