import React, { useState, useEffect } from 'react';
 
import { Button, Text, View, FlatList, TextInput, Image, StyleSheet } from 'react-native';
 
import { NavigationContainer } from '@react-navigation/native';
 
import { createDrawerNavigator } from '@react-navigation/drawer';
 
import { createStackNavigator } from '@react-navigation/stack';
 
import axios, { all } from 'axios';
 
const Stack = createStackNavigator();
 
 
interface Task {
 
  taskName: string;
 
  taskDescription: string;
 
  taskImage: string;
 
}
 
 
 
interface User {
 
  name: string;
 
  username: string;
 
  email: string;
 
  address: {
 
    street: string;
 
    city: string;
 
    suite: string;
 
    zipcode: string;
 
    geo: {
 
      lat: string;
 
      lng: string;
 
    };
 
  };
 
  phone: string;
 
  website: string;
 
  company: {
 
    name: string;
 
    catchPhrase: string;
 
    bs: string;
 
  };
 
}
 
 
 
// Task List Component
 
const HomeList = ({ route, navigation }: any) => {
 
  const { allTasks , newTask} = route.params;
  const all  = [...allTasks, newTask]
 
 
 
  return (
 
    <FlatList
 
      data={all}
 
      renderItem={({ item }) => (
 
        <View style={styles.taskItem}>
 
          <Image source={{ uri: item.taskImage }} style={styles.taskImage} />
 
          <Text style={styles.taskTitle}>{item.taskName}</Text>
 
          <Text>{item.taskDescription}</Text>
 
          <Button title="View Details" onPress={() => navigation.navigate('Details', { item })} />
 
        </View>
 
      )}
 
      keyExtractor={(item, index) => `${item.taskName}-${index}`}
 
    />
 
  );
 
};
 
 
const Details = ({ route }) => {
  const item = route.params.item;
  return (
 
    <View>
      <View style={styles.taskItem}>
 
        <Image source={{ uri: item.taskImage }} style={styles.taskImage} />
 
        <Text style={styles.taskTitle}>{item.taskName}</Text>
 
        <Text>{item.taskDescription}</Text>
      </View>
 
    </View>
  )
}
 
 
const HomeDetails = ({route})=>{
  const {allTasks} = route.params;
 
  return(
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeList} initialParams={{allTasks}} options={{
          headerShown: false,
        }}/>
      <Stack.Screen name='Details' component={Details}/>
    </Stack.Navigator>
  )
}
 
 
// Profile Component
 
const Profile = () => {
 
  const [userData, setUserData] = useState(null);
 
 
 
  useEffect(() => {
 
    axios.get('https://jsonplaceholder.typicode.com/users/5')
 
      .then((response) => {
 
        setUserData(response.data);
 
      })
 
  }, []);
 
 
 
  return (
 
    <View style={styles.profileContainer}>
 
      {userData ? (
 
        <>
 
          <Image
 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/5951/5951752.png' }}
 
            style={styles.profileImage}
 
          />
 
          <Text style={styles.profileName}>{userData.name}</Text>
 
 
 
          <View style={styles.table}>
 
            <View style={styles.tableRow}>
 
              <Text style={styles.tableHeader}>UserName:</Text>
 
              <Text style={styles.tableCell}>{userData.username}</Text>
 
            </View>
 
            <View style={styles.tableRow}>
 
              <Text style={styles.tableHeader}>Email:</Text>
 
              <Text style={styles.tableCell}>{userData.email}</Text>
 
            </View>
 
            <View style={styles.tableRow}>
 
              <Text style={styles.tableHeader}>Address:</Text>
 
              <Text style={styles.tableCell}>
 
                {userData.address.street}, {userData.address.city}
 
              </Text>
 
            </View>
 
            <View style={styles.tableRow}>
 
              <Text style={styles.tableHeader}>Phone:</Text>
 
              <Text style={styles.tableCell}>{userData.phone}</Text>
 
            </View>
 
            <View style={styles.tableRow}>
 
              <Text style={styles.tableHeader}>Website:</Text>
 
              <Text style={styles.tableCell}>{userData.website}</Text>
 
            </View>
 
            <View style={styles.tableRow}>
 
              <Text style={styles.tableHeader}>Company:</Text>
 
              <Text style={styles.tableCell}>{userData.company.name}</Text>
 
            </View>
 
          </View>
 
        </>
 
      ) : (
 
        <Text>Loading...</Text>
 
      )}
 
    </View>
 
  );
 
};
 
