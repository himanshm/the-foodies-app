'use client';

import { ChangeEvent, useRef, useState } from 'react';
import styles from './image-picker.module.css';
import Image from 'next/image';

type ImagePickerProps = {
  label: string;
  name: string;
};

function ImagePicker({ label, name }: ImagePickerProps) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  function handlePicker() {
    imageInput.current?.click();
  }

  /*we can use this event object to get hold of that picked image. We can get hold of that picked file by using event.target.files and then accessing the first file. This file property will exist because the target of this event is this input, and this file input object, under the hood, will have such a files property. That will be an array of all the files that have been picked, but here, it'll only be one file that can be picked
   */

  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files) {
      setPickedImage(null);
      return;
    }

    const file = event.target.files[0];

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };
    fileReader.readAsDataURL(file);
  }

  return (
    <div className={styles.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={styles.controls}>
        <div className={styles.preview}>
          {!pickedImage && <p>No image picked yet!</p>}
          {pickedImage && (
            <Image
              src={pickedImage}
              alt='The image selected by the user'
              fill
            />
          )}
        </div>
        <input
          className={styles.input}
          type='file'
          id={name}
          accept='image/png, image/jpeg'
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
          required
        />
        <button
          className={styles.button}
          type='button'
          onClick={handlePicker}
        >
          Pick an Image
        </button>
      </div>
    </div>
  );
}

export default ImagePicker;
