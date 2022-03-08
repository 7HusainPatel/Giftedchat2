import React, { useLayoutEffect,useState, useCallback, useEffect } from 'react'
import { View, Text} from 'react-native'
import { auth, db } from '../firebase';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-elements';
import { GiftedChat, Actions,
    ActionsProps,} from 'react-native-gifted-chat';
//import Image from 'react-native-elements';
//import { Avatar } from 'react-native-paper';
import { LogBox } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import { Icon } from 'react-native-elements/dist/icons/Icon';

// import ImgToBase64 from 'react-native-image-base64';
// import { launchImageLibrary,launchCamera } from 'expo-image-picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';


LogBox.ignoreLogs(['Setting a timer']);


const ChatScreen = ({navigation}) => {
  //  const [images, setImages] = useState([]);
    // const [uploading, setUploading] = useState(false);
    // const [transferred, setTransferred] = useState(0);

    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
      const unsubscribe=  db.collection('chats').
      orderBy('createdAt','desc').onSnapshot
      (snapshot=>setMessages(
                       snapshot.docs.map(doc=>({
                        _id:doc.data()._id,
                        createdAt:doc.data().createdAt.toDate(),
                        text:doc.data().text,
                        // image:doc.data(images).image,
                        user:doc.data().user , 
                        
                       }))
                   ))
                  
                   
      return unsubscribe;
    }, [])

    
    const renderActions = (props) => {
        return (
            <Actions
                {...props}
                options={{
                    ['Image']: async (props) => {
                        try {
                            let result = await DocumentPicker.getDocumentAsync({});
                           // setImages(result);
                            console.log(result.uri);
                        } catch (e) {
                            if (DocumentPicker.isCancel(e)) {
                                console.log("User cancelled!")
                            } else {
                                throw e;
                            }
                        }
    
                    },
                    Cancel: (props) => { console.log("Cancel") }
                }}
                // icon={() => (
                //     <AntDesign
                //         name={'plus-square'}
                //         size={28}
                //         color={'#0077ff'}
                //         style={{left:0, bottom:0}}                           
                //    />
                // )}
                onSend={args => console.log(args)}
            />
        )
    };

  //upload Image...............
 

//   const uploadImage = async () => {
//     const { uri } = image;
//     const filename = uri.substring(uri.lastIndexOf('/') + 1);
//     const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
//     setUploading(true);
//     setTransferred(0);
//     const task = storage()
//       .ref(filename)
//       .putFile(uploadUri);
//     // set progress state
//     task.on('state_changed', snapshot => {
//       setTransferred(
//         Math.round(snapshot.bytesTransferred / snapshot.totalBytes) * 10000
//       );
//     });
//     try {
//       await task;
//     } catch (e) {
//       console.error(e);
//     }
//     setUploading(false);
//     Alert.alert(
//       'Photo uploaded!',
//       'Your photo has been uploaded to Firebase Cloud Storage!'
//     );
//     setImage(null);
//   };

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages => GiftedChat.
            append(previousMessages, messages))
            const{
                _id,
                createdAt,
                text,
                user,
                // image,
                
            }=messages[0]
            db.collection('chats').add({
                _id,
                createdAt,
                text,
                user,
                // image,
               
  
            })
      }, [])

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft:()=>(
                <View style={{marginLeft:20}}>
                    <Avatar
                        rounded
                        // icon={{ name: 'account-circle', type: 'material', color: '#009688' ,size:35}}
                        source={{
                            uri:auth?.currentUser?.photoURL
                        }}
                    />
                </View>

                
            ), 
            
            headerRight:()=>(
                // onPress={uploadImage}
                <TouchableOpacity style={{marginRight:30}}>
                <AntDesign name="logout" size={24} color="black" onPress={signOut}  />
                </TouchableOpacity>
            )
        })

    }, [])
    const signOut =()=>{
        auth.signOut().then(() => {
            // Sign-out successful.
            navigation.replace('Login')
          }).catch((error) => {
            // An error happened.
          });
          
    }
    // openGallery = () => {
    //     launchImageLibrary('photo',(response) => {
    //         this.setState({loader:true});
    //         ImgToBase64.getBase64String(response.uri)
    //         .then(async (base64String)=>{
    //             const uid =await AsyncStorage.getItem('UID');
    //             let source = "data:image/jpg;base64,"+base64String;
    //         })
    //         .catch(err => this.setState({loader: false}));
            
    //     })
    // }
    return (
        <GiftedChat
        isTyping={false}
        renderActions={() => renderActions()}
        messages={messages}
        showAvatarForEveryMessage={true}
        onSend={messages => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          name:auth?.currentUser?.displayName,
          avatar:auth?.currentUser?.photoURL,
        }}
      >
          </GiftedChat>
      
    )
}

export default ChatScreen

