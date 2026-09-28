import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { ReturnsListPage } from './returns-list-page';
import { ReturnsListSummary } from './returns-list-summary';
import {
  RETURNS_LIST_FEATURE,
  RETURNS_LIST_ROUTE,
} from './returns-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[RETURNS_LIST_ROUTE]}>
      <ReturnsListPage />
    </MemoryRouter>,
  );
}

describe('ReturnsListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(RETURNS_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      RETURNS_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${RETURNS_LIST_FEATURE.testId}-row`),
    ).toHaveLength(RETURNS_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${RETURNS_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${RETURNS_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${RETURNS_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${RETURNS_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${RETURNS_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${RETURNS_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('ReturnsListSummary', () => {
  it('renders the summary block', () => {
    render(<ReturnsListSummary />);
    expect(
      screen.getByTestId(`${RETURNS_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
