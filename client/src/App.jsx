import { useState } from "react";
import "./App.css";
import { useQuery, useMutation, gql } from "@apollo/client";

const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      age
      name
      isMarried
    }
  }
`;

const GET_USER_BY_ID = gql`
  query getUserById($id: ID!) {
    getUserById(id: $id) {
      id
      age
      name
      isMarried
    }
  }
`;

const CREATE_USER = gql`
  mutation createUser($name: String!, $age: Int!, $isMarried: Boolean!) {
    createUser(name: $name, age: $age, isMarried: $isMarried) {
      name
      isMarried
    }
  }
`;

function App() {
  const [newUser, setNewUser] = useState({});
  const {
    data: getUsersData,
    error: getUsersError,
    loading: loadingUsers,
  } = useQuery(GET_USERS);
  const {
    data: getUserByIdData,
    error: getUserByIdError,
    loading: getUserByIdLoading,
  } = useQuery(GET_USER_BY_ID, {
    variables: { id: "2" },
  });

  const [createUser] = useMutation(CREATE_USER);

  if (loadingUsers) return <p>Data loading...</p>;

  if (getUsersError) return <p>Error: {error.message}</p>;

  const handleCreateUser = () => {
    createUser({
      variables: {
        name: newUser.name,
        age: Number(newUser.age),
        isMarried: false,
      },
    });
  };

  return (
    <>
      <div>
        <input
          onChange={(e) =>
            setNewUser((prevUser) => ({ ...prevUser, name: e.target.value }))
          }
          type="text"
          placeholder="Name..."
        />
        <input
          onChange={(e) =>
            setNewUser((prevUser) => ({ ...prevUser, age: e.target.value }))
          }
          type="number"
          placeholder="age"
        />
        <button onClick={handleCreateUser}>create user</button>
      </div>
      <h1>Users </h1>
      {getUserByIdLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Chosen User: {getUserByIdData.getUserById.name}</h1>

          <h1>Age: {getUserByIdData.getUserById.age}</h1>
        </div>
      )}

      <div>
        {getUsersData.getUsers.map((user, index) => (
          <div key={index}>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Is this user married: {user.isMarried ? "Yes" : "No"}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
