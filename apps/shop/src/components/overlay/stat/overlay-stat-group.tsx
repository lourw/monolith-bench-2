import { OverlayStat } from './overlay-stat';
import type {
  OverlayStatGroupProps,
  OverlayStatItem,
} from './overlay-stat.types';
import { toneFromValue } from './overlay-stat-variants';

export function OverlayStatGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-stat-group',
  onSelect,
}: OverlayStatGroupProps) {
  const handleSelect = (item: OverlayStatItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayStat
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

export default OverlayStatGroup;
