import React, { useState, ChangeEvent } from 'react';
import './UpdateProfileDialog.css'; // Import your CSS file
import ImageCropper from './ImageCropper';

type Profile = {
  username: string;
  email: string;
  description: string;
  image: string;
};

type CustomTheme = 'light' | 'dark';

interface UpdateProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedProfile: Profile) => void;
  initialProfile: Profile;
  theme: CustomTheme;
}

const UpdateProfileDialog: React.FC<UpdateProfileDialogProps> = ({
    open,
    onClose,
    onSave,
    initialProfile,
    theme
  }) => {
  const [name, setName] = useState<string>(initialProfile.username);
  //@ts-ignore
  const [email, setEmail] = useState<string>(initialProfile.email);
  const [description, setDescription] = useState<string>(initialProfile.description);
  const [image, setImage] = useState<string>(initialProfile.image);
  const [croppedImage, setCroppedImage] = useState<string>(initialProfile.image);

  const handleSave = () => {
    onSave({ username: name, email, description, image: croppedImage });
    onClose(); // Close the dialog after saving
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImage(reader.result as string);
        }
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const dialogClass = theme === 'dark' ? 'dialog-dark' : 'dialog-light';

  return (
    <div className={`dialog-overlay ${open ? 'open' : ''}`}>
      <div className={`dialog ${dialogClass}`}>
        <div className="dialog-header">
          <h2>Update Profile</h2>
        </div>
        <div className="dialog-content">
          <div className="image-upload">
            <img src={croppedImage} alt="Profile" className="profile-image" />
            <input
              accept="image/*"
              id="upload-button-file"
              type="file"
              onChange={handleImageChange}
              style={{ display: 'none' }}
            />
            <label htmlFor="upload-button-file" className="upload-button">
              Upload Picture
            </label>
            {image && (
              <div className="cropper-container">
                <ImageCropper
                  image={image}
                  onCrop={(croppedImage) => setCroppedImage(croppedImage)}
                />
              </div>
            )}
          </div>
          <label>
            Username:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Description:
            <textarea
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
        </div>
        <div className="dialog-actions">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSave}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfileDialog;
