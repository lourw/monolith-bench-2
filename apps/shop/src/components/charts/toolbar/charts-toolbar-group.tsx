import { ChartsToolbar } from './charts-toolbar';
import type {
  ChartsToolbarGroupProps,
  ChartsToolbarItem,
} from './charts-toolbar.types';
import { toneFromValue } from './charts-toolbar-variants';

export function ChartsToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-toolbar-group',
  onSelect,
}: ChartsToolbarGroupProps) {
  const handleSelect = (item: ChartsToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsToolbar
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

export default ChartsToolbarGroup;
