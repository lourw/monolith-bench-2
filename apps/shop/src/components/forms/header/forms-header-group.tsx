import { FormsHeader } from './forms-header';
import type {
  FormsHeaderGroupProps,
  FormsHeaderItem,
} from './forms-header.types';
import { toneFromValue } from './forms-header-variants';

export function FormsHeaderGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-forms-header-group',
  onSelect,
}: FormsHeaderGroupProps) {
  const handleSelect = (item: FormsHeaderItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <FormsHeader
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

export default FormsHeaderGroup;
