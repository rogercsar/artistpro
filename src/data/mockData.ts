import { User, DancerProfile, ContractorProfile, Event, Review, ActivityPost } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'maria@email.com',
    name: 'Maria Silva',
    type: 'dancer',
    level: 'pro',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
    bio: 'Bailarina profissional com 10 anos de experiência em dança contemporânea e ballet.',
    location: 'São Paulo, SP',
    phone: '+55 11 99999-9999',
    createdAt: '2023-01-15T10:00:00Z',
    isVerified: true,
    subscription: {
      plan: 'pro',
      startDate: '2023-01-01T00:00:00Z',
      endDate: '2024-01-01T00:00:00Z',
      isActive: true
    }
  },
  {
    id: '2',
    email: 'joao@email.com',
    name: 'João Santos',
    type: 'dancer',
    level: 'advanced',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    bio: 'Especialista em hip-hop e street dance. Participante de competições nacionais.',
    location: 'Rio de Janeiro, RJ',
    phone: '+55 21 88888-8888',
    createdAt: '2023-02-20T14:30:00Z',
    isVerified: false,
    subscription: {
      plan: 'advanced',
      startDate: '2023-02-01T00:00:00Z',
      endDate: '2024-02-01T00:00:00Z',
      isActive: true
    }
  },
  {
    id: '3',
    email: 'ana@email.com',
    name: 'Ana Costa',
    type: 'dancer',
    level: 'basic',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    bio: 'Bailarina iniciante apaixonada por dança clássica e jazz.',
    location: 'Belo Horizonte, MG',
    phone: '+55 31 77777-7777',
    createdAt: '2023-03-10T09:15:00Z',
    isVerified: false
  },
  {
    id: '4',
    email: 'contato@dancaproducoes.com',
    name: 'Dança Produções',
    type: 'contractor',
    level: 'advanced',
    avatar: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop',
    bio: 'Produtora especializada em espetáculos de dança contemporânea e eventos corporativos.',
    location: 'São Paulo, SP',
    phone: '+55 11 33333-3333',
    createdAt: '2023-01-05T08:00:00Z',
    isVerified: true,
    subscription: {
      plan: 'advanced',
      startDate: '2023-01-01T00:00:00Z',
      endDate: '2024-01-01T00:00:00Z',
      isActive: true
    }
  },
  {
    id: '5',
    email: 'admin@danz.com',
    name: 'Admin Danz',
    type: 'admin',
    level: 'pro',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    bio: 'Administrador da plataforma Danz.',
    location: 'São Paulo, SP',
    createdAt: '2023-01-01T00:00:00Z',
    isVerified: true
  }
];

export const mockDancerProfiles: DancerProfile[] = [
  {
    ...mockUsers[0] as DancerProfile,
    skills: ['Ballet Clássico', 'Dança Contemporânea', 'Jazz', 'Pilates', 'Coreografia'],
    portfolio: {
      photos: [
        'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop'
      ],
      videos: [
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4'
      ]
    },
    availability: {
      monday: true,
      tuesday: true,
      wednesday: false,
      thursday: true,
      friday: true,
      saturday: false,
      sunday: false
    },
    experience: '10 anos',
    danceStyles: ['Ballet Clássico', 'Dança Contemporânea', 'Jazz'],
    socialMedia: {
      instagram: '@mariasilva_dance',
      tiktok: '@mariasilva_dance'
    },
    reviews: [],
    rating: 4.8
  },
  {
    ...mockUsers[1] as DancerProfile,
    skills: ['Hip-Hop', 'Street Dance', 'Breaking', 'Popping', 'Locking'],
    portfolio: {
      photos: [
        'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=600&fit=crop',
        'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=600&fit=crop'
      ],
      videos: [
        'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
      ]
    },
    availability: {
      monday: false,
      tuesday: true,
      wednesday: true,
      thursday: true,
      friday: false,
      saturday: true,
      sunday: true
    },
    experience: '5 anos',
    danceStyles: ['Hip-Hop', 'Street Dance', 'Breaking'],
    socialMedia: {
      instagram: '@joaosantos_hiphop',
      youtube: 'João Santos Dance'
    },
    reviews: [],
    rating: 4.5
  },
  {
    ...mockUsers[2] as DancerProfile,
    skills: ['Ballet Clássico', 'Jazz', 'Dança Moderna'],
    portfolio: {
      photos: [
        'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=400&h=600&fit=crop'
      ],
      videos: []
    },
    availability: {
      monday: true,
      tuesday: false,
      wednesday: true,
      thursday: false,
      friday: true,
      saturday: true,
      sunday: false
    },
    experience: '2 anos',
    danceStyles: ['Ballet Clássico', 'Jazz'],
    reviews: [],
    rating: 4.2
  }
];

export const mockContractorProfiles: ContractorProfile[] = [
  {
    ...mockUsers[3] as ContractorProfile,
    companyName: 'Dança Produções',
    companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    companyDescription: 'Produtora especializada em espetáculos de dança contemporânea, eventos corporativos e shows musicais. Com mais de 15 anos de experiência no mercado.',
    website: 'https://dancaproducoes.com',
    events: [],
    reviews: [],
    rating: 4.9
  }
];

