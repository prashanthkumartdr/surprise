export interface DayData {
  dayNumber: number;
  title: string;
  subtitle: string;
  emotionalExcerpt: string;
  storyHeading: string;
  storyParagraphs: string[];
  hinglishQuoteId: string;
  hollowQuote: string;
  photos: string[];
  interactiveType:
    | 'smile_meter'
    | 'polaroid_gallery'
    | 'voice_note'
    | 'hyd_to_kol_map'
    | 'remind_moodboard'
    | 'timeline'
    | 'handwritten_letter'
    | 'future_universe'
    | 'minni_cat'
    | 'station_meeting'
    | 'anticipation_gate'
    | 'goodness_gift'
    | 'friendship_mixer'
    | 'birthday_excitement'
    | 'final_cinematic';
  interactiveData: any;
  colorTheme: {
    bgGradient: string;
    textAccent: string;
    cardBorder: string;
    glowAccent: string;
    bougainvilleaType: 'pink' | 'lavender' | 'crimson' | 'gold_glow';
  };
}

export interface MemorialStory {
  id: string;
  year: string;
  title: string;
  desc: string;
  location: string;
  image: string;
}

export interface MoodboardItem {
  id: string;
  title: string;
  emoji: string;
  description: string;
  image: string;
  vibe: string;
}

export interface ParallelAdventure {
  id: string;
  worldName: string;
  illustration: string;
  story: string;
  status: 'dreaming' | 'planned' | 'locked';
}
