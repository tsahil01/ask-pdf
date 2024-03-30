import { atom } from "recoil";

export interface FileDataInterface {
    id: string;
    key: string;
    name: string;
    uploadstatus: string;
    url: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}

export const filesAtom = atom<FileDataInterface[]>({
    key: "filesAtom",
    default: []
});
