import { OverlayList } from './overlay-list';
import type {
  OverlayListGroupProps,
  OverlayListItem,
} from './overlay-list.types';
import { toneFromValue } from './overlay-list-variants';

export function OverlayListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-overlay-list-group',
  onSelect,
}: OverlayListGroupProps) {
  const handleSelect = (item: OverlayListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <OverlayList
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

export default OverlayListGroup;
