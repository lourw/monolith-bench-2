import { ChartsBanner } from './charts-banner';
import type {
  ChartsBannerGroupProps,
  ChartsBannerItem,
} from './charts-banner.types';
import { toneFromValue } from './charts-banner-variants';

export function ChartsBannerGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-charts-banner-group',
  onSelect,
}: ChartsBannerGroupProps) {
  const handleSelect = (item: ChartsBannerItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <ChartsBanner
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

export default ChartsBannerGroup;
