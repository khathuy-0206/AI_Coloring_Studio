import {
  NamedPalette,
  InspirationConceptItem,
  InspirationCategory,
  ChallengeItem,
  FreebieItem,
  ArticleItem,
  QuizQuestion,
} from "@/types";
import {
  INSPIRATION_CATEGORIES,
  COMPREHENSIVE_INSPIRATION_CONCEPTS,
} from "./inspiration-data";

// 1. Thư viện Bảng Màu (Named Palettes - Hỗ trợ Đa sắc & Liên kết động 60-30-10)
export const NAMED_PALETTES: NamedPalette[] = [
  {
    id: "lavender-dream",
    name: "Giấc Mơ Oải Hương",
    description: "Sắc tím tử đinh hương, oải hương mờ ảo, xanh sương mai và kem vani dịu êm.",
    colors: ["#B892FF", "#DFCCF1", "#A2D2FF", "#F3C4FB", "#FFFDF9"],
    dominantColor: "#B892FF",
    accentColors: ["#A2D2FF", "#F3C4FB"],
    styleGroup: "Pastel",
    tags: ["Pastel", "Tím oải hương", "Xanh sương mai"],
  },
  {
    id: "strawberry-milk",
    name: "Sữa Dâu Ngọt Ngào",
    description: "Màu hồng dâu tây chín, kem đào ngọt ngào, hồng phấn và xanh bạc hà sữa tươi.",
    colors: ["#FF7597", "#FFB3C6", "#FFD6A5", "#B8E0D2", "#FFFDF9"],
    dominantColor: "#FF7597",
    accentColors: ["#FFD6A5", "#B8E0D2"],
    styleGroup: "Cute",
    tags: ["Cute", "Hồng dâu", "Bạc hà sữa"],
  },
  {
    id: "ocean-breeze",
    name: "Gió Biển Ban Mai",
    description: "Sương sớm ven biển, màu xanh đại dương, ngọc bích trong veo và cát vàng nắng sớm.",
    colors: ["#4EA8DE", "#90E0EF", "#64DFDF", "#FFE599", "#EBF4F6"],
    dominantColor: "#4EA8DE",
    accentColors: ["#64DFDF", "#FFE599"],
    styleGroup: "Peaceful",
    tags: ["Peaceful", "Xanh đại dương", "Ngọc bích"],
  },
  {
    id: "sakura-garden",
    name: "Vườn Hoa Anh Đào",
    description: "Cánh hoa anh đào khoe sắc trên nền lá trà xanh matcha và nắng xuân ấm áp.",
    colors: ["#FF85A1", "#FFCCD5", "#74C69D", "#B7E4C7", "#FFF8F0"],
    dominantColor: "#FF85A1",
    accentColors: ["#74C69D", "#FFCCD5"],
    styleGroup: "Cute",
    tags: ["Kawaii", "Hoa anh đào", "Trà xanh matcha"],
  },
  {
    id: "cozy-autumn",
    name: "Mùa Thu Ấm Áp",
    description: "Màu cam đất quế thơm, lá phong mật ong, xanh ngọc cổ điển và yến mạch nướng.",
    colors: ["#E29578", "#F4A261", "#83C5BE", "#DDBEA9", "#EDF6F9"],
    dominantColor: "#E29578",
    accentColors: ["#83C5BE", "#F4A261"],
    styleGroup: "Cozy",
    tags: ["Cozy", "Cam đất", "Mật ong ấm"],
  },
  {
    id: "midnight-magic",
    name: "Phép Thuật Nửa Đêm",
    description: "Nền trời đêm xanh thẳm, tím thạch anh huyền ảo, lam ánh trăng và bụi sao vàng.",
    colors: ["#2B2D42", "#9D4EDD", "#8D99AE", "#C7B9FF", "#EDF2F4"],
    dominantColor: "#2B2D42",
    accentColors: ["#9D4EDD", "#C7B9FF"],
    styleGroup: "Magical",
    tags: ["Magical", "Trời đêm", "Tím thạch anh"],
  },
  {
    id: "mint-lemonade",
    name: "Trà Chanh Bạc Hà",
    description: "Xanh bạc hà tươi mát, vàng chanh mật ong rực rỡ và kem sữa sảng khoái.",
    colors: ["#52B788", "#95D5B2", "#FFD166", "#FFEE99", "#FAF7F2"],
    dominantColor: "#52B788",
    accentColors: ["#FFD166", "#95D5B2"],
    styleGroup: "Vibrant",
    tags: ["Vibrant", "Xanh bạc hà", "Vàng chanh"],
  },
  {
    id: "peach-sorbet",
    name: "Kem Tuyết Vị Đào",
    description: "Quả đào mùa hạ chín mọng, cam san hô ngọt ngào, tím lilac và kem vani.",
    colors: ["#FF9F68", "#FFCAD4", "#F28482", "#CDB4DB", "#FFFDF9"],
    dominantColor: "#FF9F68",
    accentColors: ["#F28482", "#CDB4DB"],
    styleGroup: "Pastel",
    tags: ["Pastel", "Cam đào", "Tím lilac"],
  },
  {
    id: "coco-marker-pop",
    name: "Bút Dạ Đa Sắc (Coco Pop)",
    description: "Phổ màu bút dạ nghệ thuật đa sắc: Hồng dâu, Vàng nắng, Xanh cốm, Lam ngọc và Tím mộng mơ.",
    colors: ["#FF6B8B", "#FFD166", "#70E000", "#48CAE4", "#9D4EDD"],
    dominantColor: "#FF6B8B",
    accentColors: ["#FFD166", "#48CAE4"],
    styleGroup: "Vibrant",
    tags: ["Vibrant", "Đa sắc", "Bút dạ"],
  },
  {
    id: "fairy-forest",
    name: "Khu Rừng Thần Tiên",
    description: "Sự kết hợp đa sắc giữa Tím phép thuật, Xanh lục bảo, Hồng tiên nữ và Lam suối nguồn.",
    colors: ["#9D4EDD", "#52B788", "#FF85A1", "#48CAE4", "#FFF3B0"],
    dominantColor: "#9D4EDD",
    accentColors: ["#52B788", "#FF85A1"],
    styleGroup: "Magical",
    tags: ["Magical", "Tím phép thuật", "Xanh lục bảo"],
  },

  // ================= NHÓM "RETRO / VINTAGE" (HOÀI CỔ) =================
  {
    id: "retro-70s-sunset",
    name: "Hoài Cổ Thập Niên 70 (Retro 70s)",
    description: "Sắc màu hoài cổ đặc trưng với cam cháy, vàng mù tạt, xanh rêu cổ điển, nâu gạch và kem giấy xưa.",
    colors: ["#D95D39", "#F0A202", "#4F6D5A", "#9E2A2B", "#F4F1DE"],
    dominantColor: "#D95D39",
    accentColors: ["#F0A202", "#4F6D5A"],
    styleGroup: "Retro",
    tags: ["Retro/Vintage", "Cam cháy", "Vàng mù tạt", "Xanh rêu", "Nâu gạch"],
  },
  {
    id: "vintage-vinyl-diner",
    name: "Tiệm Đĩa Than Cổ Điển (Vinyl Diner)",
    description: "Tông màu phòng trà và tiệm đĩa than xưa: đỏ gạch nung, vàng mù tạt ấm, xanh rêu rừng và nâu gỗ sồi.",
    colors: ["#BC4749", "#E09F3E", "#386641", "#6A4C3B", "#F2E8CF"],
    dominantColor: "#BC4749",
    accentColors: ["#E09F3E", "#386641"],
    styleGroup: "Retro",
    tags: ["Retro/Vintage", "Nâu gạch", "Vàng mù tạt", "Xanh rêu"],
  },
  {
    id: "nostalgic-film-roll",
    name: "Cuộn Phim Nhựa Xưa (Kodak 1975)",
    description: "Màu ảnh phim analog ấm áp: cam cháy hoài niệm, vàng hổ phách cổ, xanh rêu khói và nâu da thuộc.",
    colors: ["#C85A32", "#D9A05B", "#52796F", "#7F4F24", "#EDE0D4"],
    dominantColor: "#C85A32",
    accentColors: ["#D9A05B", "#52796F"],
    styleGroup: "Retro",
    tags: ["Retro/Vintage", "Cam cháy", "Hoài cổ"],
  },

  // ================= NHÓM "CYBERPUNK / NEON" (TƯƠNG PHẢN MẠNH) =================
  {
    id: "cyberpunk-tokyo-neon",
    name: "Đêm Neon Cyberpunk (Tokyo 2099)",
    description: "Độ tương phản thị giác cực đại giữa hồng magenta rực cháy, xanh neon phát quang, tím điện tử và lam laser.",
    colors: ["#FF007F", "#00F5D4", "#7209B7", "#4CC9F0", "#1A103C"],
    dominantColor: "#FF007F",
    accentColors: ["#00F5D4", "#4CC9F0"],
    styleGroup: "Cyberpunk",
    tags: ["Cyberpunk/Neon", "Xanh neon", "Hồng magenta", "Tím điện tử"],
  },
  {
    id: "synthwave-arcade-glow",
    name: "Sóng Điện Tử Synthwave (Arcade Glow)",
    description: "Ánh đèn neon thành phố tương lai: hồng magenta điện quang, tím điện tử, xanh cyan phát sáng và vàng tia chớp.",
    colors: ["#F72585", "#7209B7", "#00BBF9", "#FEE440", "#240046"],
    dominantColor: "#F72585",
    accentColors: ["#00BBF9", "#FEE440"],
    styleGroup: "Cyberpunk",
    tags: ["Cyberpunk/Neon", "Hồng magenta", "Tím điện tử", "Tương phản cao"],
  },
  {
    id: "neon-matrix-pulse",
    name: "Xung Nhịp Ma Trận Neon (Cyber Pulse)",
    description: "Sự bùng nổ của xanh neon lục bảo, hồng laser, tím siêu việt và lam quang học trên nền đêm số hóa.",
    colors: ["#00F59B", "#FF2A85", "#5E17EB", "#00D2FF", "#141829"],
    dominantColor: "#00F59B",
    accentColors: ["#FF2A85", "#00D2FF"],
    styleGroup: "Cyberpunk",
    tags: ["Cyberpunk/Neon", "Xanh neon", "Cá tính"],
  },

  // ================= NHÓM "CINEMATIC / MOODY" (ĐIỆN ẢNH TRẦM SÂU) =================
  {
    id: "cinematic-noir-bordeaux",
    name: "Điện Ảnh Trầm Sâu (Bordeaux & Ice)",
    description: "Tông màu phim điện ảnh nghệ thuật với đỏ bordeaux quyến rũ, xanh băng lạnh giá, xám than sâu thẳm và vàng đồng.",
    colors: ["#800F2F", "#457B9D", "#2B2D42", "#A8DADC", "#D4A373"],
    dominantColor: "#800F2F",
    accentColors: ["#A8DADC", "#D4A373"],
    styleGroup: "Cinematic",
    tags: ["Cinematic/Moody", "Xanh băng", "Xám than", "Đỏ bordeaux"],
  },
  {
    id: "moody-nordic-fjord",
    name: "Hồi Ức Điện Ảnh Bắc Âu (Nordic Moody)",
    description: "Không khí trầm mặc đầy chiều sâu: xám than đá phiến, xanh băng sương mù, đỏ rượu bordeaux và ánh sáng khói mờ.",
    colors: ["#1D3557", "#6A040F", "#4A5759", "#8ECAE6", "#E0DCD3"],
    dominantColor: "#1D3557",
    accentColors: ["#6A040F", "#8ECAE6"],
    styleGroup: "Cinematic",
    tags: ["Cinematic/Moody", "Xanh băng", "Xám than", "Trầm sâu"],
  },
  {
    id: "crimson-shadow-cinema",
    name: "Bóng Đêm & Nhung Đỏ (Crimson Cinema)",
    description: "Sự đối lập kịch tính giữa đỏ bordeaux nhung thẫm, xanh lam khói lạnh, xám than chì và ánh đèn hổ phách.",
    colors: ["#641220", "#335C67", "#22223B", "#9E2A2B", "#E09F3E"],
    dominantColor: "#641220",
    accentColors: ["#335C67", "#E09F3E"],
    styleGroup: "Cinematic",
    tags: ["Cinematic/Moody", "Đỏ bordeaux", "Xám than"],
  },
  {
    id: "magic-twilight-glow",
    name: "Đêm Huyền Bí Phát Sáng (Magic Twilight Glow)",
    description: "Tông Tím - Xanh Chàm - Hồng Phát Sáng chuẩn phong cách tô màu Marker chuyên nghiệp với hiệu ứng quầng sáng bong bóng và ánh sao đêm.",
    colors: ["#6E82E8", "#9A8CFF", "#FF85D8", "#2B3A8A", "#FFF6E5"],
    dominantColor: "#6E82E8",
    accentColors: ["#FF85D8", "#FFF6E5"],
    styleGroup: "Cinematic",
    tags: ["Cinematic/Moody", "Đêm Huyền Bí", "Magic Glow", "Tím - Xanh - Hồng"],
  },
  {
    id: "sunset-bubble-glow",
    name: "Hoàng Hôn Bọt Nắng (Sunset Bubble Glow)",
    description: "Ánh nắng chiều tà vàng cam rực rỡ kết hợp bóng đổ chiều sâu và hiệu ứng bọt xà phòng cầu vồng lấp lánh.",
    colors: ["#F4A261", "#FF85A1", "#52B788", "#E9C46A", "#FFFDF2"],
    dominantColor: "#F4A261",
    accentColors: ["#FF85A1", "#FFFDF2"],
    styleGroup: "Retro",
    tags: ["Retro/Vintage", "Hoàng hôn", "Bọt nắng phát sáng"],
  },

  // ================= NHÓM "BOHO / EARTHY" (TỰ NHIÊN & MỘC MẠC) =================
  {
    id: "boho-terracotta-sage",
    name: "Du Mục Thảo Nguyên (Boho Terracotta)",
    description: "Vẻ đẹp mộc mạc phóng khoáng từ nâu đất nung ấm áp, xanh ô liu, lá xô thơm sage green và be cát tự nhiên.",
    colors: ["#CB6D51", "#606C38", "#84A98C", "#DDA15E", "#FEFAE0"],
    dominantColor: "#CB6D51",
    accentColors: ["#84A98C", "#DDA15E"],
    styleGroup: "Boho",
    tags: ["Boho/Earthy", "Nâu đất nung", "Xanh ô liu", "Be cát", "Sage green"],
  },
  {
    id: "earthy-olive-canyon",
    name: "Hẻm Núi & Lá Ô Liu (Earthy Canyon)",
    description: "Sắc màu thiên nhiên nguyên bản: nâu đất nung nắng cháy, xanh ô liu đậm, xanh sage dịu và cát sa mạc.",
    colors: ["#BC6C25", "#588157", "#A3B18A", "#D4A373", "#FAEDCD"],
    dominantColor: "#BC6C25",
    accentColors: ["#588157", "#A3B18A"],
    styleGroup: "Boho",
    tags: ["Boho/Earthy", "Nâu đất nung", "Xanh ô liu", "Sage green"],
  },
  {
    id: "nomad-clay-botanical",
    name: "Gốm Mộc & Thảo Mộc (Clay & Herb)",
    description: "Sự giao hòa thư thái giữa gốm nâu đất nung, xanh lá ô liu, thảo mộc sage green và vải lanh be cát.",
    colors: ["#B5654D", "#4F6F52", "#739072", "#C8AE7D", "#F5EFE6"],
    dominantColor: "#B5654D",
    accentColors: ["#739072", "#C8AE7D"],
    styleGroup: "Boho",
    tags: ["Boho/Earthy", "Be cát", "Mộc mạc"],
  },

  // ================= NHÓM "LUXURY / ROYAL" (HOÀNG GIA SANG TRỌNG) =================
  {
    id: "luxury-royal-imperial",
    name: "Hoàng Gia Lộng Lẫy (Royal Gold & Ruby)",
    description: "Vẻ đẹp vương giả quyền quý với vàng kim rực rỡ, đỏ ruby kiêu sa, xanh ngọc bích và tím thẫm hoàng gia.",
    colors: ["#D4AF37", "#9B111E", "#007F5F", "#3C096C", "#F8F3E6"],
    dominantColor: "#D4AF37",
    accentColors: ["#9B111E", "#007F5F"],
    styleGroup: "Luxury",
    tags: ["Luxury/Royal", "Vàng kim", "Ngọc bích", "Đỏ ruby", "Tím thẫm"],
  },
  {
    id: "emerald-palace-velvet",
    name: "Cung Điện Ngọc Bích (Emerald & Velvet)",
    description: "Sự kết hợp xa hoa giữa ngọc bích hoàng cung, vàng kim 24K, đỏ hồng ngọc ruby và tím nhung thẫm.",
    colors: ["#006D5B", "#E5B842", "#800F2F", "#240046", "#F4EFE6"],
    dominantColor: "#006D5B",
    accentColors: ["#E5B842", "#800F2F"],
    styleGroup: "Luxury",
    tags: ["Luxury/Royal", "Ngọc bích", "Vàng kim", "Tím thẫm"],
  },
  {
    id: "amethyst-crown-jewel",
    name: "Vương Miện Thạch Anh Tím (Crown Jewel)",
    description: "Sắc tím thẫm đế vương quyện cùng vàng kim lấp lánh, đỏ ruby quyền lực và ngọc bích biển sâu.",
    colors: ["#3C096C", "#D4AF37", "#A4161A", "#0F4C5C", "#F9F4E8"],
    dominantColor: "#3C096C",
    accentColors: ["#D4AF37", "#A4161A"],
    styleGroup: "Luxury",
    tags: ["Luxury/Royal", "Tím thẫm", "Đỏ ruby", "Vàng kim"],
  },
];

