import { InputsList } from './inputs-list';
import type { InputsListGroupProps, InputsListItem } from './inputs-list.types';
import { toneFromValue } from './inputs-list-variants';

export function InputsListGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-list-group',
  onSelect,
}: InputsListGroupProps) {
  const handleSelect = (item: InputsListItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsList
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

export default InputsListGroup;
