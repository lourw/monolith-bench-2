import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { NotificationsEditorPage } from './notifications-editor-page';
import { NotificationsEditorSummary } from './notifications-editor-summary';
import {
  NOTIFICATIONS_EDITOR_FEATURE,
  NOTIFICATIONS_EDITOR_ROUTE,
} from './notifications-editor.routes';

function renderPage() {
  return render(
    <MemoryRouter initialEntries={[NOTIFICATIONS_EDITOR_ROUTE]}>
      <NotificationsEditorPage />
    </MemoryRouter>,
  );
}

describe('NotificationsEditorPage', () => {
  it('renders the feature container and heading', () => {
    renderPage();
    expect(
      screen.getByTestId(NOTIFICATIONS_EDITOR_FEATURE.testId),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(
      NOTIFICATIONS_EDITOR_FEATURE.title,
    );
  });

  it('renders one row per item', () => {
    renderPage();
    expect(
      screen.getAllByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-row`),
    ).toHaveLength(NOTIFICATIONS_EDITOR_FEATURE.itemCount);
  });

  it('selects an item and shows it in the panel', () => {
    renderPage();
    const rows = screen.getAllByTestId(
      `${NOTIFICATIONS_EDITOR_FEATURE.testId}-row`,
    );
    const name = rows[0].querySelector('.feature-row-name')?.textContent ?? '';
    fireEvent.click(rows[0]);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-panel-name`),
    ).toHaveTextContent(name);
    fireEvent.click(
      screen.getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-clear`),
    );
    expect(
      screen.queryByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-panel-name`),
    ).not.toBeInTheDocument();
  });

  it('filters rows by query', () => {
    renderPage();
    fireEvent.change(
      screen.getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-filter`),
      {
        target: { value: 'zzz-no-match' },
      },
    );
    expect(
      screen.getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-empty`),
    ).toBeInTheDocument();
  });
});

describe('NotificationsEditorSummary', () => {
  it('renders the summary block', () => {
    render(<NotificationsEditorSummary />);
    expect(
      screen.getByTestId(`${NOTIFICATIONS_EDITOR_FEATURE.testId}-summary`),
    ).toBeInTheDocument();
  });
});
