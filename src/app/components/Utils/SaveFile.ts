import { storage } from "@/lib/firebaseConfig";
import prisma from "@/lib/prisma/prismaClient";
import type { Media } from "@prisma/client";
import {
  ref as firebaseRef,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const imageMimes = ["image/jpeg", "image/png", "image/webp"]; // exemplo

export async function saveFile(file: File): Promise<[string, Media?]> {
  try {
    const timestamp = new Date().toISOString();
    const path = `uploads/${timestamp}-${file.name}`;
    const storageRef = firebaseRef(storage, path);

    await uploadBytes(storageRef, file);
    const url = await getDownloadURL(storageRef);

    if (imageMimes.includes(file.type)) {
      const created = await prisma.media.create({
        data: {
          url,
          mine: file.type,
        },
      });

      return [url, created];
    }

    return [url];
  } catch (error) {
    console.error("Erro ao salvar o arquivo:", error);
    return ["error"];
  }
}
