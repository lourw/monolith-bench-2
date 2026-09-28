import { InputsBadge } from './inputs-badge';
import type {
  InputsBadgeGroupProps,
  InputsBadgeItem,
} from './inputs-badge.types';
import { toneFromValue } from './inputs-badge-variants';

export function InputsBadgeGroup({
  items,
  title,
  size = 'md',
  testId = 'ui-inputs-badge-group',
  onSelect,
}: InputsBadgeGroupProps) {
  const handleSelect = (item: InputsBadgeItem) => () => {
    if (onSelect) {
      onSelect(item);
    }
  };

  return (
    <section className="ui-group" data-testid={testId}>
      {title ? <h4 className="ui-group-title">{title}</h4> : null}
      <div className="ui-group-items">
        {items.map((item) => (
          <InputsBadge
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

export default InputsBadgeGroup;