// Mẫu tranh nét vẽ (Sample Line Arts)
export const SAMPLE_LINE_ARTS = {
  coinLaundry: "/freebies/coin-laundry.png",
  winterDinner: "/freebies/winter-dinner.png",
  schoolLockerPuppy: "/freebies/school-locker-puppy.png",
  cozyCoffeeCorner: "/freebies/cozy-coffee-corner.png",
  winterPostOffice: "/freebies/winter-post-office.png",
  nightCamperVan: "/freebies/night-camper-van.png",
  winterRoomCleaning: "/freebies/winter-room-cleaning.png",
  bunnyCoffeeShop: "/freebies/bunny-coffee-shop.png",
  cozyTeaKitten: "/freebies/coin-laundry.png",
  sakuraFlower: "/freebies/winter-dinner.png",
  magicMushroom: "/freebies/school-locker-puppy.png",
};

// 2. Góc Tìm Cảm Hứng (Inspiration Concepts & Categories)
export { INSPIRATION_CATEGORIES } from "./inspiration-data";
export const INSPIRATION_CONCEPTS: InspirationConceptItem[] = COMPREHENSIVE_INSPIRATION_CONCEPTS;

// 3. Tâm Trạng Màu Sắc Mỗi Ngày (Daily Color Mood)
export const DAILY_COLOR_MOODS = [
  {
    day: "Thứ Hai",
    name: "Cơn Mưa Oải Hương",
    quote: "Khởi đầu tuần mới với sự tĩnh lặng dịu êm và nguồn cảm hứng nhẹ nhàng.",
    mood: "Peaceful" as const,
    palette: "Purple" as const,
    style: "Pastel" as const,
    lighting: "Soft light" as const,
    namedPalette: "Lavender Dream",
    colors: ["#E8D7F1", "#DFCCF1", "#C7B9FF", "#FFFDF9"],
  },
  {
    day: "Thứ Ba",
    name: "Sữa Dâu Ngọt Ngào",
    quote: "Một nụ cười ngọt ngào lan tỏa năng lượng vui tươi và yêu đời.",
    mood: "Cute" as const,
    palette: "Pink" as const,
    style: "Kawaii" as const,
    lighting: "Daylight" as const,
    namedPalette: "Strawberry Milk",
    colors: ["#FDE2E4", "#FFD1DC", "#FFE5D9", "#FFCAD4"],
  },
  {
    day: "Thứ Tư",
    name: "Sương Trà Matcha",
    quote: "Tìm lại sự cân bằng giữa tuần cùng sự tươi mát thuần khiết của thiên nhiên.",
    mood: "Peaceful" as const,
    palette: "Green" as const,
    style: "Watercolor" as const,
    lighting: "Daylight" as const,
    namedPalette: "Sakura Garden",
    colors: ["#D8F3DC", "#B7E4C7", "#95D5B2", "#FAF7F2"],
  },
  {
    day: "Thứ Năm",
    name: "Hoàng Hôn Nắng Ấm",
    quote: "Ánh sáng hổ phách vỗ về tâm hồn sau một ngày bận rộn.",
    mood: "Cozy" as const,
    palette: "Warm" as const,
    style: "Cozy" as const,
    lighting: "Sunset" as const,
    namedPalette: "Cozy Autumn",
    colors: ["#FFE5D9", "#FFCAD4", "#E29578", "#FFF1C5"],
  },
  {
    day: "Thứ Sáu",
    name: "Biển Xanh Lấp Lánh",
    quote: "Chân trời bao la và sự háo hức đón chào những ngày cuối tuần tự do.",
    mood: "Vibrant" as const,
    palette: "Blue" as const,
    style: "Anime" as const,
    lighting: "Daylight" as const,
    namedPalette: "Ocean Breeze",
    colors: ["#A2D2FF", "#BDE0FE", "#CCE3DE", "#EDF6F9"],
  },
  {
    day: "Thứ Bảy",
    name: "Tiệm Bánh Mật Ong",
    quote: "Hương quế nướng thơm lừng, bơ mật ngọt ngào và buổi sáng thong dong.",
    mood: "Cozy" as const,
    palette: "Warm" as const,
    style: "Cute" as const,
    lighting: "Warm indoor" as const,
    namedPalette: "Peach Sorbet",
    colors: ["#FFF1C5", "#FFE5D9", "#DDBEA9", "#FFFDF9"],
  },
  {
    day: "Chủ Nhật",
    name: "Mộng Tưởng Ánh Sao",
    quote: "Thả trôi suy nghĩ vào giấc mơ êm đềm dưới ánh trăng huyền ảo.",
    mood: "Dreamy" as const,
    palette: "Purple" as const,
    style: "Fantasy" as const,
    lighting: "Moonlight" as const,
    namedPalette: "Midnight Magic",
    colors: ["#DFCCF1", "#8D99AE", "#C7B9FF", "#2B2D42"],
  },
];

