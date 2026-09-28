import { InputsToolbar } from './inputs-toolbar';
import type {
  InputsToolbarGroupProps,
  InputsToolbarItem,
} from './inputs-toolbar.types';
import { toneFromValue } from './inputs-toolbar-variants';

export function InputsToolbarGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-toolbar-group',
  onSelect,
}: InputsToolbarGroupProps) {
  const handleSelect = (item: InputsToolbarItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsToolbar
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

export default InputsToolbarGroup;
