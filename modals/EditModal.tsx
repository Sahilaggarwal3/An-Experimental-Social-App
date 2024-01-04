import useCurrentUser from "@/hooks/useCurrentUser";
import useEditModal from "@/hooks/useEditModal";
import useUser from "@/hooks/useUser";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "@/Components/Modal";
import Input from "@/Components/Input";
import ImageUpload from "@/Components/ImageUpload";

const EditModal = () => {
  const { data: currentUser } = useCurrentUser();

  const { mutate: mutateFethedUser } = useUser(currentUser?.id);

  const editModal = useEditModal();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [profileImage, setProfileIamge] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [bio, setBio] = useState("");

  useEffect(() => {
    setUsername(currentUser?.username);
    setName(currentUser?.name);
    setCoverImage(currentUser?.coverImage);
    setProfileIamge(currentUser?.profileImage);
    setBio(currentUser?.bio);
  }, [
    currentUser?.name,
    currentUser?.username,
    currentUser?.bio,
    currentUser?.profileImage,
    currentUser?.coverImage,
  ]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(async () => {
    try {
      setIsLoading(true);

      await axios.patch("/api/edit", {
        name,
        username,
        bio,
        profileImage,
        coverImage,
      });

      mutateFethedUser();
      toast.success("Updated Successfully");
      editModal.onClose();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    name,
    username,
    bio,
    profileImage,
    coverImage,
    mutateFethedUser,
    editModal,
  ]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <ImageUpload
        disabled={isLoading}
        label="Upload Profile Image"
        value={profileImage}
        onChange={(image) => setProfileIamge(image)}
      />
      <ImageUpload
        disabled={isLoading}
        label="Upload Cover Image"
        value={coverImage}
        onChange={(image) => setCoverImage(image)}
      />
      <Input
        value={name}
        placeholder="Name"
        disabled={isLoading}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        value={username}
        placeholder="Username"
        disabled={isLoading}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        value={bio}
        placeholder="Bio"
        disabled={isLoading}
        onChange={(e) => setBio(e.target.value)}
      />
    </div>
  );

  return (
    <Modal
      onClose={editModal.onClose}
      onSubmit={onSubmit}
      isOpen={editModal.isOpen}
      disabled={isLoading}
      title="Edit"
      actionLabel="Save"
      body={bodyContent}
    />
  );
};

export default EditModal;
