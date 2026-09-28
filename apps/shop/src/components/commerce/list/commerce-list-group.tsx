import { CommerceList } from './commerce-list';
import type {
  CommerceListGroupProps,
  CommerceListItem,
} from './commerce-list.types';
import { toneFromValue } from './commerce-list-variants';

export function CommerceListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-list-group',
  onSelect,
}: CommerceListGroupProps) {
  const handleSelect = (item: CommerceListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceList
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

export default CommerceListGroup;
