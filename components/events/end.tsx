"use client"

import EventTemplate from './template'

export default function End() {
  const title = "SITEAO's Year-End Thanksgiving"
  
  const description = [
    "As the academic year draws to a close, the Science, Information Technology and Engineering Academic Organization (SITEAO) recently gathered for its highly anticipated Year-End Thanksgiving, a moment to reflect on the triumphs, challenges, and collective spirit that defined this administration's journey. It was a time to acknowledge the hard work, dedication, and unwavering commitment of every Griffin who contributed to the organization's success.",
    "This year's leadership, guided by the profound motto \"Mata sa Langit, Paa sa Lupa\", has truly embodied its essence. SITEAO aimed high, pushing boundaries in innovation and service, while remaining firmly grounded in humility and their core purpose of serving the student body.",
    "Far beyond merely acknowledging successes, the Thanksgiving gathering was a sincere outpouring of thanks for the deep camaraderie, the insights gained, and the collective evolution witnessed throughout the year. It powerfully reinforced the solid foundation and bright prospects the current SITEAO administration has built for the Griffins."
  ]

  const images = [
    "/assets/img/Event pictures/DSC_1435_optimized.webp",
    "/assets/img/Event pictures/DSC_1428_optimized.webp",
    "/assets/img/Event pictures/DSC_1404_optimized.webp",
    "/assets/img/Event pictures/DSC_1375_optimized.webp",
    "/assets/img/Event pictures/DSC_1352_optimized.webp",
    "/assets/img/Event pictures/DSC_1339_optimized.webp",
    "/assets/img/Event pictures/DSC_1337_optimized.webp",
    "/assets/img/Event pictures/DSC_1320_optimized.webp",
    "/assets/img/Event pictures/DSC_1308_optimized.webp",
    "/assets/img/Event pictures/DSC_1305_optimized.webp",
    "/assets/img/Event pictures/DSC_1303_optimized.webp",
    "/assets/img/Event pictures/DSC_1294_optimized.webp",
    "/assets/img/Event pictures/DSC_1292_optimized.webp",
    "/assets/img/Event pictures/DSC_1260_optimized.webp",
    "/assets/img/Event pictures/DSC_1203_optimized.webp",
    "/assets/img/Event pictures/DSC_1188_optimized.webp",
    "/assets/img/Event pictures/DSC_1167_optimized.webp",
    "/assets/img/Event pictures/DSC_1158_optimized.webp",
    "/assets/img/Event pictures/DSC_1157_optimized.webp",
    "/assets/img/Event pictures/DSC_1156_optimized.webp",
    "/assets/img/Event pictures/DSC_1155_optimized.webp",
    "/assets/img/Event pictures/DSC_1153_optimized.webp",
    "/assets/img/Event pictures/DSC_1147_optimized.webp",
    "/assets/img/Event pictures/DSC_1144_optimized.webp",
    "/assets/img/Event pictures/DSC_1140_optimized.webp",
    "/assets/img/Event pictures/DSC_1137_optimized.webp",
    "/assets/img/Event pictures/DSC_1134_optimized.webp",
    "/assets/img/Event pictures/DSC_1133_optimized.webp",
    "/assets/img/Event pictures/DSC_1116_optimized.webp",
    "/assets/img/Event pictures/DSC_1108_optimized.webp",
    "/assets/img/Event pictures/DSC_1107_optimized.webp",
    "/assets/img/Event pictures/DSC_1100_optimized.webp",
    "/assets/img/Event pictures/DSC_1099_optimized.webp",
    "/assets/img/Event pictures/DSC_1095_optimized.webp",
    "/assets/img/Event pictures/DSC_1094_optimized.webp",
    "/assets/img/Event pictures/DSC_1081_optimized.webp",
    "/assets/img/Event pictures/DSC_1078_optimized.webp",
    "/assets/img/Event pictures/DSC_1073_optimized.webp",
    "/assets/img/Event pictures/DSC_1070_optimized.webp",
    "/assets/img/Event pictures/DSC_1067_optimized.webp",
    "/assets/img/Event pictures/DSC_1066_optimized.webp"
  ]

  return <EventTemplate title={title} description={description} images={images} />
}

