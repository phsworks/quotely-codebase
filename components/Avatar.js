import React, { useState, useEffect } from "react";
import { supabase } from "../supabase/configUsers";
import {
  StyleSheet,
  View,
  Alert,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import Feather from "@expo/vector-icons/Feather";

function Avatar({ url, size = 150, onUpload }) {
  const [uploading, setUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const avatarSize = { height: size, width: size };

  useEffect(() => {
    if (url) downloadImage(url);
  }, [url]);

  async function downloadImage(path) {
    try {
      const { data, error } = await supabase.storage
        .from("avatars")
        .download(path);

      if (error) {
        throw error;
      }

      const fr = new FileReader();
      fr.readAsDataURL(data);
      fr.onload = () => {
        setAvatarUrl(fr.result);
      };
    } catch (error) {
      console.log("Error downloading image: ", error.message);
    }
  }

  async function uploadAvatar() {
    try {
      setUploading(true);

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaType,
        allowsMultipleSelection: false,
        allowsEditing: true,
        quality: 1,
        exif: false,
      });

      if (result.canceled || !result.assets || result.assets.length === 0) {
        console.log("User cancelled image picker.");
        return;
      }

      const image = result.assets[0];
      console.log("Got image", image);

      if (!image.uri) {
        throw new Error("No image uri!");
      }

      const arraybuffer = await fetch(image.uri).then((res) =>
        res.arrayBuffer()
      );

      const fileExt = image.uri.split(".").pop().toLowerCase() || "jpeg";
      const path = `${Date.now()}.${fileExt}`;
      const { data, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(path, arraybuffer, {
          contentType: image.mimeType || "image/jpeg",
        });

      if (uploadError) {
        throw uploadError;
      }

      onUpload(data.path);
    } catch (error) {
      Alert.alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <View>
      {avatarUrl ? (
        <View>
          <Image
            source={{ uri: avatarUrl }}
            accessibilityLabel="Avatar"
            style={[avatarSize, styles.avatar, styles.image]}
            onPress={uploadAvatar}
          />
        </View>
      ) : (
        <View style={[avatarSize, styles.avatar, styles.noImage]} />
      )}
      <View style={styles.editImage}>
        <TouchableOpacity onPress={uploadAvatar}>
          <Feather disabled={uploading} name="edit-2" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 100,
    overflow: "hidden",
    maxWidth: "100%",
  },
  image: {
    objectFit: "cover",
    paddingTop: 0,
    borderWidth: 2,
    borderColor: "#8EEAEE",
  },
  noImage: {
    backgroundColor: "#dadada",
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#8EEAEE",
  },
  editImage: {
    borderRadius: 150,
    backgroundColor: "#8EEAEE",
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    position: "absolute",
    marginTop: 130,
    marginLeft: 160,
    zIndex: 99999,
  },
});

export default Avatar;
