import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { SubscriptionsEditorPage } from './subscriptions-editor-page';
import { SubscriptionsEditorSummary } from './subscriptions-editor-summary';
import {
  SUBSCRIPTIONS_EDITOR_FEATURE,
  SUBSCRIPTIONS_EDITOR_ROUTE,
} from './subscriptions-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[SUBSCRIPTIONS_EDITOR_ROUTE]}>
      <SubscriptionsEditorPage />
    </MemoryRouter>,
  );
}

describe('SubscriptionsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(SUBSCRIPTIONS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      SUBSCRIPTIONS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(SUBSCRIPTIONS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('SubscriptionsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<SubscriptionsEditorSummary />);
    expect(
      screen.getByTestId(`${SUBSCRIPTIONS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
