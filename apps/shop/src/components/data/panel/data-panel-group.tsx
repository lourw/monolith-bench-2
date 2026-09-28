import { DataPanel } from './data-panel';
import type { DataPanelGroupProps, DataPanelItem } from './data-panel.types';
import { toneFromValue } from './data-panel-variants';

export function DataPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-data-panel-group',
  onSelect,
}: DataPanelGroupProps) {
  const handleSelect = (item: DataPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <DataPanel
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

export default DataPanelGroup;
