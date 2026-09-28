import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AccountEditorPage } from './account-editor-page';
import { AccountEditorSummary } from './account-editor-summary';
import {
  ACCOUNT_EDITOR_FEATURE,
  ACCOUNT_EDITOR_ROUTE,
} from './account-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[ACCOUNT_EDITOR_ROUTE]}>
      <AccountEditorPage />
    </MemoryRouter>,
  );
}

describe('AccountEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(ACCOUNT_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      ACCOUNT_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(ACCOUNT_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AccountEditorSummary', () => {
  it('renders the summary block', () => {
    render(<AccountEditorSummary />);
    expect(
      screen.getByTestId(`${ACCOUNT_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
