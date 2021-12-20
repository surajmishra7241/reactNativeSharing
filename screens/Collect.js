import React,{useState} from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
const Collect = () => {
    const [handleImage, setHandleImage] = useState(null);
    const imageHandleByGallery= async ()=>{
   const takePer= await ImagePicker.requestMediaLibraryPermissionsAsync();
   if(takePer.granted===false){
       alert("Permission Is Required");
       return;
   }
   const takeImage= await ImagePicker.launchImageLibraryAsync();
//    setHandleImage({localUri:takeImage.uri});
 setHandleImage(takeImage.uri);
    }
    const imageHandleByCamera=async()=>{
        const takePer=await ImagePicker.requestCameraPermissionsAsync();
        if(takePer.granted===false){
            alert('Permission Is Required');
            return;
        }
        const takeImage =await ImagePicker.launchCameraAsync();
        setHandleImage( takeImage.uri);
    }
      
    const shareImage=async()=>{
        if(!(await Sharing.isAvailableAsync())){
            alert('take permission first');
            return;
        }
        await Sharing.shareAsync(handleImage);
    }
     if(handleImage!==null){
        return(
            <View style={styles.container}>
                 <Image style={styles.img} source={{uri:handleImage }}  />
       <View style={styles.buttonDesign}>
        
        <TouchableOpacity onPress={shareImage} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
        
        </View>
            </View>
        )
    }
    const share=()=>{ 
       
}
    return (
        <View style={styles.container}>
            <Text>Collections</Text>
            <Image style={styles.img} source={{uri:handleImage}}/>
            <View style={styles.buttonDesign}>
                <TouchableOpacity onPress={()=>imageHandleByCamera()} style={styles.button}><Text>Open Camera</Text></TouchableOpacity>
                <TouchableOpacity onPress={()=>imageHandleByGallery()} style={styles.button}><Text>Open Gallery</Text></TouchableOpacity>
                 <TouchableOpacity onPress={()=>share()} style={styles.button}><Text>share</Text></TouchableOpacity>
              
            </View>
        </View>
    )
}

export default Collect

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'grey'
    },
    img:{
        width:300,
        height:400,
        borderColor:'red',
        borderRadius:5,
        borderWidth:5
    },
    buttonDesign:{
        backgroundColor:'black',
        width:300,
        borderRadius:5,
        justifyContent:'space-between'
    },
    button:{
        backgroundColor:'red',
        padding:10,
        margin:10,
        borderRadius:5,
        alignItems:'center'
    }
})
