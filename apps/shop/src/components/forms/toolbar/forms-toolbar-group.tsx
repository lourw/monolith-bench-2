import { FormsToolbar } from './forms-toolbar';
import type {
  FormsToolbarGroupProps,
  FormsToolbarItem,
} from './forms-toolbar.types';
import { toneFromValue } from './forms-toolbar-variants';

export function FormsToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-toolbar-group',
  onSelect,
}: FormsToolbarGroupProps) {
  const handleSelect = (item: FormsToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsToolbar
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

export default FormsToolbarGroup;
