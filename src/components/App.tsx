import React from 'react';
import { connect } from 'react-redux';
import { Todo, fetchTodos, deleteTodo } from '../actions';
import { StoreState } from '../reducers';

interface AppProps {
  todos: Todo[];
  fetchTodos: Function;
  deleteTodo: typeof deleteTodo;
}

// interface AppState {
//   fetching: boolean;
// }

class _App extends React.Component<AppProps /*AppState*/> {
  state = { fetching: false, showTopics: false };

  componentDidUpdate(prevProps: AppProps): void {
    if (!prevProps.todos.length && this.props.todos.length) {
      this.setState({ fetching: false });
    }
  }

  onButtonClick = (): void => {
    this.props.fetchTodos();
    this.setState({ fetching: true });
  };

  //must connect this to the incoming data from fetch- since not just
  //hiding components, but hiding an axios callback of data
  toggleDataHandler = () => {
    const doesShow = this.state.showTopics;
    this.setState({ showTopics: !doesShow });
  };

  renderList(): JSX.Element[] {
    return this.props.todos.map((todos: Todo) => {
      return <div key={todos.id}>{todos.title}</div>;
    });
  }

  render() {
    return (
      <div>
        <div>
          <button onClick={this.onButtonClick}>Fetch</button>
          {this.state.fetching ? 'LOADING' : null}
          {this.renderList()}
        </div>
        <div>
          <button onClick={this.toggleDataHandler}>Hide Data</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ todos }: StoreState): { todos: Todo[] } => {
  return { todos };
};

export const App = connect(
  mapStateToProps,
  { fetchTodos, deleteTodo }
)(_App);