export function getTodaysColorMood() {
  const days = [
    "Chủ Nhật",
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
  ];
  const today = days[new Date().getDay()];
  return (
    DAILY_COLOR_MOODS.find((m) => m.day === today) || DAILY_COLOR_MOODS[0]
  );
}

// 4. Thử Thách Tô Màu (Coloring Challenges)
export const COLORING_CHALLENGES: ChallengeItem[] = [
  {
    id: "weekly-pastel-challenge",
    title: "Thử Thách Sắc Màu Pastel Tuần",
    description: "Tô màu bức tranh yêu thích của bạn chỉ bằng các tông pastel dịu nhẹ. Không dùng màu đen đặc hoặc màu quá gắt trong các mảng tô!",
    topic: "Hài Hòa Pastel",
    startDate: "05/10/2026",
    endDate: "18/10/2026",
    suggestedPalette: ["#FDE2E4", "#DFCCF1", "#D8F3DC", "#FFF1C5", "#FFE5D9"],
    suggestedStyle: "Pastel",
    participantCount: 428,
    badgeName: "Bậc Thầy Pastel",
  },
  {
    id: "five-color-challenge",
    title: "Thử Thách Giới Hạn 5 Màu Sắc",
    description: "Chỉ chọn đúng 5 màu sắc duy nhất và hoàn thiện toàn bộ tranh minh họa bằng cách điều chỉnh sắc thái và ánh sáng của 5 màu đó.",
    topic: "Tối Giản & Sáng Tạo",
    startDate: "10/10/2026",
    endDate: "24/10/2026",
    suggestedPalette: ["#FFD1DC", "#A2D2FF", "#D8F3DC", "#FFF1C5", "#C7B9FF"],
    suggestedStyle: "Cute",
    participantCount: 312,
    badgeName: "Phù Thủy Bảng Màu",
  },
  {
    id: "cozy-autumn-nook",
    title: "Góc Nhỏ Mùa Thu Ấm Cúng",
    description: "Đưa không gian ấm cúng hygge vào tranh vẽ! Sử dụng ánh sáng hổ phách ấm, sắc mật ong và bề mặt gỗ mộc mạc dịu mắt.",
    topic: "Ấm Cúng & Thư Giãn",
    startDate: "01/10/2026",
    endDate: "31/10/2026",
    suggestedPalette: ["#E29578", "#FFDDD2", "#83C5BE", "#DDBEA9", "#FFF1C5"],
    suggestedStyle: "Cozy",
    participantCount: 569,
    badgeName: "Tâm Hồn Ấm Áp",
  },
];

