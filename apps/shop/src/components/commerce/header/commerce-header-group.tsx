import { CommerceHeader } from './commerce-header';
import type {
  CommerceHeaderGroupProps,
  CommerceHeaderItem,
} from './commerce-header.types';
import { toneFromValue } from './commerce-header-variants';

export function CommerceHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-header-group',
  onSelect,
}: CommerceHeaderGroupProps) {
  const handleSelect = (item: CommerceHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceHeader
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

export default CommerceHeaderGroup;
