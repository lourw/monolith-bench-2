import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { AuthListPage } from './auth-list-page';
import { AuthListSummary } from './auth-list-summary';
import { AUTH_LIST_FEATURE, AUTH_LIST_ROUTE } from './auth-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[AUTH_LIST_ROUTE]}>
      <AuthListPage />
    </MemoryRouter>,
  );
}

describe('AuthListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(AUTH_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      AUTH_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${AUTH_LIST_FEATURE.testId}-row`),
    ).toHaveLength(AUTH_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${AUTH_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${AUTH_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${AUTH_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${AUTH_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(screen.getByTestId(`${AUTH_LIST_FEATURE.testId}-filter`), {
      target: { value: 'zzz-no-match' },
    });
    expect(
      screen.getByTestId(`${AUTH_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('AuthListSummary', () => {
  it('renders the summary block', () => {
    render(<AuthListSummary />);
    expect(
      screen.getByTestId(`${AUTH_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