// 5. Tranh Miễn Phí & Quà Tặng (Freebies)
export const FREEBIES: FreebieItem[] = [
  {
    id: "freebie-coin-laundry",
    title: "Tranh Nét Tiệm Giặt Ủi Ấm Áp",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.coinLaundry,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.coinLaundry,
    license: "Miễn phí cho mục đích cá nhân và thư giãn phi thương mại.",
  },
  {
    id: "freebie-winter-dinner",
    title: "Tranh Nét Bữa Tiệc Tối Mùa Đông",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.winterDinner,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.winterDinner,
    license: "Miễn phí sử dụng cá nhân.",
  },
  {
    id: "freebie-school-locker",
    title: "Tranh Nét Cún Con & Tủ Đồ Trường Học",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.schoolLockerPuppy,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.schoolLockerPuppy,
    license: "Miễn phí sử dụng cá nhân.",
  },
  {
    id: "freebie-coffee-corner",
    title: "Tranh Nét Góc Quán Cà Phê Bình Yên",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.cozyCoffeeCorner,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.cozyCoffeeCorner,
    license: "Miễn phí sử dụng cá nhân.",
  },
  {
    id: "freebie-winter-post-office",
    title: "Tranh Nét Bưu Điện Mùa Đông",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.winterPostOffice,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.winterPostOffice,
    license: "Miễn phí sử dụng cá nhân.",
  },
  {
    id: "freebie-night-camper-van",
    title: "Tranh Nét Xe Cắm Trại Đêm Trăng",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.nightCamperVan,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.nightCamperVan,
    license: "Miễn phí sử dụng cá nhân.",
  },
  {
    id: "freebie-winter-room-cleaning",
    title: "Tranh Nét Dọn Phòng Đón Đông",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.winterRoomCleaning,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.winterRoomCleaning,
    license: "Miễn phí sử dụng cá nhân.",
  },
  {
    id: "freebie-bunny-coffee-shop",
    title: "Tranh Nét Quán Cà Phê Thỏ Nhỏ",
    category: "line-art",
    thumbnailUrl: SAMPLE_LINE_ARTS.bunnyCoffeeShop,
    format: "PNG",
    dimensions: "1024x1024",
    lineArtData: SAMPLE_LINE_ARTS.bunnyCoffeeShop,
    license: "Miễn phí sử dụng cá nhân.",
  },
];

