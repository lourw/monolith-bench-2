import { ChartsPanel } from './charts-panel';
import type {
  ChartsPanelGroupProps,
  ChartsPanelItem,
} from './charts-panel.types';
import { toneFromValue } from './charts-panel-variants';

export function ChartsPanelGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-panel-group',
  onSelect,
}: ChartsPanelGroupProps) {
  const handleSelect = (item: ChartsPanelItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsPanel
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

export default ChartsPanelGroup;