export const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Audição para Espetáculo de Dança Contemporânea',
    description: 'Procuramos bailarinos experientes para participar do nosso novo espetáculo de dança contemporânea que será apresentado no Teatro Municipal. O espetáculo aborda temas de sustentabilidade e meio ambiente.',
    contractorId: '4',
    contractor: mockContractorProfiles[0],
    location: 'Teatro Municipal - São Paulo, SP',
    date: '2024-02-15',
    time: '14:00',
    duration: 3,
    requirements: [
      'Experiência mínima de 3 anos em dança contemporânea',
      'Disponibilidade para ensaios de segunda a sexta, 19h às 22h',
      'Portfólio com vídeos de apresentações anteriores',
      'Disponibilidade para turnê nacional (2 meses)'
    ],
    danceStyles: ['Dança Contemporânea', 'Ballet Clássico'],
    budget: {
      min: 3000,
      max: 5000,
      currency: 'BRL'
    },
    maxParticipants: 8,
    currentParticipants: [],
    interestedDancers: ['1', '2'],
    status: 'active',
    createdAt: '2024-01-15T10:00:00Z',
    images: [
      'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=600&fit=crop'
    ],
    tags: ['contemporânea', 'espetáculo', 'teatro', 'turnê']
  },
  {
    id: '2',
    title: 'Workshop de Hip-Hop com Coreógrafo Internacional',
    description: 'Workshop exclusivo com coreógrafo americano especialista em hip-hop. Aprenda técnicas avançadas e participe da criação de uma coreografia que será apresentada em evento internacional.',
    contractorId: '4',
    contractor: mockContractorProfiles[0],
    location: 'Centro Cultural - Rio de Janeiro, RJ',
    date: '2024-02-20',
    time: '10:00',
    duration: 6,
    requirements: [
      'Conhecimento básico em hip-hop',
      'Disponibilidade para workshop de 6 horas',
      'Roupas confortáveis para dança',
      'Idade mínima: 16 anos'
    ],
    danceStyles: ['Hip-Hop', 'Street Dance'],
    budget: {
      min: 200,
      max: 200,
      currency: 'BRL'
    },
    maxParticipants: 20,
    currentParticipants: [],
    interestedDancers: ['2'],
    status: 'active',
    createdAt: '2024-01-20T15:30:00Z',
    images: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop'
    ],
    tags: ['hip-hop', 'workshop', 'internacional', 'coreografia']
  },
  {
    id: '3',
    title: 'Evento Corporativo - Apresentação de Dança',
    description: 'Necessitamos de bailarinos para apresentação em evento corporativo de uma grande empresa. O evento será realizado em hotel 5 estrelas e contará com 200 convidados.',
    contractorId: '4',
    contractor: mockContractorProfiles[0],
    location: 'Hotel Copacabana Palace - Rio de Janeiro, RJ',
    date: '2024-03-10',
    time: '20:00',
    duration: 2,
    requirements: [
      'Experiência em eventos corporativos',
      'Disponibilidade para ensaio no dia anterior',
      'Traje social para apresentação',
      'Pontualidade obrigatória'
    ],
    danceStyles: ['Jazz', 'Dança Moderna', 'Ballet Clássico'],
    budget: {
      min: 800,
      max: 1200,
      currency: 'BRL'
    },
    maxParticipants: 6,
    currentParticipants: [],
    interestedDancers: ['1', '3'],
    status: 'active',
    createdAt: '2024-01-25T12:00:00Z',
    images: [
      'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&h=600&fit=crop'
    ],
    tags: ['corporativo', 'hotel', 'jazz', 'moderna']
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    fromUserId: '4',
    toUserId: '1',
    rating: 5,
    comment: 'Excelente profissional! Maria foi fundamental para o sucesso do nosso espetáculo. Muito dedicada e talentosa.',
    eventId: '1',
    createdAt: '2024-01-20T16:00:00Z'
  },
  {
    id: '2',
    fromUserId: '1',
    toUserId: '4',
    rating: 5,
    comment: 'Dança Produções é uma empresa muito profissional. Ambiente de trabalho excelente e pagamento em dia.',
    eventId: '1',
    createdAt: '2024-01-21T10:00:00Z'
  }
];

export const mockActivityPosts: ActivityPost[] = [
  {
    id: '1',
    userId: '1',
    content: 'Acabei de finalizar um novo vídeo para o meu portfólio! Confira a coreografia de dança contemporânea que criei inspirada na natureza. 🌿✨',
    images: [
      'https://images.unsplash.com/photo-1508700929628-666bc8bd84ea?w=600&h=400&fit=crop'
    ],
    createdAt: '2024-01-22T14:30:00Z',
    likes: ['2', '3', '4'],
    comments: [
      {
        id: '1',
        userId: '2',
        content: 'Que lindo! Parabéns pelo trabalho! 👏',
        createdAt: '2024-01-22T15:00:00Z',
        likes: ['1']
      }
    ]
  },
  {
    id: '2',
    userId: '2',
    content: 'Disponível para novos projetos em fevereiro! Especialista em hip-hop e street dance. Entre em contato! 🕺',
    createdAt: '2024-01-23T09:15:00Z',
    likes: ['1', '3'],
    comments: []
  }
];


