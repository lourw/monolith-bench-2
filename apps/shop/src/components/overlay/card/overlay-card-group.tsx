import { OverlayCard } from './overlay-card';
import type {
  OverlayCardGroupProps,
  OverlayCardItem,
} from './overlay-card.types';
import { toneFromValue } from './overlay-card-variants';

export function OverlayCardGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-card-group',
  onSelect,
}: OverlayCardGroupProps) {
  const handleSelect = (item: OverlayCardItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayCard
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

export default OverlayCardGroup;
