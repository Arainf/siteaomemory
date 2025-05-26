const fs = require('fs');
const path = require('path');

const eventsDir = path.join(__dirname, '..', 'components', 'events');

// Component data
const components = {
  compono: {
    title: "COMPONO: SITEAO's Coding Competition 2024",
    description: [
      "COMPONO, SITEAO's premier coding competition, brought together the brightest minds in programming for an intense showcase of technical prowess and problem-solving skills.",
      "Participants faced challenging coding problems that tested their understanding of algorithms, data structures, and efficient programming practices, all while racing against time.",
      "The competition not only highlighted individual talent but also fostered a collaborative learning environment where students could share knowledge and learn from each other's approaches.",
      "Through COMPONO, SITEAO continues to promote excellence in programming and inspire the next generation of tech innovators in our community."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787655/DSC_9348_j1snqm.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787656/DSC_9728_mnnpdm.webp"
    ]
  },
  donation: {
    title: "SITEAO Donation Drive 2024: Sharing Hope, Spreading Love",
    description: [
      "The SITEAO Donation Drive 2024 exemplified our organization's commitment to social responsibility and community service.",
      "Through the generous contributions of our members and supporters, we were able to provide essential supplies and support to those in need.",
      "The initiative brought our community together in a meaningful way, demonstrating how collective effort can make a significant impact.",
      "This event reinforced SITEAO's role not just as an academic organization, but as a force for positive change in our broader community."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp"
    ]
  },
  iggy: {
    title: "SITEAO Celebrates Ignatian Week 2024",
    description: [
      "Ignatian Week 2024 was a profound celebration of our Jesuit heritage and values, bringing together SITEAO members in reflection and service.",
      "Through various activities and spiritual exercises, we explored the intersection of technology and Ignatian spirituality.",
      "The week-long celebration helped strengthen our understanding of how our technical skills can be used in service of others.",
      "This event reminded us of our mission to be men and women for others in the field of technology and engineering."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp"
    ]
  },
  induction: {
    title: "SITEAO Induction Ceremony 2024",
    description: [
      "The SITEAO Induction Ceremony 2024 marked a significant milestone as we welcomed our newest members into the organization.",
      "The ceremony celebrated the commitment and potential of our inductees while reinforcing the values and mission of SITEAO.",
      "Through meaningful rituals and inspiring messages, we emphasized the importance of excellence, service, and community.",
      "This event symbolized the beginning of a new chapter for our organization and our newest Griffins."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787655/DSC_9348_j1snqm.webp"
    ]
  },
  justice: {
    title: "SITEAO Justice Week 2024: Tech for Social Change",
    description: [
      "Justice Week 2024 focused on exploring how technology can be leveraged to address social inequalities and promote justice.",
      "Through workshops, discussions, and hands-on projects, members learned about the ethical implications of technology and its role in social change.",
      "The event featured collaborations with various advocacy groups, highlighting real-world applications of tech solutions for social issues.",
      "This initiative reinforced SITEAO's commitment to developing socially responsible tech leaders."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp"
    ]
  },
  lanyard: {
    title: "SITEAO Lanyard Distribution 2024",
    description: [
      "The SITEAO Lanyard Distribution 2024 was more than just a simple handout - it was a celebration of identity and belonging.",
      "Each lanyard represented not just membership, but a commitment to excellence and service that defines every SITEAO Griffin.",
      "The event provided an opportunity for members to connect, share experiences, and strengthen their sense of community.",
      "Through this simple yet meaningful gesture, we reinforced the bonds that make SITEAO a unique and vibrant organization."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp"
    ]
  },
  midterm: {
    title: "SITEAO Midterm Week Support 2024",
    description: [
      "During Midterm Week 2024, SITEAO demonstrated its commitment to academic excellence through comprehensive support initiatives.",
      "From study groups to review sessions, we provided various resources to help members navigate their academic challenges.",
      "The program fostered a collaborative learning environment where students could share knowledge and study strategies.",
      "This initiative highlighted SITEAO's dedication to supporting the academic success of every Griffin."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp"
    ]
  },
  olympics: {
    title: "SITEAO Olympics 2024: Uniting Through Sport",
    description: [
      "The SITEAO Olympics 2024 brought our community together through friendly competition and athletic excellence.",
      "From traditional sports to tech-themed games, the event showcased the diverse talents of our members beyond academics.",
      "The olympics fostered team spirit, healthy competition, and camaraderie among participants from different courses and years.",
      "This annual tradition continues to strengthen bonds and create lasting memories within the SITEAO community."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787655/DSC_9348_j1snqm.webp"
    ]
  },
  orsem: {
    title: "SITEAO ORSEM 2024: Welcome to the Family",
    description: [
      "ORSEM 2024 served as the perfect introduction to SITEAO for our newest members, showcasing the organization's vibrant culture and opportunities.",
      "Through interactive sessions and team-building activities, freshmen got to know their fellow Griffins and learn about SITEAO's mission and values.",
      "The event featured presentations from various departments, giving new members a comprehensive view of how they can get involved and grow within the organization.",
      "This orientation set the foundation for what promises to be an exciting journey for our newest SITEAO family members."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787655/DSC_9348_j1snqm.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787656/DSC_9728_mnnpdm.webp"
    ]
  },
  siteaoplus: {
    title: "SITEAO+ 2024: Beyond Excellence",
    description: [
      "SITEAO+ 2024 represented our organization's commitment to going above and beyond in serving our members and the community.",
      "This initiative encompassed various programs aimed at professional development, technical skills enhancement, and leadership training.",
      "Through partnerships with industry leaders and alumni, we provided valuable networking opportunities and insights into career paths.",
      "SITEAO+ continues to be our platform for pushing boundaries and exploring new ways to add value to our members' academic journey."
    ],
    images: [
      "https://res.cloudinary.com/dxjspzyrh/image/upload/v1747787652/DSC_9132_yqongh.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787654/DSC_9076_ettonq.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_8986_cndryk.webp",
      "https://res.cloudinary.com/dxjspzyrh/image/upload/e_improve/v1747787653/DSC_9160_nfr1x9.webp"
    ]
  }
};

// Template for component files
const getComponentTemplate = (name, { title, description, images }) => `"use client"

import EventTemplate from './template'

export default function ${name.charAt(0).toUpperCase() + name.slice(1)}() {
  const title = ${JSON.stringify(title)}
  
  const description = ${JSON.stringify(description, null, 2)}

  const images = ${JSON.stringify(images, null, 2)}

  return <EventTemplate title={title} description={description} images={images} />
}
`;

// Update each component
Object.entries(components).forEach(([name, data]) => {
  const filePath = path.join(eventsDir, `${name}.tsx`);
  const content = getComponentTemplate(name, data);
  fs.writeFileSync(filePath, content);
  console.log(`Updated ${name}.tsx`);
});

console.log('All components updated successfully!'); 