// 6. Học Phối Màu & Hướng Dẫn Từng Bước Trực Quan (Visual Step-by-Step Coloring Tutorials)
export const LEARN_ARTICLES: ArticleItem[] = [
  {
    id: "4-ways-to-color-fur",
    title: "4 WAYS TO COLOR FUR: 4 Tuyệt Chiêu Tô Lông Thú Cưng Mềm Mịn",
    slug: "4-ways-to-color-fur",
    category: "Visual Tutorial",
    readTime: "4 kiểu lông trực quan",
    coverColor: "#FFE4EC",
    cover_image: "/tutorials/how-to-color-fur-cover.jpg",
    palette_used: [
      "#F6D4A8",
      "#D99B66",
      "#C47435",
      "#F58220",
      "#D8CEEB",
      "#E63956",
    ],
    steps: [
      {
        step_number: 1,
        level_badge: "STEP 1 • FLUFFY PUPPY FUR",
        title: "Step 1 (Fluffy Puppy Fur): Chú Chó Poodle Đội Mũ Beret Xanh",
        image_url: "/tutorials/how-to-color-fur-step-1.jpg",
        marker_codes: [
          "YR05 Light Base",
          "E44 Soft Shading",
          "0 Colorless Blender",
          "White Gel Pen",
        ],
        description:
          "1) Tô lớp nền sáng đều bằng mã màu YR05. 2) Đổ bóng mềm mại bằng E44 để định hình khối tai và thân. 3) Dùng đầu bút 0 Colorless Blender chấm các hạt nhỏ li ti trên tai và mặt tạo hiệu ứng lông bông xù. 4) Tinh chỉnh viền bằng E44 và thêm các nét chấm sáng bằng bút Gel trắng.",
      },
      {
        step_number: 2,
        level_badge: "STEP 2 • TEDDY BEAR TEXTURE",
        title: "Step 2 (Teddy Bear Texture): Chú Gấu Teddy Nháy Mắt Đáng Yêu",
        image_url: "/tutorials/how-to-color-fur-step-2.jpg",
        marker_codes: [
          "E44 Base Color",
          "Y515 Mid-Tone & Deep Dots",
          "Y314 Blend & Refine",
          "BV350 Rosy Blush",
        ],
        description:
          "1) Phủ lớp màu nền ấm bằng E44. 2) Chấm đều tay mã Y515 khắp thân để tạo bề mặt lông gấu bông (plush texture). 3) Tiếp tục chấm chồng thêm lớp Y515 đậm hơn ở rìa mặt, tai và bụng để tạo chiều sâu khối. 4) Hòa trộn mượt lại bằng Y314 và tô đôi má ửng hồng bằng BV350.",
      },
      {
        step_number: 3,
        level_badge: "STEP 3 • FOX / SQUIRREL FUR",
        title: "Step 3 (Fox/Squirrel Fur): Chú Cáo Cam Ôm Bánh Quy",
        image_url: "/tutorials/how-to-color-fur-step-3.jpg",
        marker_codes: [
          "YR05 & E44 Light Base",
          "Y49 & YR170 Warm Mid Tones",
          "Darker Shadow Strokes",
          "Light Fur Highlight Strokes",
        ],
        description:
          "1) Bắt đầu với lớp nền sáng mềm mại kết hợp YR05 và E44. 2) Phẩy các lớp lông tông cam ấm trung gian bằng Y49 và YR170 để tăng chiều sâu. 3) Đi thêm các nét cọ phẩy sợi đậm hơn ở vùng bóng đổ để tách lớp lông. 4) Phẩy các sợi sáng màu đè lên trên để hoàn thiện bộ lông cáo tơi xốp!",
      },
      {
        step_number: 4,
        level_badge: "STEP 4 • SOFT CREAM BUNNY",
        title: "Step 4 (Soft Cream Bunny): Chú Thỏ Kem Đeo Nơ Đỏ Cầm Hoa",
        image_url: "/tutorials/how-to-color-fur-step-4.jpg",
        marker_codes: [
          "YR05 + 0 Blender Base",
          "V22 • CG01 • E44 Gentle Shadows",
          "YR05 Tidy Finish",
          "White Gel Pen & Acrylic Accents",
        ],
        description:
          "1) Tô lớp nền kem thật nhẹ bằng YR05 kết hợp bút Blender. 2) Tạo bóng đổ dịu dàng cho lớp lông trắng kem bằng bộ 3 mã màu V22 (tím nhạt), CG01 (xám lạnh) và E44. 3) Tinh chỉnh lại vùng chuyển sắc bằng YR05 cho mượt mà. 4) Viền bắt sáng bằng bút Gel trắng và điểm xuyết viền bút Acrylic màu!",
      },
    ],
    summary:
      "Trọn bộ 4 kỹ thuật tô chất liệu lông thú vẽ tay sắc nét: Chó Poodle đội mũ beret xanh, Gấu Teddy nháy mắt, Cáo cam ôm bánh quy và Thỏ kem đeo nơ đỏ cầm hoa.",
    content: `
### Bí Quyết Thực Hành 4 Kiểu Lông Thú Cưng Chuẩn Sách Tô Màu

1. **Kỹ thuật chấm bút 0 Blender (Fluffy Puppy Fur):** Sau khi tô nền \`YR05\` và đổ bóng \`E44\`, việc dùng đầu bút cồn không màu (**0 Colorless Blender**) chấm nhẹ lên vùng tai và má sẽ đẩy mực ra tạo thành các đốm bông sáng tự nhiên.
2. **Kỹ thuật chấm hạt đa tầng (Teddy Bear Texture):** Đừng chấm cùng một lực tay trên toàn bộ chú gấu — hãy chấm thưa ở giữa mặt/bụng và chấm dày đặc hơn bằng \`Y515\` + \`Y314\` ở sát đường viền để tạo độ phồng 3D.
3. **Kỹ thuật phẩy sợi theo hướng lông mọc (Fox/Squirrel Fur):** Luôn phẩy nét cọ từ tâm mặt tỏa ra hai bên má và dọc theo chiều cong của chiếc đuôi bông.
4. **Kỹ thuật pha bóng đa sắc cho lông sáng màu (Soft Cream Bunny):** Sự kết hợp giữa tím nhạt \`V22\`, xám \`CG01\` và nâu kem \`E44\` giúp bộ lông thỏ trắng kem có chiều sâu trong trẻo mà không bị xỉn màu.
    `.trim(),
  },
  {
    id: "how-to-color-stars",
    title: "How to Color Stars: 4 Cấp Độ Tô Ngôi Sao Lấp Lánh (Basic → Wow!)",
    slug: "how-to-color-stars",
    category: "Visual Tutorial",
    readTime: "4 cấp độ trực quan",
    coverColor: "#E0C3FC",
    cover_image: "/tutorials/how-to-color-stars-cover.jpg",
    palette_used: [
      "#FFE373",
      "#FF99C8",
      "#B892FF",
      "#80E8FF",
      "#A8E6CF",
      "#FFFDF7",
    ],
    steps: [
      {
        step_number: 1,
        level_badge: "BASIC • LEVEL 1",
        title: "Step 1: Tô nền vàng cơ bản & vẽ viền bắt sáng trắng",
        image_url: "/tutorials/how-to-color-stars-step-1.png",
        marker_codes: ["Y102 Yellow", "101 White Acrylic Pen"],
        description:
          "Tô phủ đều lớp nền cơ bản của ngôi sao bằng bút màu vàng tươi (Y102) và đợi mực khô. Sau đó dùng bút Gel/Acrylic trắng (101) vẽ đường viền bắt sáng dọc cạnh trên và chấm các hạt sao 4 cánh lấp lánh.",
      },
      {
        step_number: 2,
        level_badge: "BETTER • LEVEL 2",
        title: "Step 2: Chuyển sắc Gradient 2 tông Hồng - Xanh & Đổ bóng sâu",
        image_url: "/tutorials/how-to-color-stars-step-2.png",
        marker_codes: ["RV04 Pink", "B05 Blue", "RV19 & BV08 Shadow", "101 White"],
        description:
          "Tô nền kết hợp màu Hồng (RV04) và Xanh lam (B05), tán mịn vùng chuyển giao ở giữa. Tiếp tục nhấn bóng đổ đậm hơn ở rìa dưới bằng RV19 & BV08, cuối cùng dùng bút trắng (101) vẽ viền phản quang và tia sáng.",
      },
      {
        step_number: 3,
        level_badge: "PRETTY • LEVEL 3",
        title: "Step 3: Hòa trộn 4 sắc Pastel & Tạo quầng sáng bằng chì trắng",
        image_url: "/tutorials/how-to-color-stars-step-3.png",
        marker_codes: [
          "0 Blender",
          "RV04 • Y00 • YG66 • B02",
          "YG57 & RV08 Outline",
          "White Pencil",
        ],
        description:
          "Phủ lớp lót bằng bút cồn không màu (Colorless Blender) để làm ẩm giấy, sau đó tô 4 màu Pastel (RV04, Y00, YG66, B02) hòa quyện vào nhau. Dùng bút Acrylic xanh & hồng đè lên nét viền đen, thêm highlight trắng và dùng chì trắng tán quầng sáng mờ.",
      },
      {
        step_number: 4,
        level_badge: "WOW • LEVEL 4",
        title: "Step 4: Dải cầu vồng uốn lượn & Hào quang phát sáng phép thuật",
        image_url: "/tutorials/how-to-color-stars-step-4.png",
        marker_codes: [
          "BG05 Aqua",
          "RV25 Pink",
          "Y09 Yellow",
          "101 White Pen",
          "White Pencil Glow",
        ],
        description:
          "Tô nền theo các dải cong uốn lượn từ nhỏ đến lớn (BG05 → RV25 → Y09) và blend mượt ranh giới. Dùng bút Acrylic trắng (101) viền toàn bộ ngôi sao, thêm vệt bóng sáng cong bằng chì trắng và tán quầng hào quang lấp lánh bao quanh!",
      },
    ],
    summary:
      "Cẩm nang trực quan từng bước giúp bạn nâng cấp kỹ năng tô ngôi sao từ cấp độ Cơ bản (Level 1) đến hiệu ứng Cầu vồng Phát sáng Phép thuật (Level 4 Wow!) chuẩn sách hướng dẫn chuyên nghiệp.",
    content: `
### Bí Quyết Để Ngôi Sao Phát Sáng Rực Rỡ Trên Trang Giấy

Để biến một hình ngôi sao nét đen đơn giản thành tâm điểm phát sáng lung linh trong bức tranh, bạn hãy kết hợp **3 kỹ thuật cốt lõi**:

1. **Kỹ thuật Blend Chuyển Sắc (Smooth Gradient Blending):** Khi mực bút cồn còn ẩm, hãy dùng đầu cọ lướt nhẹ qua lại tại ranh giới giữa hai màu (ví dụ Hồng \`RV04\` và Xanh \`B05\`) hoặc lót trước bằng cây **Colorless Blender (số 0)** để các dải màu tan vào nhau không để lại vệt gắt.
2. **Đè Viền Màu Sáng Lên Nét Đen (Colored & White Acrylic Outlining):** Ở cấp độ *Level 3 (Pretty)* và *Level 4 (Wow)*, việc dùng bút Acrylic màu trắng (\`101\`) hoặc hồng/xanh pastel tô đè lên đường viền mực đen gốc giúp ngôi sao trông như tự phát ra ánh sáng thật sự.
3. **Tán Quầng Sáng Mờ Bằng Chì Trắng (Soft Pencil Glow Aura):** Dùng bút chì màu trắng tô nhẹ một vòng hào quang bên ngoài viền ngôi sao rồi xoa nhẹ để tạo hiệu ứng sương mờ lung linh.
    `.trim(),
  },
  {
    id: "color-theory-basics",
    title: "Hiểu Về Phối Màu Hài Hòa: Màu Tương Đồng & Màu Bổ Túc",
    slug: "hieu-ve-phoi-mau-hai-hoa",
    category: "Fundamentals",
    readTime: "4 phút đọc",
    coverColor: "#DFCCF1",
    palette_used: ["#FF99C8", "#FCF6BD", "#D0F4DE", "#A9DEF9", "#E4C1F9"],
    summary: "Khám phá vì sao một số màu sắc hòa quyện tuyệt vời với nhau, và cách tạo nên sự cân bằng thị giác êm dịu cho trang sách tô màu.",
    content: `
# Hiểu Về Phối Màu Hài Hòa

Khi mở một trang vẽ tranh nét mới, việc chọn lựa màu sắc phù hợp có thể khiến bạn băn khoăn. Nghệ thuật phối màu chính là việc kết hợp các sắc độ theo quy luật để tạo cảm giác dễ chịu tự nhiên cho đôi mắt.

### 1. Màu Tương Đồng (Sự Lựa Chọn Êm Dịu)
Màu tương đồng là những màu đứng cạnh nhau trên vòng tròn màu sắc — ví dụ:
- Hồng phấn, cam đào và vàng bơ ngọt ngào
- Xanh bạc hà, xanh da trời và tím oải hương

Vì chúng có cùng bước sóng thị giác gần nhau, các bảng màu tương đồng luôn mang lại cảm giác bình yên, nhẹ nhàng và gắn kết. Rất thích hợp cho tranh nội thất ấm cúng, thú cưng đáng yêu và hoa lá thiên nhiên.

### 2. Màu Bổ Túc (Điểm Nhấn Nghệ Thuật)
Màu bổ túc là những màu đối diện nhau trực tiếp trên vòng tròn màu:
- Màu cam đào ấm đi cùng màu xanh phấn dịu
- Tím lavender nhạt kết hợp với vàng pastel êm đềm

Khi đặt cạnh nhau, màu bổ túc tôn vinh lẫn nhau mà không gây chói mắt. Hãy áp dụng công thức: 80% màu chủ đạo làm nền và 20% màu bổ túc làm điểm nhấn viền hoặc phụ kiện!
    `.trim(),
  },
  {
    id: "pastel-shading-guide",
    title: "Bí Quyết Đổ Bóng Pastel Mềm Mại Như Nhung",
    slug: "bi-quyet-do-bong-pastel",
    category: "Techniques",
    readTime: "5 phút đọc",
    coverColor: "#FDE2E4",
    palette_used: ["#FFB5A7", "#FCD5CE", "#F8EDEB", "#B5838D", "#6D6875"],
    summary: "Làm chủ kỹ thuật chuyển sắc gradient dịu dàng, tránh màu xám đục và giữ nguyên độ sắc nét của từng đường viền.",
    content: `
# Bí Quyết Đổ Bóng Pastel Mềm Mại

Tranh màu pastel không có nghĩa là nhạt nhòa hay thiếu chiều sâu. Bí quyết để có một bức tranh pastel sang trọng và có hồn nằm ở kỹ thuật đổ bóng màu sắc (chromatic shading).

### Đừng Bao Giờ Dùng Màu Đen Thuần Hoặc Xám Đục Để Đổ Bóng
Khi đổ bóng cho mảng màu hồng hoặc kem, việc thêm màu đen hoặc xám sẽ làm bức tranh trông bụi bặm và mất đi sức sống. Thay vào đó:
- Đổ bóng màu hồng phấn bằng sắc mận quả mọng hoặc tím hoa cà nhẹ.
- Đổ bóng màu kem hoặc vàng bơ bằng sắc cam mơ hay mật ong ấm.
- Đổ bóng xanh bạc hà bằng màu ngọc bích sâu hoặc xanh xô thơm dịu mát.

Kỹ thuật này giúp mọi bức tranh trở nên rực rỡ, lung linh và mang đẳng cấp tranh minh họa chuyên nghiệp!
    `.trim(),
  },
  {
    id: "lighting-and-mood",
    title: "Ánh Sáng Đêm Huyền Bí & Hiệu Ứng Bong Bóng Phát Sáng (Magic Glow)",
    slug: "anh-sang-bien-doi-cam-xuc",
    category: "Inspiration",
    readTime: "4 phút đọc",
    coverColor: "#FFE5D9",
    palette_used: ["#6E82E8", "#9A8CFF", "#FF85D8", "#2B3A8A", "#FFF6E5"],
    summary: "Từ sắc vàng hổ phách của Giờ Vàng đến ánh sáng hồng tím huyền ảo của Đêm Trăng: cách ánh sáng biến bức tranh thành tác phẩm nghệ thuật.",
    content: `
# Ánh Sáng Biến Đổi Cảm Xúc Bức Tranh

Cùng một bức tranh nét vẽ duy nhất, bạn có thể tạo nên những cung bậc cảm xúc hoàn toàn khác biệt chỉ bằng việc thay đổi nguồn chiếu sáng:

- **Đêm Huyền Bí & Phát Sáng (Magic Twilight & Glow):** Phủ lên toàn bộ không gian sắc tím chàm sâu thẳm, đối lập với quầng sáng màu hồng magenta và vàng kem tỏa ra từ các quả bong bóng xà phòng, đèn lồng hay ánh sao đêm.
- **Giờ Vàng (Golden Hour):** Đem lại sự ấm áp hoài niệm, phủ lên nhân vật ánh sáng mật ong dịu ngọt và những bóng đổ màu tím mộng mơ.
- **Ánh Sáng Dịu (Soft Light):** Loại bỏ các bóng tối gắt gao, cực kỳ lý tưởng cho các bức tranh phong cách kawaii dễ thương và động vật bé nhỏ.
    `.trim(),
  },
];

