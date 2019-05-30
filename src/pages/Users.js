import React from 'react';
import { connect } from 'react-redux';
import { actions } from '../store';

const { users } = actions;

class UsersPage extends React.Component {
 componentDidMount() {
   this.props.getUsers();
 }

 render() {
   if (this.props.isLoading) {
     return <h3>Is loading...</h3>
   };

   return this.props.users ? (
     <>
      <h1>Users:</h1>
      <ul>
        {this.props.users.map(({ id, first_name: name }) => (
          <li key={id}>
            {name}
          </li>
        ))}
      </ul>
     </>
   ) : (
     <h3 style={{ color: 'grey' }}>No users</h3>
   )
 }
}

const mapStateToProps = state => {
  const { users: { data: users, loading: isLoading } } = state;
  return {
      users: users ? Object.keys(users).map(id => users[id]) : [],
      isLoading,
  };
};

const mapDispatchToProps = dispatch => ({
   getUsers: () => { dispatch(users.get.request()) },
   delUser: id => { dispatch(users.del.request(id)) },
   updateUser: (data) => { dispatch(users.post.request(data)) },
   createUser: data => { dispatch(users.put.request(data)) },
});

export const Users = connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersPage);