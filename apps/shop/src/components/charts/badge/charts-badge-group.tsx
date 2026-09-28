import { ChartsBadge } from './charts-badge';
import type {
  ChartsBadgeGroupProps,
  ChartsBadgeItem,
} from './charts-badge.types';
import { toneFromValue } from './charts-badge-variants';

export function ChartsBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-badge-group',
  onSelect,
}: ChartsBadgeGroupProps) {
  const handleSelect = (item: ChartsBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsBadge
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

export default ChartsBadgeGroup;
