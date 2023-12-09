import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getDocs,  collection } from "firebase/firestore";
import { firestoreDB } from "../../firebaseConfig";

interface serverData  {
  message:string,
  username:string
}


export default function Home() {
  // const docRef = doc(firestoreDB, "rooms","Test2");
  const docRef = collection(firestoreDB, "rooms");
  // const [servers,setServers] = useState([]);
  const [serversId,setServersId] = useState([] as string[]);
  
  useEffect(()=>{
    const getData = async()=>{
      const {docs} = await getDocs(docRef)
      setServersId(docs.map(({id})=> id) as any);
      let temp:string[] = []
      docs.map(({id})=>{
        temp.push(id);
      });
      setServersId(temp);
    }
    getData();
  },[])
  return (
    <View>
      <Text>Do zaimplementowania</Text>
    </View>
  );
}
