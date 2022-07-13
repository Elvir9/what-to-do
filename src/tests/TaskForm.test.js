import {render, fireEvent, screen} from '@testing-library/react';
import TaskForm from '../components/Task';

const setup = () => {
    render(<TaskForm />);
    const input = screen.getByLabelText('newTaskLabel');

    return {
      input,
      ...screen,
    }
  }

//test block
test('show the todo value', () => {
    const {input} = setup();
    const value = 'What Forsta can do for you?';

    fireEvent.change(input, {target: {value}});
    expect(input.value).toBe(value);
});

test('It should not allow letters to be inputted', () => {
    const {input} = setup();
    const value = '';

    expect(input.value).toBe('') // empty before
    fireEvent.change(input, {target: {value}});
    expect(input.value).toBe('') //empty after
  });