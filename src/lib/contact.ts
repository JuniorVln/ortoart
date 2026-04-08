const MAP_DESTINATION =
  "Av. Winston Churchill 1824, sala 208, Pinheirinho, Curitiba - PR, 81130-000";

export const contactInfo = {
  email: "contato@ortoart.com.br",
  phoneDisplay: "(+55) 41 3151-5454",
  phoneHref: "tel:+554131515454",
  hours: "Segunda a Sexta, das 9h às 17h",
  addressLine1: "Av. Winston Churchill 1824, sala 208",
  addressLine2: "Pinheirinho, Curitiba - PR",
  postalCode: "81.130-000",
  fullAddress: `${MAP_DESTINATION}`,
  googleMapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(MAP_DESTINATION)}&z=15&output=embed`,
  googleMapsDirectionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAP_DESTINATION)}`,
  // WhatsApp number inferred from the legacy OrtoArt CTAs. Confirm with the client.
  whatsappNumber: "554191044367",
  whatsappMessage:
    "Olá! Vim pelo site e gostaria de saber mais sobre os materiais da OrtoArt.",
} as const;

export const whatsappUrl = `https://api.whatsapp.com/send?phone=${contactInfo.whatsappNumber}&text=${encodeURIComponent(
  contactInfo.whatsappMessage
)}`;
