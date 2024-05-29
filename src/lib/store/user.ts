import {create} from 'zustand'
import {User} from '@supabase/supabase-js'

interface UserState {
    user: { first_name: string
        last_name: string
        email: string
        phone_number: string
        role: string
        id: string
        created_at: string
    }  | undefined
    setUser: (user:  { first_name: string
        last_name: string
        email: string
        phone_number: string
        role: string
        id: string
        created_at: string
    } | undefined) => void
}


export const useUserStore = create<UserState>((set) => ({
    user: undefined,
    setUser: (user:  { first_name: string
        last_name: string
        email: string
        phone_number: string
        role: string
        id: string
        created_at: string
    }  | undefined) => set({user}),
}))