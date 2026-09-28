import { OverlayHeader } from './overlay-header';
import type {
  OverlayHeaderGroupProps,
  OverlayHeaderItem,
} from './overlay-header.types';
import { toneFromValue } from './overlay-header-variants';

export function OverlayHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-header-group',
  onSelect,
}: OverlayHeaderGroupProps) {
  const handleSelect = (item: OverlayHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayHeader
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

export default OverlayHeaderGroup;
