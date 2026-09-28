import { CorePanel } from './core-panel';
import type { CorePanelGroupProps, CorePanelItem } from './core-panel.types';
import { toneFromValue } from './core-panel-variants';

export function CorePanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-core-panel-group',
  onSelect,
}: CorePanelGroupProps) {
  const handleSelect = (item: CorePanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CorePanel
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

export default CorePanelGroup;
