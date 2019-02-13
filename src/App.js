/* 


  App plan:

    Component Structure
    
    App 
      TodoInput
      TodoList >> TodoItem

    Make UI using JSX and Bootstrap


    Add new todo Item
      // Grab the info from user and update initial state
      // Make handleChange and handleSubmit methods and pass it as props
      // Make a new Item object and add it to an copied array

    Display changes on TodoItem component

    Add functionality to clear the list

    Add functionality to delete individual items


*/

import React, { Component } from "react";
import TodoList from "./components/TodoList";
import TodoInput from "./components/TodoInput";
import "bootstrap/dist/css/bootstrap.min.css";
import uuid from "uuid";

class App extends Component {
  state = {
    items: [],
    id: uuid(),
    item: "",
    editItem: false
  };

  // Get info from the user
  handleChange = e => {
    this.setState({
      item: e.target.value
    });
  };

  // Prevent Defaults
  handleSubmit = e => {
    e.preventDefault();

    // Add new Item
    const newItem = {
      id: this.state.id,
      title: this.state.item
    };

    console.log(newItem);

    // Update items []
    const updatedItems = [...this.state.items, newItem];

    this.setState({
      items: updatedItems,
      item: "",
      id: uuid(),
      editItem: false
    });
  };

  // Clear List
  clearList = () => {
    this.setState({
      items: []
    });
  };

  // Delete individual items
  handleDelete = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    this.setState({
      items: filteredItems
    });
  };

  // Edit todo item
  handleEdit = id => {
    const filteredItems = this.state.items.filter(item => item.id !== id);

    const selectedItem = this.state.items.find(item => item.id === id);

    this.setState({
      items: filteredItems,
      item: selectedItem.title,
      editItem: true,
      id: id
    });
  };

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-10 mx-auto col-md-8 mt-4">
            <h3 className="text-capitalize text-center">To input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
