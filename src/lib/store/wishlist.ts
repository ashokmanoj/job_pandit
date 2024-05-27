import {create} from 'zustand';
import { getLocalStorage, setLocalStorage } from '@/utils/localstorage';
import { notifyError, notifySuccess } from '@/utils/toast';
import { IJobType } from '@/types/job-data-type';

// Check if the local storage exists
const wishlistData = getLocalStorage("wishlist_items");
let initialWishlistState: IJobType[] = [];

// If the wishlist exists, parse its value and set it as the initial state
if (wishlistData) {
  try {
    initialWishlistState = wishlistData;
  } catch (error) {
    console.error("Error parsing wishlist data:", error);
  }
}

interface WishlistState {
  wishlist: IJobType[];
  add_to_wishlist: (job: IJobType) => void;
  remove_wishlist_product: (job: IJobType) => void;
}

const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: initialWishlistState,
  add_to_wishlist: (job: IJobType) => set((state) => {
    const isExist = state.wishlist.some((item) => item.id === job.id);
    let updatedWishlist;
    if (!isExist) {
      updatedWishlist = [...state.wishlist, job];
      notifySuccess(`${job.title} added to wishlist`);
    } else {
      updatedWishlist = state.wishlist.filter((item) => item.id !== job.id);
      notifyError(`${job.title} removed from wishlist`);
    }
    setLocalStorage("wishlist_items", updatedWishlist);
    return { wishlist: updatedWishlist };
  }),
  remove_wishlist_product: (job: IJobType) => set((state) => {
    const updatedWishlist = state.wishlist.filter((item) => item.id !== job.id);
    notifyError(`${job.title} removed from wishlist`);
    setLocalStorage("wishlist_items", updatedWishlist);
    return { wishlist: updatedWishlist };
  }),
}));

export default useWishlistStore;
