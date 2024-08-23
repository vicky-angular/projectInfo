/* eslint-disable no-undef */
// App.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { fireEvent } from "@testing-library/dom";
import App from "./App";

test("renders HomePage by default", () => {
  const { container } = render(<App />);
  expect(container).toBeInTheDocument();

});

test("default navigates to Projects", () => {
  render(
      <App />
  );
    const projects = screen.getByTestId('test-projects');
    expect(projects).toBeInTheDocument();
});

test("navigates to Projects", () => {
  render(
      <App />
  );
  const projectsClick = screen.getByTestId('test-Projects');
  const History = screen.getByTestId('test-History');
  expect(projectsClick).toBeInTheDocument();
  expect(History).toBeInTheDocument();
  fireEvent.click(projectsClick);
  const projects = screen.getByTestId('test-projects');
  expect(projects).toBeInTheDocument();
  // Assert that the AboutPage is rendered after navigation
});

test("default navigates to History", async () => {
  render(
      <App />
  );
  const HistoryClick = screen.getByTestId('test-History');
  expect(HistoryClick).toBeInTheDocument();
  fireEvent.click(HistoryClick);
  await waitFor(() => {
    // Assert that the message is in the document after the data is fetched
    const historyPage = screen.getByTestId('test-history');
    expect(historyPage).toBeInTheDocument();
  });
 
  // Assert that the AboutPage is rendered after navigation
});

test("nav navigates to Projects", () => {
  render(
      <App />
  );
  const projectsClick = screen.getByTestId('test-Projects-btn');
  const History = screen.getByTestId('test-History-btn');
  expect(projectsClick).toBeInTheDocument();
  expect(History).toBeInTheDocument();
  fireEvent.click(projectsClick);
  const projects = screen.getByTestId('test-projects');
  expect(projects).toBeInTheDocument();
  // Assert that the AboutPage is rendered after navigation
});

test("nav default navigates to History", async () => {
  render(
      <App />
  );
  const HistoryClick = screen.getByTestId('test-History-btn');
  expect(HistoryClick).toBeInTheDocument();
  fireEvent.click(HistoryClick);
  await waitFor(() => {
    // Assert that the message is in the document after the data is fetched
    const historyPage = screen.getByTestId('test-history');
    expect(historyPage).toBeInTheDocument();
  });
 
  // Assert that the AboutPage is rendered after navigation
});

// test("navigates back to History when Home link is clicked", () => {
//   // Render the App component with Router context
//   render(
//       <App />
//   );

//   // Simulate clicking on the "About" link
//   fireEvent.click(screen.getByText("History"));

//   // Assert that the AboutPage is rendered after navigation
//   expect(screen.getByText("Applicant")).toBeInTheDocument();

//   // Simulate clicking on the "Home" link
//   // fireEvent.click(screen.getByText("Home"));

//   // Assert that the HomePage is rendered after navigation
//   // expect(screen.getByText("Home Page")).toBeInTheDocument();
// });
