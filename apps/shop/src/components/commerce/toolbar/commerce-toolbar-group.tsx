import { CommerceToolbar } from './commerce-toolbar';
import type {
  CommerceToolbarGroupProps,
  CommerceToolbarItem,
} from './commerce-toolbar.types';
import { toneFromValue } from './commerce-toolbar-variants';

export function CommerceToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-commerce-toolbar-group',
  onSelect,
}: CommerceToolbarGroupProps) {
  const handleSelect = (item: CommerceToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <CommerceToolbar
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

export default CommerceToolbarGroup;
