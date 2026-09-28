import { ChartsHeader } from './charts-header';
import type {
  ChartsHeaderGroupProps,
  ChartsHeaderItem,
} from './charts-header.types';
import { toneFromValue } from './charts-header-variants';

export function ChartsHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-header-group',
  onSelect,
}: ChartsHeaderGroupProps) {
  const handleSelect = (item: ChartsHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsHeader
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

export default ChartsHeaderGroup;