// 7. Trắc Nghiệm Phong Cách Màu (Quiz)
export const COLOR_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "Nơi chốn thư giãn lý tưởng trong mơ của bạn là đâu?",
    options: [
      {
        text: "Góc cửa sổ ngập nắng với ly trà ấm và chú mèo ngoan",
        description: "Ấm cúng, an yên và tràn đầy chở che",
        icon: "☕",
        result: {
          style: "Cozy",
          palette: "Warm",
          mood: "Cozy",
          lighting: "Warm indoor",
          paletteName: "Mùa Thu Ấm Áp",
        },
      },
      {
        text: "Vườn hoa anh đào Nhật Bản nở rộ trong gió xuân",
        description: "Những cánh hoa hồng phấn bay lãng mạn",
        icon: "🌸",
        result: {
          style: "Pastel",
          palette: "Pink",
          mood: "Dreamy",
          lighting: "Soft light",
          paletteName: "Vườn Hoa Anh Đào",
        },
      },
      {
        text: "Rừng nấm phát quang thần tiên với bầy đom đóm lấp lánh",
        description: "Huyền bí, lấp lánh và đầy điều kỳ diệu",
        icon: "✨",
        result: {
          style: "Fantasy",
          palette: "Purple",
          mood: "Magical",
          lighting: "Moonlight",
          paletteName: "Phép Thuật Nửa Đêm",
        },
      },
      {
        text: "Căn nhà gỗ ven biển đón gió sớm ban mai trong trẻo",
        description: "Sóng ngọc bích êm đềm và vỏ ốc lấp lánh",
        icon: "🌊",
        result: {
          style: "Anime",
          palette: "Blue",
          mood: "Peaceful",
          lighting: "Daylight",
          paletteName: "Gió Biển Ban Mai",
        },
      },
    ],
  },
  {
    id: 2,
    question: "Hôm nay bạn thích cảm giác nhiệt độ màu sắc như thế nào?",
    options: [
      {
        text: "Màu bơ ấm áp, mật ong ngọt và hương quế dịu",
        description: "Gần gũi, ấm áp và thoải mái",
        icon: "🍯",
        result: {
          style: "Cute",
          palette: "Warm",
          mood: "Cute",
          lighting: "Golden hour",
          paletteName: "Mùa Thu Ấm Áp",
        },
      },
      {
        text: "Sữa dâu hồng ngọt ngào, kem đào mát lạnh đáng yêu",
        description: "Tươi vui, ngọt ngào và rạng rỡ",
        icon: "🍓",
        result: {
          style: "Kawaii",
          palette: "Pink",
          mood: "Cute",
          lighting: "Daylight",
          paletteName: "Sữa Dâu Ngọt Ngào",
        },
      },
      {
        text: "Tím oải hương mờ ảo, hoa tử đinh hương và sương bạc",
        description: "Tĩnh lặng, lắng đọng và mộng mơ",
        icon: "🪻",
        result: {
          style: "Pastel",
          palette: "Purple",
          mood: "Peaceful",
          lighting: "Soft light",
          paletteName: "Giấc Mơ Oải Hương",
        },
      },
      {
        text: "Trà xanh bạc hà tươi mát, lá cỏ xanh ươm tinh khôi",
        description: "Sảng khoái, trong lành và thư thái",
        icon: "🌿",
        result: {
          style: "Watercolor",
          palette: "Green",
          mood: "Peaceful",
          lighting: "Daylight",
          paletteName: "Trà Chanh Bạc Hà",
        },
      },
    ],
  },
  {
    id: 3,
    question: "Bạn muốn tác phẩm hoàn thành của mình mang lại cảm xúc gì?",
    options: [
      {
        text: "Niềm vui thuần khiết, ngọt ngào và nụ cười rạng rỡ",
        description: "Phong cách tranh truyện dễ thương, đáng yêu",
        icon: "🥰",
        result: {
          style: "Kawaii",
          palette: "Pink",
          mood: "Cute",
          lighting: "Daylight",
          paletteName: "Sữa Dâu Ngọt Ngào",
        },
      },
      {
        text: "Sự thư giãn sâu lắng, tĩnh tâm và chữa lành",
        description: "Một khoảng lặng dịu dàng rời xa màn hình số",
        icon: "🧘‍♀️",
        result: {
          style: "Pastel",
          palette: "Purple",
          mood: "Peaceful",
          lighting: "Soft light",
          paletteName: "Giấc Mơ Oải Hương",
        },
      },
      {
        text: "Thế giới cổ tích diệu kỳ và ánh sáng nhiệm màu",
        description: "Như lạc bước vào một giấc chiêm bao thần tiên",
        icon: "🔮",
        result: {
          style: "Fantasy",
          palette: "Purple",
          mood: "Magical",
          lighting: "Moonlight",
          paletteName: "Phép Thuật Nửa Đêm",
        },
      },
      {
        text: "Cảm giác ấm cúng hygge như đang cuộn mình trong chăn ấm",
        description: "Tách trà nóng và cơn mưa tí tách ngoài hiên",
        icon: "🕯️",
        result: {
          style: "Cozy",
          palette: "Warm",
          mood: "Cozy",
          lighting: "Warm indoor",
          paletteName: "Mùa Thu Ấm Áp",
        },
      },
    ],
  },
];
