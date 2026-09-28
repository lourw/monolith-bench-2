import { NavigationPanel } from './navigation-panel';
import type {
  NavigationPanelGroupProps,
  NavigationPanelItem,
} from './navigation-panel.types';
import { toneFromValue } from './navigation-panel-variants';

export function NavigationPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-navigation-panel-group',
  onSelect,
}: NavigationPanelGroupProps) {
  const handleSelect = (item: NavigationPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <NavigationPanel
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

export default NavigationPanelGroup;
