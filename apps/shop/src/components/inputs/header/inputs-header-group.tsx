import { InputsHeader } from './inputs-header';
import type {
  InputsHeaderGroupProps,
  InputsHeaderItem,
} from './inputs-header.types';
import { toneFromValue } from './inputs-header-variants';

export function InputsHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-header-group',
  onSelect,
}: InputsHeaderGroupProps) {
  const handleSelect = (item: InputsHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsHeader
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

export default InputsHeaderGroup;
