import { mathDate } from '../../../utils/math/math-date';
import { collectionAddress } from '../../../utils/collection/collection-address';
import { CoreList } from '../../core/list/core-list';
import type { FormsPanelProps } from './forms-panel.types';
import { resolveFormsPanelStyle } from './forms-panel-variants';

export function FormsPanel({
  label,
  value,
  tone = 'neutral',
  size = 'md',
  testId = 'ui-forms-panel',
  onSelect,
  children,
}: FormsPanelProps) {
  const formatted = value === undefined ? '' : mathDate(value);
  const style = resolveFormsPanelStyle(tone, size);
  const ariaLabel = collectionAddress(label);

  const handleClick = () => {
    if (onSelect) {
      onSelect(label);
    }
  };

  return (
    <div
      className="ui-forms-panel ui-element"
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
      <CoreList label="Core List" value={value} tone={tone} size="sm" />
    </div>
  );
}

export default FormsPanel;
