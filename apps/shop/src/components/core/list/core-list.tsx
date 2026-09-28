import { collectionPhone } from '../../../utils/collection/collection-phone';
import { CorePanel } from '../panel/core-panel';
import type { CoreListProps } from './core-list.types';
import { resolveCoreListStyle } from './core-list-variants';

export function CoreList({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-core-list',
  onSelect,
  children,
}: CoreListProps) {
  const formatted = value === undefined ? '' : collectionPhone(value);
  const style = resolveCoreListStyle(tone, size);
  const ariaLabel = label;

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-core-list ui-element"
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
      <CorePanel label="Core Panel" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default CoreList;
