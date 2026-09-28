import { storageSlug } from '../../../utils/storage/storage-slug';
import { mathSlug } from '../../../utils/math/math-slug';
import { CommerceToolbar } from '../../commerce/toolbar/commerce-toolbar';
import type { InputsListProps } from './inputs-list.types';
import { resolveInputsListStyle } from './inputs-list-variants';

export function InputsList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-inputs-list',
  onSelect,
  children,
}: InputsListProps) {
  const formatted = value === undefined ? '' : storageSlug(value);
  const style = resolveInputsListStyle(tone, size);
  const ariaLabel = mathSlug(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-inputs-list ui-element"
      data-testid={testId}
      data-tone={tone}
      data-size={size}
      style={style}
      aria-label={ariaLabel}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onClick={onSelect ? handleClick : undefined}
    >
      <span className="ui-label">{label}</span>
      {formatted ? <span className="ui-value">{formatted}</span> : null}
      {children ? <div className="ui-content">{children}</div> : null}
      <CommerceToolbar
        label="Commerce Toolbar"
        value={value}
        tone={tone}
        size="sm"
      />
    </div>
  );
}

export default InputsList;
