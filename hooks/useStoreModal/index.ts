import { create } from "zustand";

interface IUseStoreModalStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

const useStoreModal = create<IUseStoreModalStore>((set) => ({
    isOpen: false,
    onClose: () => set({ isOpen: false }),
    onOpen: () => set({ isOpen: true }),
}))

export default useStoreModal;