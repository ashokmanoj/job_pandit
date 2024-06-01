import {create} from 'zustand';
import { getLocalStorage, setLocalStorage } from '@/utils/localstorage';
import { notifyError, notifySuccess } from '@/utils/toast';

// Check if the local storage exists
const wishlistData = getLocalStorage("wishlist_items");
let initialWishlistState: any[] = [];

// If the wishlist exists, parse its value and set it as the initial state
if (wishlistData) {
  try {
    initialWishlistState = wishlistData;
  } catch (error) {
    console.error("Error parsing wishlist data:", error);
  }
}

interface WishlistState {
  wishlist: any[];
  add_to_wishlist: (job: any) => void;
  remove_wishlist_product: (job: any) => void;
  reset: () => void;
}

const useWishlistStore = create<WishlistState>((set) => ({
  wishlist: initialWishlistState,
  add_to_wishlist: (job: any) => set((state) => {
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
  remove_wishlist_product: (job: any) => set((state) => {
    const updatedWishlist = state.wishlist.filter((item) => item.id !== job.id);
    notifyError(`${job.title} removed from wishlist`);
    setLocalStorage("wishlist_items", updatedWishlist);
    return { wishlist: updatedWishlist };
  }),
  reset: () => set((state) => {
      setLocalStorage("wishlist_items", []);
      return { wishlist: [] };
    }
    

  ),
}));

export default useWishlistStore;
