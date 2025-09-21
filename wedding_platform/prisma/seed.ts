import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.upsert({
      where: { slug: 'photographers' },
      update: {},
      create: {
        name: 'Photographers',
        slug: 'photographers',
        description: 'Professional wedding photographers',
        icon: '📸'
      }
    }),
    prisma.category.upsert({
      where: { slug: 'makeup-artists' },
      update: {},
      create: {
        name: 'Makeup Artists',
        slug: 'makeup-artists',
        description: 'Bridal makeup and hair styling',
        icon: '💄'
      }
    })
  ])

  // Create location
  const bangalore = await prisma.location.upsert({
    where: { id: 'bangalore-karnataka' },
    update: {},
    create: {
      city: 'Bangalore',
      state: 'Karnataka',
      country: 'India'
    }
  })

  // Create Makeup Artists
  const makeupArtistCategory = categories.find(c => c.slug === 'makeup-artists')!
  const photographerCategory = categories.find(c => c.slug === 'photographers')!

  // Create Tamil Nadu location for photographers
  const chennai = await prisma.location.upsert({
    where: { id: 'chennai-tamilnadu' },
    update: {},
    create: {
      city: 'Chennai',
      state: 'Tamil Nadu',
      country: 'India'
    }
  })

  const coimbatore = await prisma.location.upsert({
    where: { id: 'coimbatore-tamilnadu' },
    update: {},
    create: {
      city: 'Coimbatore',
      state: 'Tamil Nadu',
      country: 'India'
    }
  })

  const madurai = await prisma.location.upsert({
    where: { id: 'madurai-tamilnadu' },
    update: {},
    create: {
      city: 'Madurai',
      state: 'Tamil Nadu',
      country: 'India'
    }
  })

  const trichy = await prisma.location.upsert({
    where: { id: 'trichy-tamilnadu' },
    update: {},
    create: {
      city: 'Tiruchirappalli',
      state: 'Tamil Nadu',
      country: 'India'
    }
  })

  // Fehmax Makeup And Hair
  await prisma.vendor.upsert({
    where: { slug: 'fehmax-makeup-and-hair' },
    update: {},
    create: {
      name: 'Fehmax Makeup And Hair',
      slug: 'fehmax-makeup-and-hair',
      email: 'fehmax.makeup@gmail.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      description: 'Professional bridal makeup artist with 12+ years of experience specializing in HD makeup, airbrush makeup, and traditional bridal looks.',
      experience: '12 years',
      eventsDone: 100,
      rating: 4.9,
      reviewCount: 1250,
      categoryId: makeupArtistCategory.id,
      locationId: bangalore.id,
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% payment on booking, 50% payment on event date, Non-refundable booking amount',
      additionalInfo: 'Brands: MAC, PAC, Huda Beauty, Kryolan, NARS, Lakme, LYCRA Forever 52, Swiss Beauty Faces Canada | Travel: Yes | Trial: Yes (Separately Paid) | Studio: No | Specialties: HD Makeup, Airbrush, Traditional Looks',
      services: {
        create: [
          {
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup with hair styling',
            price: '₹8,000'
          },
          {
            name: 'Guest/Family Makeup',
            description: 'Makeup for bridesmaids and family members',
            price: '₹6,000'
          },
          {
            name: 'Bridal Airbrush',
            description: 'Premium airbrush makeup for flawless finish',
            price: '₹18,000'
          },
          {
            name: 'HD Makeup',
            description: 'High-definition makeup for photos/videos',
            price: '₹12,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Traditional South Indian Bridal Look',
            description: 'Beautiful traditional makeup with intricate designs',
            imageUrl: '/portfolio/fehmax-bridal-1.jpg'
          },
          {
            title: 'Modern Bridal Makeup',
            description: 'Contemporary bridal look with natural finish',
            imageUrl: '/portfolio/fehmax-bridal-2.jpg'
          },
          {
            title: 'Guest Makeup Collection',
            description: 'Elegant makeup for bridal party',
            imageUrl: '/portfolio/fehmax-bridal-3.jpg'
          },
          {
            title: 'Airbrush Bridal Look',
            description: 'Flawless airbrush makeup for special occasions',
            imageUrl: '/portfolio/fehmax-bridal-4.jpg'
          },
          {
            title: 'HD Bridal Makeup',
            description: 'High-definition makeup for wedding photography',
            imageUrl: '/portfolio/fehmax-bridal-5.jpg'
          },
          {
            title: 'Traditional Hair Styling',
            description: 'Beautiful traditional hair styling for brides',
            imageUrl: '/portfolio/fehmax-bridal-6.jpg'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Absolutely amazing work! Fehmax did my bridal makeup and it was perfect. Very professional and the makeup lasted throughout the day.',
            customerName: 'Priya S.',
            service: 'Bridal Makeup'
          },
          {
            rating: 5,
            comment: 'Great experience! The airbrush makeup was flawless and everyone complimented how natural it looked.',
            customerName: 'Kavita M.',
            service: 'Bridal Airbrush'
          },
          {
            rating: 4,
            comment: 'Very talented artist. Did makeup for my entire family and everyone was happy with the results.',
            customerName: 'Anjali R.',
            service: 'Family Makeup'
          }
        ]
      }
    }
  })

  // Makeup by Ragini Singh
  await prisma.vendor.upsert({
    where: { slug: 'makeup-by-ragini-singh' },
    update: {},
    create: {
      name: 'Makeup by Ragini Singh',
      slug: 'makeup-by-ragini-singh',
      email: 'ragini.makeup@gmail.com',
      phone: '+91 98765 43211',
      whatsapp: '+91 98765 43211',
      description: 'Award-winning makeup artist with expertise in traditional bridal looks and contemporary makeup techniques.',
      experience: '8 years',
      eventsDone: 150,
      rating: 5.0,
      reviewCount: 890,
      categoryId: makeupArtistCategory.id,
      locationId: bangalore.id,
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% payment on booking, 50% payment on event date, 50% refund if cancelled 30 days before event',
      additionalInfo: 'Brands: Bobbi Brown, NARS, MAC, Laura Mercier, Anastasia Beverly Hills | Travel: Yes | Trial: Yes (₹3,000 for bridal trial) | Studio: Yes | Specialties: Traditional Looks, Contemporary Makeup, Hair Styling',
      services: {
        create: [
          {
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup with traditional touches',
            price: '₹10,000'
          },
          {
            name: 'Guest Makeup',
            description: 'Makeup for bridesmaids and family',
            price: '₹7,000'
          },
          {
            name: 'Pre-wedding Makeup',
            description: 'Engagement and mehendi makeup',
            price: '₹8,000'
          },
          {
            name: 'Hair Styling',
            description: 'Professional hair styling services',
            price: '₹5,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Traditional Bridal Look',
            description: 'Authentic traditional South Indian bridal makeup',
            imageUrl: '/portfolio/ragini-traditional-1.jpg'
          },
          {
            title: 'South Indian Bridal Makeup',
            description: 'Beautiful traditional bridal transformation',
            imageUrl: '/portfolio/ragini-traditional-2.jpg'
          },
          {
            title: 'Guest Makeup Collection',
            description: 'Elegant makeup for wedding guests',
            imageUrl: '/portfolio/ragini-guest-1.jpg'
          },
          {
            title: 'Pre-wedding Shoot',
            description: 'Romantic pre-wedding makeup session',
            imageUrl: '/portfolio/ragini-prewedding-1.jpg'
          },
          {
            title: 'Hair Styling Portfolio',
            description: 'Professional hair styling services',
            imageUrl: '/portfolio/ragini-hair-1.jpg'
          },
          {
            title: 'Contemporary Bridal Look',
            description: 'Modern bridal makeup with traditional elements',
            imageUrl: '/portfolio/ragini-contemporary-1.jpg'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Ragini is absolutely amazing! She understood exactly what I wanted and delivered beyond expectations.',
            customerName: 'Sneha P.',
            service: 'Bridal Makeup'
          },
          {
            rating: 5,
            comment: 'Perfect traditional look for my wedding. Everyone was complimenting my makeup throughout the day.',
            customerName: 'Meera K.',
            service: 'Traditional Bridal'
          },
          {
            rating: 5,
            comment: 'Great attention to detail and very professional. Highly recommend for weddings.',
            customerName: 'Divya R.',
            service: 'Bridal Makeup'
          }
        ]
      }
    }
  })

  // Create Photographers
  // Photovea Studio
  await prisma.vendor.upsert({
    where: { slug: 'photovea-studio' },
    update: {},
    create: {
      name: 'Photovea Studio',
      slug: 'photovea-studio',
      email: 'info@photoveastudio.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      description: 'Professional wedding photography studio specializing in candid and traditional wedding shoots. We capture your special moments with creativity and passion.',
      experience: '10 years',
      eventsDone: 500,
      rating: 4.8,
      reviewCount: 1250,
      categoryId: photographerCategory.id,
      locationId: chennai.id,
      image: '📸',
      website: 'https://photoveastudio.com',
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'Specializing in wedding photography, pre-wedding shoots, and candid photography',
      services: {
        create: [
          {
            name: 'Wedding Photography',
            description: 'Complete wedding day coverage',
            price: '₹50,000'
          },
          {
            name: 'Pre-wedding Shoot',
            description: 'Engagement and pre-wedding photography',
            price: '₹25,000'
          },
          {
            name: 'Candid Photography',
            description: 'Natural moment capture during wedding',
            price: '₹35,000'
          }
        ]
      },
      packages: {
        create: [
          {
            name: 'Basic Package',
            description: 'Essential wedding photography coverage',
            price: '₹25,000',
            features: '4 hours coverage, 200 edited photos, 1 photographer, Online gallery'
          },
          {
            name: 'Premium Package',
            description: 'Comprehensive wedding photography with extras',
            price: '₹45,000',
            features: '8 hours coverage, 400 edited photos, 2 photographers, Printed album, Drone shots'
          },
          {
            name: 'Luxury Package',
            description: 'Full wedding day coverage with cinematic elements',
            price: '₹75,000',
            features: 'Full day coverage, 600 edited photos, 3 photographers, Cinematic video, Luxury album'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Traditional Wedding',
            description: 'Beautiful traditional wedding ceremony',
            imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400'
          },
          {
            title: 'Candid Moments',
            description: 'Candid shots capturing real emotions',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
          },
          {
            title: 'Pre-wedding Shoot',
            description: 'Romantic pre-wedding photoshoot',
            imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
          },
          {
            title: 'Reception Party',
            description: 'Fun reception party moments',
            imageUrl: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Amazing photography! They captured our wedding perfectly. Highly recommended!',
            customerName: 'Priya & Raj',
            service: 'Wedding Photography'
          },
          {
            rating: 5,
            comment: 'Professional team, great results. Our album is beautiful.',
            customerName: 'Anjali S',
            service: 'Wedding Photography'
          },
          {
            rating: 4,
            comment: 'Good service, timely delivery. Would hire again.',
            customerName: 'Vikram K',
            service: 'Wedding Photography'
          }
        ]
      }
    }
  })

  // Moments Story
  await prisma.vendor.upsert({
    where: { slug: 'moments-story' },
    update: {},
    create: {
      name: 'Moments Story',
      slug: 'moments-story',
      email: 'hello@momentsstory.com',
      phone: '+91 98765 43211',
      whatsapp: '+91 98765 43211',
      description: 'Creative wedding photographers capturing your love story with artistic vision. We specialize in cinematic wedding photography.',
      experience: '8 years',
      eventsDone: 300,
      rating: 4.9,
      reviewCount: 980,
      categoryId: photographerCategory.id,
      locationId: coimbatore.id,
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'Drone photography and cinematic wedding films',
      services: {
        create: [
          {
            name: 'Wedding Photography',
            description: 'Complete wedding coverage with artistic approach',
            price: '₹45,000'
          },
          {
            name: 'Pre-wedding Shoot',
            description: 'Creative pre-wedding photography',
            price: '₹20,000'
          },
          {
            name: 'Drone Photography',
            description: 'Aerial photography for weddings',
            price: '₹15,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Cinematic Wedding',
            description: 'Cinematic wedding film style',
            imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400'
          },
          {
            title: 'Drone Shots',
            description: 'Aerial photography',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
          },
          {
            title: 'Artistic Portraits',
            description: 'Fine art wedding portraits',
            imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Outstanding work! Their cinematic style is amazing.',
            customerName: 'Sneha & Arjun',
            service: 'Wedding Photography'
          },
          {
            rating: 5,
            comment: 'Best wedding photographers in Coimbatore.',
            customerName: 'Kavita M',
            service: 'Wedding Photography'
          }
        ]
      }
    }
  })

  // Cine Pixs Studiios
  await prisma.vendor.upsert({
    where: { slug: 'cine-pixs-studiios' },
    update: {},
    create: {
      name: 'Cine Pixs Studiios',
      slug: 'cine-pixs-studiios',
      email: 'contact@cinepixs.com',
      phone: '+91 98765 43212',
      whatsapp: '+91 98765 43212',
      description: 'Award-winning wedding photographers with cinematic storytelling approach. We combine photography and videography for complete wedding coverage.',
      experience: '12 years',
      eventsDone: 400,
      rating: 4.7,
      reviewCount: 756,
      categoryId: photographerCategory.id,
      locationId: madurai.id,
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'Photography and videography services with cinematic approach',
      services: {
        create: [
          {
            name: 'Wedding Photography',
            description: 'Complete wedding photography coverage',
            price: '₹60,000'
          },
          {
            name: 'Videography',
            description: 'Professional wedding videography',
            price: '₹40,000'
          },
          {
            name: 'Photo + Video Package',
            description: 'Complete wedding coverage with photos and video',
            price: '₹80,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Cinematic Film',
            description: 'Hollywood style wedding film',
            imageUrl: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400'
          },
          {
            title: 'Traditional Ceremony',
            description: 'Traditional South Indian wedding',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Their cinematic approach is unparalleled. Loved the film!',
            customerName: 'Divya & Karan',
            service: 'Photo + Video Package'
          }
        ]
      }
    }
  })

  // Memory Scapes Photography
  await prisma.vendor.upsert({
    where: { slug: 'memory-scapes-photography' },
    update: {},
    create: {
      name: 'Memory Scapes Photography',
      slug: 'memory-scapes-photography',
      email: 'info@memoryscapes.com',
      phone: '+91 98765 43213',
      whatsapp: '+91 98765 43213',
      description: 'Specialized in traditional wedding photography with custom album designs. We focus on capturing cultural wedding traditions beautifully.',
      experience: '7 years',
      eventsDone: 250,
      rating: 4.6,
      reviewCount: 654,
      categoryId: photographerCategory.id,
      locationId: trichy.id,
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'Traditional wedding photography with custom album design',
      services: {
        create: [
          {
            name: 'Wedding Photography',
            description: 'Traditional wedding photography',
            price: '₹35,000'
          },
          {
            name: 'Album Design',
            description: 'Custom wedding album design',
            price: '₹10,000'
          },
          {
            name: 'Traditional Photography Package',
            description: 'Complete traditional wedding coverage with album',
            price: '₹40,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Traditional Album',
            description: 'Custom designed wedding album',
            imageUrl: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400'
          },
          {
            title: 'Family Portraits',
            description: 'Family wedding portraits',
            imageUrl: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 4,
            comment: 'Beautiful traditional photography. Album design is excellent.',
            customerName: 'Lakshmi & Suresh',
            service: 'Traditional Photography Package'
          }
        ]
      }
    }
  })

  // Glamour Beauty Studio (Chennai)
  await prisma.vendor.upsert({
    where: { slug: 'glamour-beauty-studio' },
    update: {},
    create: {
      name: 'Glamour Beauty Studio',
      slug: 'glamour-beauty-studio',
      email: 'glamour.beauty@gmail.com',
      phone: '+91 98765 43210',
      whatsapp: '+91 98765 43210',
      description: 'Professional bridal makeup artists specializing in traditional and modern wedding looks. Expert in South Indian bridal makeup with 10+ years of experience.',
      experience: '10 years',
      eventsDone: 300,
      rating: 4.8,
      reviewCount: 1250,
      categoryId: makeupArtistCategory.id,
      locationId: chennai.id,
      image: '💄',
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'Specializing in traditional South Indian bridal makeup, HD makeup, and airbrush techniques',
      services: {
        create: [
          {
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup with traditional South Indian designs',
            price: '₹15,000'
          },
          {
            name: 'Pre-wedding Makeup',
            description: 'Engagement and mehendi day makeup',
            price: '₹10,000'
          },
          {
            name: 'Party Makeup',
            description: 'Makeup for reception and other wedding events',
            price: '₹8,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Traditional South Indian Bridal',
            description: 'Authentic traditional bridal makeup with intricate designs',
            imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
          },
          {
            title: 'Modern Bridal Look',
            description: 'Contemporary bridal makeup with natural finish',
            imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400'
          },
          {
            title: 'Pre-wedding Shoot Makeup',
            description: 'Romantic makeup for pre-wedding photography',
            imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
          },
          {
            title: 'Reception Party Makeup',
            description: 'Elegant party makeup for wedding reception',
            imageUrl: 'https://images.unsplash.com/photo-1596702718610-a16e8b4af1d6?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Amazing traditional bridal makeup! Everyone complimented how authentic it looked.',
            customerName: 'Priya S.',
            service: 'Bridal Makeup'
          },
          {
            rating: 5,
            comment: 'Perfect for our South Indian wedding. Very professional and skilled artist.',
            customerName: 'Kavita M.',
            service: 'Traditional Bridal'
          },
          {
            rating: 4,
            comment: 'Great work on our pre-wedding shoot. Natural and beautiful makeup.',
            customerName: 'Anjali R.',
            service: 'Pre-wedding Makeup'
          }
        ]
      }
    }
  })

  // Beauty Boulevard (Coimbatore)
  await prisma.vendor.upsert({
    where: { slug: 'beauty-boulevard' },
    update: {},
    create: {
      name: 'Beauty Boulevard',
      slug: 'beauty-boulevard',
      email: 'beauty.boulevard@gmail.com',
      phone: '+91 98765 43211',
      whatsapp: '+91 98765 43211',
      description: 'Creative makeup artists capturing your beauty with artistic vision and precision. Specialists in airbrush makeup and hair styling.',
      experience: '8 years',
      eventsDone: 250,
      rating: 4.9,
      reviewCount: 980,
      categoryId: makeupArtistCategory.id,
      locationId: coimbatore.id,
      image: '💄',
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'Expert in airbrush makeup, hair styling, and contemporary bridal looks',
      services: {
        create: [
          {
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup with hair styling',
            price: '₹12,000'
          },
          {
            name: 'Airbrush Makeup',
            description: 'Flawless airbrush makeup for special occasions',
            price: '₹18,000'
          },
          {
            name: 'Hair Styling',
            description: 'Professional hair styling and updos',
            price: '₹6,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Airbrush Bridal Makeup',
            description: 'Flawless airbrush finish for bridal look',
            imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
          },
          {
            title: 'Contemporary Bridal',
            description: 'Modern bridal makeup with artistic touches',
            imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400'
          },
          {
            title: 'Hair Styling Portfolio',
            description: 'Beautiful hair styling for various occasions',
            imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Outstanding airbrush makeup! My skin looked flawless in all the photos.',
            customerName: 'Sneha P.',
            service: 'Airbrush Makeup'
          },
          {
            rating: 5,
            comment: 'Amazing hair styling and makeup for my wedding. Highly recommended!',
            customerName: 'Meera K.',
            service: 'Bridal Makeup'
          }
        ]
      }
    }
  })

  // Diva Makeup Lounge (Madurai)
  await prisma.vendor.upsert({
    where: { slug: 'diva-makeup-lounge' },
    update: {},
    create: {
      name: 'Diva Makeup Lounge',
      slug: 'diva-makeup-lounge',
      email: 'diva.makeup@gmail.com',
      phone: '+91 98765 43212',
      whatsapp: '+91 98765 43212',
      description: 'Award-winning makeup artists with expertise in bridal and special occasion makeup. Specializing in HD makeup and special effects.',
      experience: '12 years',
      eventsDone: 400,
      rating: 4.7,
      reviewCount: 756,
      categoryId: makeupArtistCategory.id,
      locationId: madurai.id,
      image: '💄',
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'HD makeup specialist, special effects makeup, and traditional bridal looks',
      services: {
        create: [
          {
            name: 'Bridal Makeup',
            description: 'Complete bridal makeup and styling',
            price: '₹18,000'
          },
          {
            name: 'HD Makeup',
            description: 'High-definition makeup for photos and videos',
            price: '₹15,000'
          },
          {
            name: 'Special Effects Makeup',
            description: 'Special effects and creative makeup',
            price: '₹12,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'HD Bridal Makeup',
            description: 'High-definition makeup perfect for wedding photography',
            imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
          },
          {
            title: 'Special Effects',
            description: 'Creative special effects makeup',
            imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400'
          },
          {
            title: 'Traditional Bridal',
            description: 'Beautiful traditional South Indian bridal makeup',
            imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Perfect HD makeup for our wedding photos. Looked amazing in every shot!',
            customerName: 'Divya R.',
            service: 'HD Makeup'
          },
          {
            rating: 4,
            comment: 'Great special effects work for our themed wedding. Very creative!',
            customerName: 'Kiran S.',
            service: 'Special Effects Makeup'
          }
        ]
      }
    }
  })

  // Glamour Queen Makeup (Tiruchirappalli)
  await prisma.vendor.upsert({
    where: { slug: 'glamour-queen-makeup' },
    update: {},
    create: {
      name: 'Glamour Queen Makeup',
      slug: 'glamour-queen-makeup',
      email: 'glamour.queen@gmail.com',
      phone: '+91 98765 43213',
      whatsapp: '+91 98765 43213',
      description: 'Specialized in traditional bridal makeup with focus on South Indian wedding styles. Affordable and high-quality makeup services.',
      experience: '7 years',
      eventsDone: 200,
      rating: 4.6,
      reviewCount: 654,
      categoryId: makeupArtistCategory.id,
      locationId: trichy.id,
      image: '💄',
      isVerified: true,
      isActive: true,
      paymentPolicy: '50% advance payment, balance on event day',
      additionalInfo: 'Traditional South Indian bridal makeup specialist, affordable packages',
      services: {
        create: [
          {
            name: 'Bridal Makeup',
            description: 'Traditional South Indian bridal makeup',
            price: '₹10,000'
          },
          {
            name: 'Mehendi Day Makeup',
            description: 'Makeup for mehendi ceremony',
            price: '₹6,000'
          },
          {
            name: 'Family Makeup',
            description: 'Makeup for family members and guests',
            price: '₹5,000'
          }
        ]
      },
      portfolio: {
        create: [
          {
            title: 'Traditional Bridal Makeup',
            description: 'Authentic South Indian bridal transformation',
            imageUrl: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400'
          },
          {
            title: 'Mehendi Day Look',
            description: 'Beautiful makeup for mehendi ceremony',
            imageUrl: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400'
          },
          {
            title: 'Family Makeup Collection',
            description: 'Makeup services for entire family',
            imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400'
          }
        ]
      },
      reviews: {
        create: [
          {
            rating: 5,
            comment: 'Affordable and excellent traditional bridal makeup. Perfect for our budget.',
            customerName: 'Lakshmi S.',
            service: 'Traditional Bridal'
          },
          {
            rating: 4,
            comment: 'Good service for mehendi day makeup. Natural and beautiful.',
            customerName: 'Priya M.',
            service: 'Mehendi Day Makeup'
          }
        ]
      }
    }
  })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
