import { DayData, MemorialStory, MoodboardItem, ParallelAdventure } from '../types';

export const countdownDays: DayData[] = [
  {
    dayNumber: 1,
    title: 'Your Smile, My Home',
    subtitle: 'Day 1 — The Spark that Started It All',
    emotionalExcerpt: '“Tumhari smile honestly duniya ka cutest thing hai. It carries a warmth that can light up the deepest nights.”',
    storyHeading: 'The Magic of Your Joy 🌸',
    storyParagraphs: [
      'Have you ever noticed how the world goes quiet when you laugh? It’s not just a smile, Sagufta, it’s like a soft breeze carrying the sweet scent of bougainvillea through a dusty window.',
      'From the shy initial curves of your lips to those full, unbridled laughter sessions that make your eyes crinkle into tiny crescent moons, your joy is a masterclass in beauty. No matter how gray the clouds look, seeing you happy instantly makes Hyderabad, Kolkata, and my whole universe feel cozy.',
      'Today, we start a countdown not just to a date, but to celebrate the very existence of a girl who makes every ordinary second feel extraordinary.'
    ],
    hinglishQuoteId: 'smile-quote',
    hollowQuote: 'Every single flower in the world reminds me of your cute smile 💛',
    photos: [
      // 'https://photos.app.goo.gl/ZdEdMvRTDYtXAakr5',
       // Bougainvillea pink
      // "https://photos.app.goo.gl/PcwPyboykEPYgwNn6",
      // "Screenshot_20260322_003153 (2).jpg",
      "Screenshot_20260322_003153 (1).jpg",
      'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2'  // Soft couple/flower abstract
    ],
    interactiveType: 'smile_meter',
    interactiveData: {
      initialPercent: 100,
      factsAboutHerSmile: [
        'Duniya ki sabse cute eye-crinkle effect.',
        'Instantly cures Chintu\'s worst days.',
        'Smells like tea on a rainy afternoon in Kolkata.',
        'Should be declared a historical monument of sweetness.'
      ]
    },
    colorTheme: {
      bgGradient: 'from-[#fff0f5] via-[#ffe4e1] to-[#fff5ee]',
      textAccent: 'text-[#e25875]',
      cardBorder: 'border-[#ffccd5]',
      glowAccent: 'shadow-[#ffccd5]',
      bougainvilleaType: 'pink'
    }
  },
  {
    dayNumber: 2,
    title: 'An Angel Whispers from the Stars 👼🐈',
    subtitle: 'Day 2 — Minni’s Golden Birthday Visit',
    emotionalExcerpt: '“Dear Sagufta-Mamma, I never truly left. If you feel a sudden warm touch on your heart today, know that I hopped down from my cloud to give you a soft birthday purr. I\'ll see you in another life, when we are both cats.”',
    storyHeading: 'A Magical Bridge from the Rainbow Skies ☁️🐾',
    storyParagraphs: [
      'They say that the souls of the standard earth angels who wore fur never really leave the ones who loved them best. Sagufta, your sweet, precious baby Minni has spent the last few months resting on warm, marshmallow clouds and chasing golden butterflies in heaven.',
      'But as your birthday came close, she meowed gently at the gates of the sky, demanding to visit her favorite human in the universe. So, Chintu and Minni built a quiet, magical bridge. She has sneaked right back into today’s gift file, stepping across dimensions into this interactive room just to snuggle you.',
      'Look at this picture—you and your sweet baby, wrapped together in a love so strong that even time and borders cannot touch it. She wants you to know she is happy, warm, and forever holding Sagufta’s hand.'
    ],
    hinglishQuoteId: 'minni-quote',
    hollowQuote: '“I\'ll see you in another life, when we are both cats.” — Forever Your Minni 🐾✨',
    photos: [
      '1762614002860.png'
    ],
    interactiveType: 'minni_cat',
    interactiveData: {
      catName: 'Minni',
      meowPhrases: [
        'Meow... (Hey Sagufta-Mamma, I see you studying and typing from up here! Have you eaten your food today? 🍲)',
        'Meow!! (I made Chintu code this magical stairwell because I refused to miss your birthday! 🎂🐾)',
        'Purrrrr... (I saw you shed a tear for me, Mamma. Please smile! I am the happiest little cloud in heaven, watching over you 💖)',
        'Meow-meow! (Chintu and I always make a team to keep you smiling... even from the stars! 😉)',
        'Meow-purr... (I\'ll see you in another life, when we are both cats. 🐈🌟)',
        'Prrrreeeooww! (Happy Birthday Sagufta-Mamma! You are my absolute favorite human in the entire galaxy! 💛🥂)'
      ],
      pics: [
        'ChatGPT Image Jun 28, 2026, 07_03_32 PM.png',
        '1762614002860.png'
      ]
    },
    colorTheme: {
      bgGradient: 'from-[#fff5f6] via-[#fce4ec] to-[#f3e5f5]',
      textAccent: 'text-[#e91e63]',
      cardBorder: 'border-[#fbaed3]',
      glowAccent: 'shadow-[#fbaed3]',
      bougainvilleaType: 'lavender'
    }
  },
  {
    dayNumber: 3,
    title: 'The Sound of Your Voice',
    subtitle: 'Day 3 — Audio Letters & Intimate Whispers',
    emotionalExcerpt: '“Tumhari awaaz sun kar aesa lagta hai jaise subah subah rupaheli dhoop kamre me dakhil ho gayi ho.”',
    storyHeading: 'Whispering in the Quiet Light 🎙️',
    storyParagraphs: [
      'Do you know that your voice has a healing frequency? It’s soft, deliberate, and holds a rhythm that immediately calms down my chaotic thoughts.',
      'Sometimes I play back our conversations inside my ear when the night gets too loud. It is more peaceful than any lo-fi playlist. It makes me feel like we are sitting side-by-side, sharing a single shawl under a cold sky.',
      'I compiled some beautiful transcripts and audio feelings. Tap next to hear the whispers of the heart.'
    ],
    hinglishQuoteId: 'voice-quote',
    hollowQuote: 'If voice had a color, yours would be a mix of golden hour sunset and deep lavender 🌅💜',
    photos: [
      // 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2'
      // "Day_3.jpg"
      // "It’s everything that happens before “export.”#ExplorePage #ReelsIndia #ViralReels #TrendingNow #.mp4"
      "Song.jpeg"
    ],
    interactiveType: 'voice_note',
    interactiveData: {
      audioClips: [
        {
          title: 'The Rain Sound & You 🌧️',
          length: '0:45',
          transcript: '“Chintu... suno na. Kolkata me bohot pyaari baarish ho rahi hai. Chai peeyoge mere sath?”'
        },
        {
          title: 'Late Night Chats 🌌',
          length: '1:12',
          transcript: '“I don\'t know why, but when I talk to you, my heart feels so light. Jaise koi bojh hi na ho...”'
        },
        {
          title: 'A Soft Humming 💖',
          length: '0:30',
          transcript: '[A delicate hum, reminiscent of a nostalgic Rabindra Sangeet, blending softly with the sound of wind chimes]'
        }
      ]
    },
    colorTheme: {
      bgGradient: 'from-[#fff3e0] via-[#ffe0b2] to-[#ffecb3]',
      textAccent: 'text-[#ff9800]',
      cardBorder: 'border-[#ffe082]',
      glowAccent: 'shadow-[#ffe082]',
      bougainvilleaType: 'gold_glow'
    }
  },
  {
    dayNumber: 4,
    title: 'Hyderabad to Kolkata',
    subtitle: 'Day 4 — A Map of Shared Heartbeats',
    emotionalExcerpt: '“Distance is just an arbitrary number when the souls reside coordinates-free in the same chamber of care.”',
    storyHeading: 'Bridging the 1,500 Kilometers 🚂',
    storyParagraphs: [
      'Hyderabad holds my steps, but Kolkata keeps my breaths. Every time I look at a railway map, my eyes trace that long, emotional route cutting across states and bringing my longing straight to you.',
      'From Secunderabad station to Howrah junction, passing through the green fields of Odisha and Andhra, every railway tie is a heartbeat counting down the distance until we don\'t have to say goodbye at booking gates anymore.',
      'Let’s animate this sweet journey. Watch how our threads are forever tied together.'
    ],
    hinglishQuoteId: 'distance-quote',
    hollowQuote: 'Hum bohot jald milenge, and standard according to destiny, the universe is preparing the perfect evening 💫',
    photos: [
      // 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96' // Railway track sun
      // "Day_5.jpeg"
      "Train.jpeg"
    ],
    interactiveType: 'hyd_to_kol_map',
    interactiveData: {
      fromCity: 'Hyderabad',
      toCity: 'Kolkata',
      distance: '1,490 km',
      travelTime: '24 Hours of Quiet Longing',
      landmarks: ['Hussain Sagar', 'Secunderabad Express Route', 'Howrah Bridge', 'Victoria Gardens']
    },
    colorTheme: {
      bgGradient: 'from-[#e1f5fe] via-[#ffebee] to-[#fff3e0]',
      textAccent: 'text-[#0288d1]',
      cardBorder: 'border-[#81d4fa]',
      glowAccent: 'shadow-[#81d4fa]',
      bougainvilleaType: 'pink'
    }
  },
  {
    dayNumber: 5,
    title: '15 Minutes of Magic 🚉🌸',
    subtitle: 'Day 5 — When Hearts Met at the Platform',
    emotionalExcerpt: '“From the moment I saw you, my heart literally paused for a second. Everything around me just disappeared… nothing existed except you.”',
    storyHeading: 'When Our Coordinates Aligned ✨',
    storyParagraphs: [
      'They say time is relative, but until that day at the railway station, I never truly understood what that meant. Sagufta, we only had fifteen fleeting minutes together, but in that tiny fragment of a coordinate, the entire universe shrank down to just where you stood.',
      'From the moment my eyes found you, the loud station announcements, the rushing crowds, and the mechanical rumble of engines faded into complete silence. You were standing there, with your curly hair falling softly, and you looked infinitely more beautiful than any picture could ever capture.',
      'That day, I stole flowers from a random garden just so I wouldn\'t greet you empty-handed, took thousands of photos to lock your smile into my camera lens forever, and felt my heart beat at three times its speed during that quiet side hug. It was short, it was sweet, and it was absolute magic.'
    ],
    hinglishQuoteId: 'station-meeting-quote',
    hollowQuote: '“How many pictures you want to take, man nahi bhara kya?” — I just wanted to freeze that moment, Sagufta, forever 🤍',
    photos: [
      'Snapchat-1372232425_exported_1958 (1).jpg'
    ],
    interactiveType: 'station_meeting',
    interactiveData: {
      originalMessage: `Hey ammmuu kutti ✨🤍

I’m still replaying everything in my head and smiling like an idiot 🥲 From the moment I saw you, my heart literally paused for a second. Everything around me just disappeared… the noise, the people, the station announcements… nothing existed except you. Your eyes, your smile, your presence.

You are honestly even more beautiful in real life than in pictures 😌 I didn’t think that was possible. The way your curly hair was falling softly, the way you were smiling… and when I placed that little flower in your hair 🌸🥹 that smile you gave me in that moment is something I’ll never forget. You genuinely looked like an angel standing there.

I have to confess something about those flowers 😅 On my way to the station, I couldn’t find any shops and I didn’t want to come empty-handed. I just wanted to bring something for you. I saw flowers outside a random house and quickly picked a few 🙈 I almost felt like I stole them, but honestly in that moment all I could think was that you should have flowers from me. When you took them with that warm smile… it made everything worth it 🤍

And the pictures 🥹📸 I’m so glad we took so many. Even in that short time, pulling out my camera and capturing you felt so special to me. As a photographer, I’ve taken thousands of pictures… but clicking yours felt different. It wasn’t just about lighting or angles, it was about the moment. I’m really happy I got to capture your beauty with my camera. Those pictures are not just photos for me, they are memories frozen forever.

And when we were taking so many selfies and you said, “How many pictures you want to take, man nahi bhara kya?” 😅 I was laughing but inside I just wanted to say the truth: I wanted to lock that moment forever. I didn’t want those minutes to end. I wanted something I could look at later and remember exactly how you looked, how you smiled, how you stood next to me.

That small side hug… I don’t think you realize what that did to me 🥲 My heart was beating so fast but I was trying to act normal. And the way you bought chocolate and Diet Coke for me… that was so sweet. It made me feel cared for in the simplest way.

And meeting your mom was actually very special to me too 🤍 I was a little nervous, but she was so kind and nice. The way she spoke and smiled made me feel comfortable. I’m really happy I got to meet her. It meant a lot that you introduced me properly.

Even though it was just 10–15 minutes, it felt beautiful. Real. Special. And when you turned back and looked before leaving… that moment is replaying the most in my mind 🥹

I’m just really happy I saw you today. Truly. 🤍`,
      chocolateBrand: 'Dairy Milk / Silk 🍫',
      beverage: 'Diet Coke 🥤',
      giftedFlower: 'Bougainvillea 🌸',
      momMeeting: 'Friendly, warm, and comforting'
    },
    colorTheme: {
      bgGradient: 'from-[#fff8f0] via-[#ffece0] to-[#fff3e5]',
      textAccent: 'text-[#e65100]',
      cardBorder: 'border-[#ffcc80]',
      glowAccent: 'shadow-[#ffb74d]',
      bougainvilleaType: 'gold_glow'
    }
  },
  {
    dayNumber: 6,
    title: 'The Spark of Excitement! ⚡🎈',
    subtitle: 'Day 6 — Counting Down with Pure Joy',
    emotionalExcerpt: '“My heart is already doing little happy cartwheels, Sagufta! Each passing hour is bringing us closer to celebrating your amazing presence. 🌻”',
    storyHeading: 'Can You Feel the Birthday Buzz? 🎉🌸',
    storyParagraphs: [
      'Every single day is wonderful when you have a supportive friend like you, but the countdown to your special day has its own premium golden glow! Sagufta, seeing you smile and be happy is the absolute highlight of my day, and knowing your birthday is just around the corner makes my heart flutter with pure excitement.',
      'I wanted to build a little container of that high energy. A visual space where we can celebrate how much you and your birthday mean to me, packed with playful anticipation, cozy vibes, and absolute warmth. You deserve a mountain of treats, a sky full of colorful balloons, and the softest kittens!',
      'Below, I\'ve configured a "Birthday Excitement Simulator". Help Chintu power it up to its ultimate level to release celebratory confetti and warm birthday magic tailored just for you! 🥰👇'
    ],
    hinglishQuoteId: 'excitement-quote',
    hollowQuote: 'The countdown is getting super cozy! Get ready for endless smiles, Ammu 💫',
    photos: [
      'https://images.unsplash.com/photo-1518199266791-5375a83190b7'
    ],
    interactiveType: 'birthday_excitement',
    interactiveData: {
      checklist: [
        { id: 'c1', task: 'Send Minni the Cat some cozy virtual fish treats 🐾', reward: 'Happy purrs!' },
        { id: 'c2', task: 'Unfurl the golden celebratory welcome banners 🎏', reward: 'Grand royal atmosphere' },
        { id: 'c3', task: 'Warm up the virtual chocolate fudge cooker 🍫', reward: 'Infinite sweet smells' },
        { id: 'c4', task: 'Ready the biggest, warmest virtual bear hug 🧸', reward: 'Comfort levels set to max!' }
      ],
      initialMeter: 70
    },
    colorTheme: {
      bgGradient: 'from-[#fffbeb] via-[#fff1f2] to-[#fef2f2]',
      textAccent: 'text-[#f43f5e]',
      cardBorder: 'border-[#fecdd3]',
      glowAccent: 'shadow-[#fecdd3]',
      bougainvilleaType: 'pink'
    }
  },
  {
    dayNumber: 7,
    title: 'A Handwritten Confession',
    subtitle: 'Day 7 — Sealed in an Envelope of Cotton Hearts',
    emotionalExcerpt: '“Dear Sagufta, some feelings can never find enough justice in typing. They need the touch of a pen, even if digital.”',
    storyHeading: 'To Whomever Owns My Softest Thoughts ✉️',
    storyParagraphs: [
      'If I could, I would write this letter on high-grade handmade paper, seal it with raw wax pressed with wild bougainvilleas, and have a pigeon fly across the Deccan plateau to drop it gently into your veranda.',
      'You are a soft soul in a harsh world. In moments when you feel doubtful or tired, please open this mental drawer: You are deeply respected, intensely cherished, and adored more than you think.',
      'Click the wax seal below. Let the paper unfold and whisper its secrets to you.'
    ],
    hinglishQuoteId: 'letter-quote',
    hollowQuote: 'I kept a piece of my heart safe inside this wax seal. Please handle with care 💛',
    photos: [
      // 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b'
      'Earrings.jpeg'
    ],
    interactiveType: 'handwritten_letter',
    interactiveData: {
      letterContent: `Dearest Ammu,

I hope when you read this, your heart feels warm. I built this whole digital sanctuary because standard words on a simple chat feel too small for a soul as beautiful as yours.

In you, I found a poetry that doesn't need rhyming. You are the gentle light of the moon reflecting over the Hooghly river, the soothing wind of Hyderabad, and the absolute highlight of my daily routine. 

No matter how far apart our physical coordinates are, you represent my absolute favorite version of home. Thank you for exists, for laughing, and for being Ammu.

With all my heart and softest hugs,
- Chintu / Allu 💛`
    },
    colorTheme: {
      bgGradient: 'from-[#fff8e1] via-[#fff176] to-[#ffe082]',
      textAccent: 'text-[#f57f17]',
      cardBorder: 'border-[#fff59d]',
      glowAccent: 'shadow-[#ffeb3b]',
      bougainvilleaType: 'gold_glow'
    }
  },
  {
    dayNumber: 8,
    title: 'A Little Wish 🌸',
    subtitle: 'Day 8 — Our Dream Boat Ride & Kolkata Walk',
    emotionalExcerpt: '“Until then, I’ll keep that dream safely tucked away, waiting for the day life decides to make it real. 🤍✨”',
    storyHeading: '🌸✨ A Little Wish',
    storyParagraphs: [
      'There are so many little dreams I have tucked away in my heart. One of them is to visit your beautiful hometown, Kolkata, and see the world through your eyes. 💛',
      'And if life is kind enough, maybe someday we\'ll go on a short trip together, creating simple memories and sharing endless conversations. 🌷✨',
      'But if I had to choose one thing I\'ve wanted the most, it would be this — to take you on a peaceful boat ride near the Howrah Bridge. 🚤🌉🤍',
      'I don\'t know why, but the thought of watching the city lights reflecting on the Hooghly River, feeling the evening breeze, and simply sitting beside you while the iconic bridge shines above us has always felt like one of the most beautiful dreams in my heart. 🌃✨',
      'Maybe someday, we\'ll laugh about silly things, take countless photos, and turn that little dream into a beautiful memory. 🌸💛',
      'Until then, I\'ll keep that dream safely tucked away, waiting for the day life decides to make it real. 🤍✨'
    ],
    hinglishQuoteId: 'gallery-quote',
    hollowQuote: 'Watching city lights reflect on the Hooghly River, with the iconic bridge shining above us ⛵✨',
    photos: [
      // "Screenshot_20260322_003153 (2).jpg",
      // 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6',
      // 'https://images.unsplash.com/photo-1518199266791-5375a83190b7'
      "Boat.jpeg"
    ],
    interactiveType: 'polaroid_gallery',
    interactiveData: {
      polaroids: [
        { id: 'p1', caption: 'Kathmandu 🚕', image: 'katmandu.jpg', rotation: '-rotate-6' },
        { id: 'p2', caption: 'Howrah Bridge Dream 🌉', image: 'Howra.jpg', rotation: 'rotate-3' },
        { id: 'p3', caption: 'River Breeze Ride ⛵', image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa', rotation: '-rotate-2' },
        { id: 'p4', caption: 'Hyderabad 🌃', image: 'Hyderabad.jpg', rotation: 'rotate-6' }
      ]
    },
    colorTheme: {
      bgGradient: 'from-[#f3e5f5] via-[#fce4ec] to-[#fff3e0]',
      textAccent: 'text-[#ba68c8]',
      cardBorder: 'border-[#ea80fc]',
      glowAccent: 'shadow-[#ea80fc]',
      bougainvilleaType: 'lavender'
    }
  },
  {
    dayNumber: 9,
    title: 'The Garden of Your Goodness 🌸✨',
    subtitle: 'Day 9 — Celebrating Your Kind Heart & Birthday Treasures',
    emotionalExcerpt: '“There are souls that make this world feel lighter, softer, and infinitely more beautiful. Sagufta, you are that gentle light in my life.”',
    storyHeading: 'A Celebration of Your Goodness 💛🌟',
    storyParagraphs: [
      'Ammu Sagufta, your goodness is like a quiet sunflower blooming under the morning light—it does not shout, but it fills the entire world with warmth. From the sweet way you speak to your complete selflessness, you mean more to me than words can ever capture. You are a steady sanctuary of peace and comfort in Chintu’s life.',
      'I truly wished to hand-deliver fresh, fragrant blossoms and a cute, soft stuffed cat to you today — a little golden-and-white plushie just like your beloved Minni, so you could hug it tightly whenever you study or feel tired. Though distance keeps me from placing them in your hands myself, my heart refuses to let this day pass without pampering you.',
      'So, here is a sweet Birthday Gift from my side! Inside this chapter, you’ll find an interactive gift box. Open your E-Gift Card below. I ask that you please buy yourself a beautiful bouquet of flowers and your favorite chocolates on my behalf. Let the world know how beautifully you are loved and celebrated today! 🎁🐾💐'
    ],
    hinglishQuoteId: 'goodness-quote',
    hollowQuote: 'May the world reward you with the same pure gentle warmth you spread so effortlessly, Ammu 💫',
    photos: [
      // 'https://images.unsplash.com/photo-1519751138087-5bf79df62d5b'
      'child.jpeg'
    ],
    interactiveType: 'goodness_gift',
    interactiveData: {
      giftCardCode: 'AMMU-BDAY-2026',
      giftCardLink: 'https://www.amazon.in/gift-card-store/b?ie=UTF8&node=3711325031',
      teddyCatStory: 'A fluffy, soft stuffed kitten with a little pink collar, carrying all the cozy purrs of your sweet Minni. Keep it on your bed to hug always!',
      flowersType: 'Pink Tulips, Golden Lilies, and fresh Kolkata Bougainvillea branches'
    },
    colorTheme: {
      bgGradient: 'from-[#fffaf0] via-[#fdf2f8] to-[#fff1f2]',
      textAccent: 'text-[#f43f5e]',
      cardBorder: 'border-[#fecdd3]',
      glowAccent: 'shadow-[#fecdd3]',
      bougainvilleaType: 'pink'
    }
  },
  {
    dayNumber: 10,
    title: 'Happy Birthday, Ammu Sagufta! ✨',
    subtitle: 'Day 10 — My Infinite Birthday Letter to the Prettiest Soul',
    emotionalExcerpt: '“Tumhare jesa koi na toh tha, aur na hi koi ho sakta hai. Tum meri sabse khubsurat tehreer ho.”',
    storyHeading: 'July 10 — Your Birthday, Your Universe 🎂🌻',
    storyParagraphs: [
      'Today, the world celebrates your presence! Happy Birthday to the girl who embodies grace, soft laughter, and pure home coordinates. Ammu Sagufta, you deserve every beautiful star, every single climbing bougainvillea bloom, and a life colored in gold.',
      'I want you to know how deeply cherished you are, not just on July 10, but in every quiet breath in between. I hope this website remains a tiny sanctuary for you to visit whenever you need a reminder of how highly you are held in someone\'s thoughts.',
      'You are in my heart, you shall be in There forever. My greatest wish is that you are happy when you think of me, I am When I think of you.',
      'This isn\'t just a birthday wish; it\'s a promise to keep holding you high, always.'
    ],
    hinglishQuoteId: 'birthday-masterpiece',
    hollowQuote: 'Happy Birthday to my human-shaped home. May your year are cinematic and full of wild joy 💛✨',
    photos: [
      // 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2',
      // 'https://images.unsplash.com/photo-1544816155-12df9643f363',
      // 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6'
      "Day_10.jpeg"
    ],
    interactiveType: 'final_cinematic',
    interactiveData: {
      signer: 'Chintu / Allu 💛',
      specialWishes: [
        'Infinite laughter and raw joy in every step.',
        'A shelf full of beautiful books, hot tea, and cozy rainy windows.',
        'Zero stress, deep breaths, and immediate security in your own beauty.',
        'Chintu never leaving your side, always ready to draw you smiles.'
      ]
    },
    colorTheme: {
      bgGradient: 'from-[#120024] via-[#310052] to-[#45006b]',
      textAccent: 'text-[#ffd700]',
      cardBorder: 'border-[#ffea00]',
      glowAccent: 'shadow-[#ffd700]',
      bougainvilleaType: 'gold_glow'
    }
  }
];
