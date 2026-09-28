import { FormsList } from './forms-list';
import type { FormsListGroupProps, FormsListItem } from './forms-list.types';
import { toneFromValue } from './forms-list-variants';

export function FormsListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-list-group',
  onSelect,
}: FormsListGroupProps) {
  const handleSelect = (item: FormsListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsList
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

export default FormsListGroup;
