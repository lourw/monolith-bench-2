import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { CompareListPage } from './compare-list-page';
import { CompareListSummary } from './compare-list-summary';
import {
  COMPARE_LIST_FEATURE,
  COMPARE_LIST_ROUTE,
} from './compare-list.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[COMPARE_LIST_ROUTE]}>
      <CompareListPage />
    </MemoryRouter>,
  );
}

describe('CompareListPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(screen.getByTestId(COMPARE_LIST_FEATURE.testId)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      COMPARE_LIST_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${COMPARE_LIST_FEATURE.testId}-row`),
    ).toHaveLength(COMPARE_LIST_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(`${COMPARE_LIST_FEATURE.testId}-row`);
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${COMPARE_LIST_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(screen.getByTestId(`${COMPARE_LIST_FEATURE.testId}-clear`));
    expect(
      screen.queryByTestId(`${COMPARE_LIST_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${COMPARE_LIST_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${COMPARE_LIST_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('CompareListSummary', () => {
  it('renders the summary block', () => {
    render(<CompareListSummary />);
    expect(
      screen.getByTestId(`${COMPARE_LIST_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
