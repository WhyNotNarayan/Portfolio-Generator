import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PortfolioData {
  // Step 1: Basic Info
  name: string;
  role: string;
  bio: string;
  github: string;

  // Step 2: Profile Image & Resume
  profileImage: string | null;
  resumeUrl: string | null;

  // Step 3: Socials
  socials: Array<{ id: number; platform: string; url: string }>;

  // Step 4: Services
  services: string[];

  // Step 5: Projects
  projects: Array<{ title: string; desc: string; link: string; tech: string }>;

  // Step 6: Skills
  skills: string[];

  // Step 7: Experience (Work history)
  experience: Array<{ company: string; role: string; duration: string; desc: string }>;

  // Step 8: Certificates
  certificates: Array<{ name: string; url: string; issuer: string }>;

  // Step 9: Contact (Phone/Email focus)
  email: string;
  phone: string;
  location: string;

  // Step 10: Features selected (premium add-ons)
  selectedFeatures: string[];
  selected3DStyle: string | null;
  selectedThemeStyle: string | null;

  // Step 11: Final Layout
  selectedLayoutId: string;
}

interface PortfolioStore {
  userId: string | null;
  userName: string | null;
  data: PortfolioData;
  setUser: (userId: string | null, userName?: string | null) => void;
  updateData: (updates: Partial<PortfolioData>) => void;
  reset: () => void;
}

const initialData: PortfolioData = {
  name: "",
  role: "",
  bio: "",
  github: "",
  profileImage: null,
  resumeUrl: null,
  socials: [],
  services: [],
  projects: [],
  skills: [],
  experience: [],
  certificates: [],
  email: "",
  phone: "",
  location: "",
  selectedFeatures: [],
  selected3DStyle: null,
  selectedThemeStyle: null,
  selectedLayoutId: 'free-simple'
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      userId: null,
      userName: null,
      data: initialData,
      setUser: (id, name) => set({ userId: id, userName: name || null }),
      updateData: (updates) => set((state) => ({ data: { ...state.data, ...updates } })),
      reset: () => set({ data: initialData, userId: null, userName: null }),
    }),
    { name: 'portfolio-builder-storage' }
  )
);
