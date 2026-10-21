import type { CreativeWorkItem } from '../types/project'
import { asset } from '../utils/asset'

export const CREATIVE_WORK_ITEMS: CreativeWorkItem[] = [
  {
    id: 'hanasui-cosmetic-campaign',
    title: 'Hanasui Cosmetics: Tactile Product & Shade Campaign',
    brandOrConcept: 'Unofficial concept · Beauty & Cosmetics',
    category: 'Advertising & Campaign Assets',
    format: '4:3 Campaign Key Visual · Product & Texture Direction',
    classification: 'Conceptual Campaign Study',
    engagement: 'concept',
    availabilityStatus: 'Available Now',
    objective:
      'Communicate formula richness, shade accuracy, and packaging quality in a single hero visual that elevates brand perception across digital campaigns.',
    creativeDirection:
      'Frosted matte Hanasui lip tube with a brushed rose-gold cap resting in a glossy terracotta pigment swirl on warm architectural travertine stone with soft directional sunlight.',
    deliverables: [
      'High-resolution hero product visual showcasing real formula texture and shade payoff',
      'Warm architectural stone and sunlit shadow staging tailored for beauty campaigns',
      'Multi-format crops prepared for marketplace banners, social feeds, and launch ads',
      'Coordinated color palette and lighting direction for seasonal shade collections',
    ],
    intendedValue:
      'Helps beauty and personal care brands make their product texture and quality immediately tangible to online shoppers before they ever test the product in person.',
    palette: {
      primary: '#7D4B3E',
      secondary: '#DFCBB8',
      accent: '#B57B6C',
      label: 'Rose Terracotta · Warm Travertine · Brushed Rose Gold',
    },
    aspectRatio: '4:3',
    mediaType: 'uploaded-media',
    previewImage: asset('creative-work/hanasui-product-ad.webp'),
    storyboardFrames: [
      {
        step: '01 · Texture & Formula',
        title: 'Glossy Terracotta Pigment Swirl',
        caption: 'Sculpted liquid gloss base that demonstrates real shade depth and smooth formula consistency.',
      },
      {
        step: '02 · Product Hero',
        title: 'Frosted Tube & Rose-Gold Cap',
        caption: 'Crisp metallic typography and tactile frosted packaging lit by warm directional studio light.',
      },
      {
        step: '03 · Architectural Stage',
        title: 'Sunlit Travertine Monoliths',
        caption: 'Natural stone geometry and soft shadows that frame the product with editorial authority.',
      },
    ],
  },
  {
    id: 'artisan-burger-campaign',
    title: 'Flame-Grilled Burger: Culinary Campaign Key Visual',
    brandOrConcept: 'Studio Advertising Showcase · Food, Beverage & Hospitality',
    category: 'Advertising & Campaign Assets',
    format: '4:3 Campaign Key Visual · Atmospheric Food Direction',
    classification: 'Conceptual Campaign Study',
    engagement: 'concept',
    availabilityStatus: 'Available Now',
    objective:
      'Create unmistakable appetite appeal and premium culinary positioning that drives customer cravings, menu promotions, and restaurant foot traffic.',
    creativeDirection:
      'From fire to perfection: an artisanal sesame-brioche cheeseburger staged on a charred timber board with rising woodfire smoke, glowing embers, and editorial headline typography.',
    deliverables: [
      'High-contrast culinary key visuals with dramatic fire, smoke, and studio rim lighting',
      'Ad-ready promotional layouts with integrated campaign copy ("From fire to perfection")',
      'Menu launch, billboard, and digital delivery platform hero imagery',
      'Visual campaign assets designed to pair seamlessly with restaurant digital menus',
    ],
    intendedValue:
      'Elevates restaurant and culinary brands above standard menu photos by turning signature dishes into memorable, high-converting campaign visuals.',
    palette: {
      primary: '#14110F',
      secondary: '#E59A38',
      accent: '#B84A1E',
      label: 'Charred Oak · Melted Cheddar Gold · Woodfire Ember',
    },
    aspectRatio: '4:3',
    mediaType: 'uploaded-media',
    previewImage: asset('creative-work/burger-campaign.webp'),
    storyboardFrames: [
      {
        step: '01 · Atmosphere',
        title: 'Woodfire Embers & Rising Smoke',
        caption: 'Dark studio backdrop with live glowing embers and wisps of smoke that communicate fresh flame-grilling.',
      },
      {
        step: '02 · Hero Subject',
        title: 'Artisanal Brioche & Melted Glaze',
        caption: 'Directional rim lighting accentuates the toasted sesame bun, melted cheese, and crisp greens.',
      },
      {
        step: '03 · Campaign Message',
        title: 'From Fire to Perfection Lockup',
        caption: 'Editorial serif and sans-serif campaign headline balanced cleanly in the upper negative space.',
      },
    ],
  },
  {
    id: 'late-cold-brew-campaign',
    title: 'LATE Black Cold Brew: Dynamic Social & Launch Visual',
    brandOrConcept: 'Studio Advertising Showcase · Ready-to-Drink Beverage (250 ML)',
    category: 'Advertising & Campaign Assets',
    format: '9:16 Vertical Social Ad · Product Launch Creative',
    classification: 'Conceptual Campaign Study',
    engagement: 'concept',
    availabilityStatus: 'Available Now',
    objective:
      'Capture attention immediately in vertical social feeds with a high-energy beverage visual that highlights packaging design and fresh coffee ingredients.',
    creativeDirection:
      'A hand catching the matte espresso and navy LATE Black Cold Brew can mid-air, surrounded by floating roasted coffee beans against a clean warm-cream studio backdrop.',
    deliverables: [
      '9:16 vertical social advertising visual engineered for Instagram Reels, Stories, and TikTok ads',
      'Dynamic mid-air product and floating ingredient composition with crisp studio lighting',
      'High-contrast packaging illumination keeping brand typography sharp and legible on mobile screens',
      'Adaptable campaign layout ready for promotional headlines and retail launch announcements',
    ],
    intendedValue:
      'Gives beverage and consumer brands scroll-stopping social advertising assets built natively for vertical mobile screens where customers discover new products.',
    palette: {
      primary: '#231C18',
      secondary: '#F3ECE1',
      accent: '#20334F',
      label: 'Roasted Espresso · Warm Studio Cream · Deep Slate Blue',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    previewImage: asset('creative-work/cold-brew-campaign.webp'),
    storyboardFrames: [
      {
        step: '01 · Mobile Hook',
        title: 'Mid-Air Hand & Can Action',
        caption: 'Human interaction and tilted can angle create immediate movement and energy in vertical feeds.',
      },
      {
        step: '02 · Ingredient Story',
        title: 'Suspended Roasted Coffee Beans',
        caption: 'Floating whole coffee beans at varying depths reinforce authentic cold-brew craftsmanship.',
      },
      {
        step: '03 · Brand Clarity',
        title: 'High-Contrast Packaging Readability',
        caption: 'Bold LATE typography and navy-on-espresso color blocking remain crisp at mobile thumbnail scale.',
      },
    ],
  },
  {
    id: 'hanasui-cosmetic-commercial-video',
    title: 'Hanasui Lip Cream: 3D Liquid Ribbon & Macro Commercial',
    brandOrConcept: 'Unofficial concept · Beauty & Cosmetics Motion Film',
    category: 'Cinematic Video & Visual Production',
    format: '9:16 Animated Commercial Film · Full Motion & Sound',
    classification: 'Conceptual Campaign Study',
    engagement: 'concept',
    availabilityStatus: 'Available Now',
    objective:
      'Turn static beauty packaging into a captivating motion commercial that demonstrates liquid texture, applicator precision, and shade richness in seconds.',
    creativeDirection:
      'An open Hanasui lip cream bottle and wand suspended above a sweeping 3D ribbon of rose-terracotta gloss and floating droplets, cutting to a macro close-up of the applicator tip swirling through pigment.',
    deliverables: [
      '9:16 vertical commercial film built for Instagram Reels, TikTok, and YouTube Shorts campaigns',
      'Fluid 3D cosmetic ribbon and suspended droplet motion simulation matching brand shade tones',
      'Macro texture close-up sequences highlighting applicator softness and gloss finish',
      'Complete audio-visual commercial master ready for paid social media deployment',
    ],
    intendedValue:
      'Stops mobile scrollers immediately by combining product recognition with tactile, close-up formula motion that static photos cannot convey.',
    palette: {
      primary: '#6E3E32',
      secondary: '#EAD9C8',
      accent: '#B57B6C',
      label: 'Terracotta Gloss · Warm Nude Silk · Rose Gold',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    videoUrl: asset('creative-work/cosmetic-commercial.mp4'),
    previewImage: asset('creative-work/cosmetic-poster.webp'),
    storyboardFrames: [
      {
        step: '01 · Opening Motion',
        title: 'Floating Bottle & 3D Gloss Wave',
        caption: 'Open Hanasui tube and wand poised over a flowing ribbon of terracotta liquid and weightless droplets.',
      },
      {
        step: '02 · Macro Detail',
        title: 'Plush Applicator Pigment Swirl',
        caption: 'Extreme close-up of the textured wand tip gliding through rich, glossy lip cream.',
      },
      {
        step: '03 · Hero Resolve',
        title: 'Dynamic Ribbon Finale',
        caption: 'Sweeping vertical liquid arc framing the product for a memorable brand finish.',
      },
    ],
  },
  {
    id: 'ethereal-bloom-perfume-commercial',
    title: 'Ethereal Bloom Fragrance: Botanical Splash & Flacon Film',
    brandOrConcept: 'Studio Video Showcase · Luxury Perfume & Botanical Storytelling',
    category: 'Cinematic Video & Visual Production',
    format: '9:16 Cinematic Brand Film · Botanical & Water Motion',
    classification: 'Conceptual Campaign Study',
    engagement: 'concept',
    availabilityStatus: 'Available Now',
    objective:
      'Evoke the fresh citrus and floral scent profile of a signature fragrance visually through natural water movement, sunlight, and botanical storytelling.',
    creativeDirection:
      'Dewy green lime slices and white jasmine blossoms resting on rippling water in golden morning light, building to a slow-motion water splash that reveals the emerald glass Ethereal Bloom flacon.',
    deliverables: [
      'Cinematic fragrance commercial film translating scent notes into visual atmosphere',
      'Slow-motion water ripple, droplet, and botanical petal sequences in natural studio light',
      'Hero glass flacon reveal with crisp gold atomizer reflections and typography clarity',
      'Ambient soundscape and water acoustics tailored for luxury brand storytelling',
    ],
    intendedValue:
      'Allows fragrance and lifestyle brands to make customers feel the freshness and mood of a scent through screen-filling visual poetry.',
    palette: {
      primary: '#1E3824',
      secondary: '#F4F6EC',
      accent: '#C5A654',
      label: 'Emerald Glass · Jasmine White · Brushed Gold',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    videoUrl: asset('creative-work/perfume-commercial.mp4'),
    previewImage: asset('creative-work/perfume-poster.webp'),
    storyboardFrames: [
      {
        step: '01 · Scent Notes',
        title: 'Dewy Lime & Jasmine Blossoms',
        caption: 'Close-up botanical ingredients resting on gently rippling water with ambient nature acoustics.',
      },
      {
        step: '02 · Transition',
        title: 'Slow-Motion Water Crown Splash',
        caption: 'Crisp crystal water splash rising across the frame to introduce the fragrance bottle.',
      },
      {
        step: '03 · Flacon Reveal',
        title: 'Ethereal Bloom Emerald Bottle',
        caption: 'Sunlit green glass flacon and gold cap surrounded by drifting white petals.',
      },
    ],
  },
  {
    id: 'artisan-burger-commercial-video',
    title: 'Artisanal Cheeseburger: Slow-Motion Culinary Commercial',
    brandOrConcept: 'Studio Video Showcase · Culinary & Hospitality Motion Film',
    category: 'Cinematic Video & Visual Production',
    format: '9:16 Culinary Commercial · Slow-Motion Assembly & Sound Design',
    classification: 'Conceptual Campaign Study',
    engagement: 'concept',
    availabilityStatus: 'Available Now',
    objective:
      'Showcase ingredient freshness and kitchen craftsmanship through a mouth-watering slow-motion assembly commercial that drives immediate food orders.',
    creativeDirection:
      'Layer-by-layer culinary choreography: crisp green lettuce landing on a toasted bun, a flame-grilled beef patty with melted cheddar dropping with rising steam, rich signature sauce pouring in slow motion, and the sesame brioche crown completing the build.',
    deliverables: [
      'High-frame-rate slow-motion food commercial highlighting fresh ingredients and steam',
      'Tactile culinary sound design (sizzle, sauce pour, and bun placement) for full sensory impact',
      'Vertical 9:16 ad master engineered for restaurant promotions, social ads, and digital signage',
      'Coordinated campaign pairing between motion video commercials and static key visuals',
    ],
    intendedValue:
      'Combines motion, steam, and sound to create irresistible appetite appeal for restaurant launches and promotional campaigns.',
    palette: {
      primary: '#1A130E',
      secondary: '#E59A38',
      accent: '#4A7C36',
      label: 'Toasted Brioche · Signature Sauce Amber · Crisp Leaf Green',
    },
    aspectRatio: '9:16',
    mediaType: 'uploaded-media',
    videoUrl: asset('creative-work/burger-commercial.mp4'),
    previewImage: asset('creative-work/burger-poster.webp'),
    storyboardFrames: [
      {
        step: '01 · Fresh Base',
        title: 'Toasted Bun & Crisp Lettuce Drop',
        caption: 'Slow-motion drop of fresh green lettuce onto a warm, golden-toasted brioche base.',
      },
      {
        step: '02 · Flame & Steam',
        title: 'Melted Cheddar Patty & Sauce Pour',
        caption: 'Steaming flame-grilled beef patty followed by a glossy ribbon of signature house sauce.',
      },
      {
        step: '03 · Final Crown',
        title: 'Sesame Brioche Placement',
        caption: 'The toasted sesame bun crown completes the burger with a wisp of rising kitchen steam.',
      },
    ],
  },
]