// Add Task Component
 
 
const AddNewTask = ({ route, navigation }: any) => {
 
 
  const [taskName, setTaskName] = useState('');
 
  const [taskDescription, setTaskDescription] = useState('');
 
  const [taskImage, setTaskImage] = useState('');
 
 
 
  const handleAddTask = () => {
 
    const newTask: Task = { taskName, taskDescription, taskImage };
 
 
    navigation.navigate('Home',{newTask});
 
  };
 
 
 
  return (
 
    <View style={styles.addTaskContainer}>
 
      <TextInput
 
        style={styles.input}
 
        placeholder="Task Name"
 
        value={taskName}
 
        onChangeText={setTaskName}
 
      />
 
      <TextInput
 
        style={styles.input}
 
        placeholder="Task Description"
 
        value={taskDescription}
 
        onChangeText={setTaskDescription}
 
      />
 
      <TextInput
 
        style={styles.input}
 
        placeholder="Task Image URL"
 
        value={taskImage}
 
        onChangeText={setTaskImage}
 
      />
 
      <Button title="Add Task" onPress={handleAddTask} />
 
    </View>
 
  );
 
};
 
 
 
// App Component
 
const App = () => {
 
  const [allTasks, setAllTasks] = useState<Task[]>([
 
    {
 
      taskName: 'Clean the House',
 
      taskDescription: 'Deep clean all rooms...',
 
      taskImage: 'https://cdn-icons-png.flaticon.com/512/8634/8634252.png',
 
    }, {
 
      taskName: 'Grocery Shopping',
 
      taskDescription: 'Go to the supermarket and buy groceries for the week, including fresh produce, meat, and snacks.',
 
      taskImage: 'https://www.pnghq.com/uploads/food-drive-clipart.-free-download-transparent-png-smooth-edges.png', // Task 2 image
 
    }, {
 
      taskName: 'Morning Workout',
 
      taskDescription: 'Start the day with a 30-minute workout session, including stretches, cardio, and strength training.',
 
      taskImage: 'https://cdn-icons-png.flaticon.com/512/6442/6442453.png', // Task 3 image
    }
 
  ]);
 
 
 
 
 
  const Drawer = createDrawerNavigator();
 
  return (
 
    <NavigationContainer>
 
      <Drawer.Navigator>
 
        <Drawer.Screen name="Home Screen" component={HomeDetails} initialParams={{ allTasks }}  />
 
        <Drawer.Screen name="Profile" component={Profile} />
 
        <Drawer.Screen name="Add Task" component={AddNewTask} initialParams={{allTasks,setAllTasks}} />
 
      </Drawer.Navigator>
 
    </NavigationContainer>
 
  );
 
};
 
 
 
// Styles
 
const styles = StyleSheet.create({
 
  taskItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: '#ddd', alignItems: 'center' },
 
  profileImage: { width: 100, height: 100, marginBottom: 20 },
 
  profileName: { fontWeight: 'bold', fontSize: 24, marginBottom: 10 },
 
  table: { width: '100%', marginTop: 20 },
 
  tableRow: { flexDirection: 'row', marginBottom: 10, paddingVertical: 5, borderBottomWidth: 1, borderBottomColor: '#ddd' },
 
  tableHeader: { fontWeight: 'bold', width: '30%' },
 
  tableCell: { flex: 1, textAlign: 'left' },
 
  taskImage: { width: 50, height: 50, marginBottom: 10 },
 
  taskTitle: { fontWeight: 'bold', fontSize: 18 },
 
  detailsContainer: { padding: 20, alignItems: 'center' },
 
  detailsImage: { width: 100, height: 100, marginBottom: 20 },
 
  detailsTitle: { fontWeight: 'bold', fontSize: 22, marginBottom: 10 },
 
  profileContainer: { padding: 20 },
 
  addTaskContainer: { padding: 20 },
 
  input: { height: 40, borderColor: '#ccc', borderWidth: 1, marginBottom: 10, paddingLeft: 8 },
 
});
 
 
 
export default App;