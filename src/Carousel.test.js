import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

//smoke test 
it("renders without crashing", function() {
  render(<Carousel />);
});

//snapshot test
it("matches snapshot", function() {
  const {asFragment} = render(<Carousel />);
  expect(asFragment()).toMatchSnapshot();
});

// Part 3: Bug! Left Arrow
// As you may have noticed, the left arrow and the right arrow both do the same thing: move to the next image in the image array. Write a (failing) test that checks for this bug. In other words, write a test that expects that when you’re on the second image, clicking the left arrow will move you to the first image. Once you’ve written a failing test, fix the app so that your test turns green.
it("moves forward with right arrow and back with left arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();

  // then move backward in the carousel
  const leftArrow = queryByTestId("left-arrow");
  fireEvent.click(leftArrow);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();
})


it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

// Part 4: Bug! Exhasting the Image Array
// As you may have noticed, if you’re on the last image and try to move forward, or if you’re on the first image and try to move backward, you get an error. To fix this, let’s just hide the left arrow on the first image and the right arrow on the last. 
// Write a (failing) test to check that the left arrow is missing when you’re on the first image, and that the right arrow is missing when you’re on the last image. Then fix the bug so that your test turns green.
it("displays only right arrow on first image", function() {
  const { queryByTestId } = render(<Carousel />);

  // expect the right arrow to show, but not the left
  expect(queryByTestId("right-arrow")).toBeInTheDocument();
  expect(queryByTestId("left-arrow")).not.toBeInTheDocument();
});

it("displays only left arrow on last image", function() {
  const { queryByTestId } = render(<Carousel />);

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);
  fireEvent.click(rightArrow);

  // expect the right arrow to show, but not the left
  expect(queryByTestId("left-arrow")).toBeInTheDocument();
  expect(rightArrow).not.toBeInTheDocument();
});