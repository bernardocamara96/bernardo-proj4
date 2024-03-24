import { render, screen } from "@testing-library/react";
import Task from "../task";

describe("Task", () => {
   test("renders Task component without crashing", () => {
      render(
         <Task
            id="1"
            title="Test Title"
            username_author="Test User"
            category_type="Test Category"
            description="Test Description"
            priority={1}
            buttonVisibility="visible"
            setFetchTrigger={() => {}}
            status="TO DO"
            type="draggable"
         />
      );
   });

   test("displays the correct title", () => {
      render(
         <Task
            id="1"
            title="Test Title"
            username_author="Test User"
            category_type="Test Category"
            description="Test Description"
            priority={1}
            buttonVisibility="visible"
            setFetchTrigger={() => {}}
            status="TO DO"
            type="draggable"
         />
      );
      expect(screen.getByText("Test Title")).toBeInTheDocument();
   });

   test("displays the correct username", () => {
      render(
         <Task
            id="1"
            title="Test Title"
            username_author="Test User"
            category_type="Test Category"
            description="Test Description"
            priority={1}
            buttonVisibility="visible"
            setFetchTrigger={() => {}}
            status="TO DO"
            type="draggable"
         />
      );
      expect(screen.getByText("Test User")).toBeInTheDocument();
   });
});
