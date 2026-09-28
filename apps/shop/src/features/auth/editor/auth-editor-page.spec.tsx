import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthEditorPage } from './auth-editor-page';
import { AuthEditorSummary } from './auth-editor-summary';
import { AUTH_EDITOR_FEATURE, AUTH_EDITOR_ROUTE } from './auth-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_EDITOR_ROUTE]}>
      <AuthEditorPage />
    </MemoryRouter>,
  );
}

describe('AuthEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(AUTH_EDITOR_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_EDITOR_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${AUTH_EDITOR_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${AUTH_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${AUTH_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${AUTH_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthEditorSummary', () => {
  it('renders the summary block', () => {
    render(<AuthEditorSummary />);
    expect(
      screen.getByTestId(`${AUTH_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
