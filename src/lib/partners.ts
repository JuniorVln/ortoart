export type PartnerRecord = {
  slug: string;
  name: string;
  eyebrow: string;
  description: string;
  website: string;
  logoSrc: string;
  focusAreas: readonly string[];
  exclusive?: boolean;
};

export const partnerRecords = [
  {
    slug: "orthofix",
    name: "Orthofix",
    eyebrow: "Coluna vertebral",
    description:
      "Representação exclusiva da OrtoArt para soluções de coluna, ortopedia especializada e tecnologias voltadas à segurança cirúrgica.",
    website: "https://orthofix.com/",
    logoSrc: "/partners/orthofix.png",
    focusAreas: ["Exclusivo na OrtoArt", "Coluna", "Ortopedia"],
    exclusive: true,
  },
  {
    slug: "bonss",
    name: "BONSS",
    eyebrow: "Cirurgia minimamente invasiva",
    description:
      "Tecnologias para cirurgia de coluna e procedimentos minimamente invasivos, com foco em precisão, fluidez e eficiência intraoperatória.",
    website: "https://bonssmedical.com/",
    logoSrc: "/partners/bonss.png",
    focusAreas: ["Coluna", "MIS", "Precisão cirúrgica"],
    exclusive: false,
  },
  {
    slug: "parcus",
    name: "Parcus",
    eyebrow: "Medicina esportiva",
    description:
      "Soluções para joelho, ombro, quadril e extremidades, integrando o portfólio global de sports med hoje conectado à Medacta.",
    website: "https://www.medacta.us.com/US/home-sports-med-us",
    logoSrc: "/partners/parcus.png",
    focusAreas: ["Joelho", "Ombro", "Sports med"],
    exclusive: false,
  },
  {
    slug: "sintegra",
    name: "Sintegra",
    eyebrow: "Reconstrução e reparo",
    description:
      "Implantes e biomateriais para medicina esportiva, com soluções voltadas à reparação tecidual e estabilidade em procedimentos ortopédicos.",
    website: "https://sintegrasurgical.com.br/",
    logoSrc: "/partners/sintegra.png",
    focusAreas: ["Âncoras", "Biomateriais", "Reconstrução"],
    exclusive: false,
  },
  {
    slug: "nexxmed",
    name: "Nexxmed",
    eyebrow: "Endoscopia e acesso",
    description:
      "Instrumentais e plataformas para técnicas endoscópicas e abordagens minimamente invasivas, ampliando o suporte em sala para cirurgias delicadas.",
    website: "https://nexxmed.com.br/",
    logoSrc: "/partners/nexxmed.png",
    focusAreas: ["Endoscopia", "BESS", "MIS"],
    exclusive: false,
  },
  {
    slug: "hortron",
    name: "Hortron",
    eyebrow: "Instrumentos e energia",
    description:
      "Dispositivos e instrumentais para artroscopia e ortopedia, com portfólio focado em confiabilidade técnica e disponibilidade cirúrgica.",
    website: "https://hortron.com.br/",
    logoSrc: "/partners/hortron.png",
    focusAreas: ["Artroscopia", "Instrumentais", "Suporte em sala"],
    exclusive: false,
  },
] as const satisfies readonly PartnerRecord[];

export const partnerBrands = partnerRecords.map((partner) => ({
  name: partner.name,
}));
