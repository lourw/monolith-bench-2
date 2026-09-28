import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { LoyaltyEditorPage } from './loyalty-editor-page';
import { LoyaltyEditorSummary } from './loyalty-editor-summary';
import {
  LOYALTY_EDITOR_FEATURE,
  LOYALTY_EDITOR_ROUTE,
} from './loyalty-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[LOYALTY_EDITOR_ROUTE]}>
      <LoyaltyEditorPage />
    </MemoryRouter>,
  );
}

describe('LoyaltyEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(LOYALTY_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      LOYALTY_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(LOYALTY_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('LoyaltyEditorSummary', () => {
  it('renders the summary block', () => {
    render(<LoyaltyEditorSummary />);
    expect(
      screen.getByTestId(`${LOYALTY_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
