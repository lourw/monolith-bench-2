import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { PaymentsEditorPage } from './payments-editor-page';
import { PaymentsEditorSummary } from './payments-editor-summary';
import {
  PAYMENTS_EDITOR_FEATURE,
  PAYMENTS_EDITOR_ROUTE,
} from './payments-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[PAYMENTS_EDITOR_ROUTE]}>
      <PaymentsEditorPage />
    </MemoryRouter>,
  );
}

describe('PaymentsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(PAYMENTS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      PAYMENTS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(PAYMENTS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('PaymentsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<PaymentsEditorSummary />);
    expect(
      screen.getByTestId(`${PAYMENTS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
