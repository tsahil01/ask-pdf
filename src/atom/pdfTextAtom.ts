import { atom } from "recoil";

export const pdfTextAtom = atom<string>({
    key: "pdfTextAtom",
    default: ""
})