# TODO: Add Sun/Moon Toggle in Hero Section

- [x] Import Moon icon from lucide-react in Hero.tsx
- [x] Add state for theme toggle (isDarkMode)
- [x] Add toggle button in top right of hero section
- [x] Implement hover rotation animation
- [x] Implement click to toggle between sun and moon icons
- [x] Add basic dark mode class toggle on body or root element

# TODO: Add Partner Banks Section

- [x] Create new component src/components/PartnerBanks.tsx with section title, grid layout for 8 banks, bank logos from online URLs, and smooth classic styling
- [x] Edit src/App.tsx to import PartnerBanks component and render it after About component
- [x] Run development server to verify section renders correctly and images load
- [x] Test responsiveness on different screen sizes
- [x] Update navigation in Header.tsx to include Partner Banks link

# TODO: Add Channel Partners Map Modal

- [x] Add "Our Channel Partners" button to Hero section with #FF6600 background, white text, rounded corners, hover effect
- [x] Create MapModal component with Andhra Pradesh map, clickable markers for 8 cities, tooltips, and close button
- [x] Add dedicated sections for each city (Palakollu, Narasapuram, Mogalathuru, Bhimavaram, Gokavaram, Kakinada, JRG, Tenali) with placeholder content
- [x] Implement scroll functionality when city markers are clicked
- [x] Ensure modal is mobile-friendly and matches site theme

# TODO: Add "Become Our Channel Partner" Section

- [x] Update PartnerRegistration.tsx to display partner benefits and contact information
- [x] Add "Become Our Channel Partner" button in Quotation.tsx that scrolls to partner registration section
- [x] Import and render PartnerRegistration component in App.tsx after ChannelPartners
- [x] Run TypeScript check to ensure no compilation errors

# TODO: Add ScrollAnimation to Components

- [x] Add ScrollAnimation import and wrap sections in PartnerBanks.tsx
- [x] Add ScrollAnimation import and wrap sections in Services.tsx
- [x] Add ScrollAnimation import and wrap sections in ChannelPartners.tsx
- [x] Add ScrollAnimation import and wrap sections in Quotation.tsx
- [x] Test animations work correctly on scroll

# TODO: Add Solar Installation Image Gallery

- [x] Copy 17 AI-generated solar images from external folder to public/ai-images/
- [x] Create image gallery section between services grid and installation process
- [x] Add zoom functionality with modal overlay
- [x] Implement left/right navigation in modal
- [x] Add hover effects and smooth transitions
- [x] Ensure responsive grid layout for different screen sizes
