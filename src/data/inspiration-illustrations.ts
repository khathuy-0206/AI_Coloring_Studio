// src/data/inspiration-illustrations.ts
// Bộ sưu tập 112 minh họa phong cách sách tô màu Coco Wyo chất lượng cao, đậm nét, giàu chi tiết và màu sắc cho từng chủ đề

function makeScene(
  cleanId: string,
  title: string,
  badgeIcon: string,
  accentColor: string,
  skyGrad: [string, string, string],
  skyDecor: string,
  environmentSetting: string,
  focalSubject: string,
  foregroundDetails: string
): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 375" width="500" height="375">
    <defs>
      <linearGradient id="bg_${cleanId}" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="${skyGrad[0]}" stop-opacity="0.95" />
        <stop offset="60%" stop-color="${skyGrad[1]}" stop-opacity="0.9" />
        <stop offset="100%" stop-color="${skyGrad[2]}" stop-opacity="0.85" />
      </linearGradient>
      <filter id="shadow_${cleanId}">
        <feDropShadow dx="2" dy="5" stdDeviation="5" flood-color="#2C2016" flood-opacity="0.22" />
      </filter>
    </defs>

    <!-- Nền bầu trời / không gian chính -->
    <rect x="8" y="8" width="484" height="359" rx="22" fill="url(#bg_${cleanId})" />

    <!-- Họa tiết trang trí không gian -->
    ${skyDecor}

    <!-- Bối cảnh khung cảnh -->
    ${environmentSetting}

    <!-- CHỦ THỂ MINH HỌA NGHỆ THUẬT CHÍNH (Đường nét dày 3.5-4.5px, màu pastel sắc sảo) -->
    <g filter="url(#shadow_${cleanId})">
      ${focalSubject}
    </g>

    <!-- Chi tiết tiền cảnh -->
    ${foregroundDetails}

    <!-- Khung viền sách tô màu Coco Wyo (Thick Dark Lineart Outer Border) -->
    <rect x="8" y="8" width="484" height="359" rx="22" fill="none" stroke="#2C2016" stroke-width="4.5" />
    <rect x="15" y="15" width="470" height="345" rx="17" fill="none" stroke="#2C2016" stroke-width="1.5" stroke-dasharray="6,4" opacity="0.65" />

    <!-- Thẻ nhãn minh họa phong cách truyện tranh -->
    <g transform="translate(24, 322)" filter="url(#shadow_${cleanId})">
      <rect width="210" height="30" rx="15" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5" />
      <circle cx="16" cy="15" r="8" fill="${accentColor}" stroke="#2C2016" stroke-width="2" />
      <text x="32" y="20" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="800" fill="#2C2016">${badgeIcon} ${title}</text>
    </g>
  </svg>`.trim();

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const THEME_SCENE_ILLUSTRATIONS: Record<string, string> = {
  "botanical-succulent-pots": makeScene(
    "botanicalsucculentpots",
    "Chậu Sen Đá Mọng Nước",
    "🪴",
    "#83C5BE",
    ["#E8F8F5","#D8F3DC","#FFE5D9"],
    `<!-- Khung cửa sổ nhà kính đầy nắng -->
      <line x1="8" y1="120" x2="492" y2="120" stroke="#2C2016" stroke-width="3" opacity="0.4"/>
      <line x1="250" y1="8" x2="250" y2="240" stroke="#2C2016" stroke-width="3" opacity="0.4"/>
      <circle cx="80" cy="70" r="28" fill="#FFF1C5" opacity="0.6"/>
      <!-- Bướm vàng bay lượn -->
      <g transform="translate(380, 50)">
        <path d="M0,0 Q12,-15 18,-5 Q12,10 0,0" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
        <path d="M0,0 Q-12,-15 -18,-5 Q-12,10 0,0" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Kệ gỗ trưng bày mộc mạc và chân tường gạch -->
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="270" x2="492" y2="270" stroke="#2C2016" stroke-width="2.5" opacity="0.7"/>
      <rect x="30" y="225" width="440" height="20" rx="6" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chậu 1: Sen đá Echeveria cánh xếp hồng phấn -->
      <g transform="translate(60, 155)">
        <path d="M10,45 L65,45 L58,95 L17,95 Z" fill="#FFCAD4" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="37" cy="45" rx="28" ry="8" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
        <circle cx="37" cy="30" r="24" fill="#B7E4C7" stroke="#2C2016" stroke-width="3"/>
        <circle cx="25" cy="25" r="14" fill="#D8F3DC" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="49" cy="25" r="14" fill="#D8F3DC" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="37" cy="18" r="12" fill="#FFCCD5" stroke="#2C2016" stroke-width="2.5"/>
      </g>
      <!-- Chậu 2: Chuỗi ngọc rủ dài xanh mướt (String of pearls) -->
      <g transform="translate(160, 140)">
        <path d="M15,55 L75,55 L68,105 L22,105 Z" fill="#83C5BE" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="45" cy="55" rx="30" ry="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Chuỗi hạt rủ -->
        <path d="M25,60 Q15,100 20,130" stroke="#2C2016" stroke-width="3" fill="none"/>
        <circle cx="20" cy="80" r="7" fill="#95D5B2" stroke="#2C2016" stroke-width="2"/>
        <circle cx="17" cy="100" r="7" fill="#95D5B2" stroke="#2C2016" stroke-width="2"/>
        <circle cx="21" cy="120" r="6" fill="#95D5B2" stroke="#2C2016" stroke-width="2"/>
        <path d="M60,60 Q70,95 65,125" stroke="#2C2016" stroke-width="3" fill="none"/>
        <circle cx="66" cy="80" r="7" fill="#B7E4C7" stroke="#2C2016" stroke-width="2"/>
        <circle cx="68" cy="100" r="7" fill="#B7E4C7" stroke="#2C2016" stroke-width="2"/>
        <circle cx="64" cy="118" r="6" fill="#B7E4C7" stroke="#2C2016" stroke-width="2"/>
      </g>
      <!-- Chậu 3: Xương rồng tròn nở hoa hồng -->
      <g transform="translate(270, 145)">
        <path d="M12,50 L68,50 L62,100 L18,100 Z" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="40" cy="35" r="32" fill="#74C69D" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="40" y1="5" x2="40" y2="65" stroke="#2C2016" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="25" y1="12" x2="25" y2="58" stroke="#2C2016" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="55" y1="12" x2="55" y2="58" stroke="#2C2016" stroke-width="2" stroke-dasharray="3,3"/>
        <!-- Hoa nhỏ trên đỉnh -->
        <circle cx="40" cy="5" r="9" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="40" cy="5" r="4" fill="#FFF1C5"/>
      </g>
      <!-- Bình tưới nước cổ điển bên phải -->
      <g transform="translate(365, 170)">
        <ellipse cx="45" cy="55" rx="35" ry="25" fill="#BDE0FE" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M75,50 L110,30 L112,42 L80,62 Z" fill="#BDE0FE" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="112" cy="36" rx="6" ry="10" fill="#A2D2FF" stroke="#2C2016" stroke-width="2.5"/>
        <path d="M20,40 Q-5,15 15,10 Q35,5 40,30" fill="none" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Lá sen đá rụng và xẻng làm vườn mini -->
      <ellipse cx="120" cy="235" rx="8" ry="5" fill="#D8F3DC" stroke="#2C2016" stroke-width="2"/>
      <ellipse cx="340" cy="237" rx="9" ry="6" fill="#B7E4C7" stroke="#2C2016" stroke-width="2"/>`
  ),
  "botanical-lavender-field": makeScene(
    "botanicallavenderfield",
    "Cánh Đồng Oải Hương Provence",
    "💜",
    "#C7B9FF",
    ["#E8D7F1","#DFCCF1","#FFD1DC"],
    `<!-- Hoàng hôn tím hồng thơ mộng và mặt trời lặn -->
      <circle cx="250" cy="140" r="50" fill="#FFF1C5" opacity="0.7"/>
      <path d="M60,60 Q100,40 140,60 Q180,80 120,90 Q80,85 60,60 Z" fill="#FFFFFF" opacity="0.6"/>
      <path d="M330,80 Q370,60 410,80 Q440,100 390,105 Q350,100 330,80 Z" fill="#FFFFFF" opacity="0.6"/>`,
    `<!-- Những luống oải hương uốn lượn ngút ngàn -->
      <path d="M8,170 Q130,140 250,165 Q370,140 492,165 L492,367 L8,367 Z" fill="#DFCCF1" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,215 Q140,185 270,215 Q400,185 492,215 L492,367 L8,367 Z" fill="#C7B9FF" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,265 Q160,235 300,265 Q420,235 492,265 L492,367 L8,367 Z" fill="#B39DDB" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Cối xay gió cổ kính xa xa -->
      <g transform="translate(360, 95)">
        <path d="M15,65 L25,15 L45,15 L55,65 Z" fill="#EBDDD4" stroke="#2C2016" stroke-width="3"/>
        <circle cx="35" cy="22" r="5" fill="#442B22"/>
        <line x1="35" y1="22" x2="10" y2="-5" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="35" y1="22" x2="60" y2="45" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="35" y1="22" x2="60" y2="-5" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="35" y1="22" x2="10" y2="45" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Xe đạp cổ điển giỏ đầy hoa oải hương -->
      <g transform="translate(100, 170)">
        <!-- 2 bánh xe lớn với nan hoa -->
        <circle cx="50" cy="95" r="45" fill="none" stroke="#2C2016" stroke-width="4"/>
        <circle cx="50" cy="95" r="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="1.5" opacity="0.3"/>
        <circle cx="180" cy="95" r="45" fill="none" stroke="#2C2016" stroke-width="4"/>
        <circle cx="180" cy="95" r="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="1.5" opacity="0.3"/>
        <!-- Khung xe đạp pastel mint -->
        <path d="M50,95 L105,95 L145,55 L85,55 Z" fill="none" stroke="#74C69D" stroke-width="6" stroke-linecap="round"/>
        <path d="M50,95 L105,95 L145,55 L85,55 Z" fill="none" stroke="#2C2016" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="105" y1="95" x2="80" y2="45" stroke="#2C2016" stroke-width="4"/>
        <!-- Yên xe da nâu -->
        <path d="M68,45 Q82,40 95,45 Q82,50 68,45 Z" fill="#A0522D" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Ghi-đông và giỏ mây ngập hoa -->
        <line x1="145" y1="55" x2="160" y2="25" stroke="#2C2016" stroke-width="4"/>
        <path d="M150,22 Q165,15 180,22" fill="none" stroke="#2C2016" stroke-width="4"/>
        <!-- Giỏ hoa mây -->
        <path d="M165,25 L195,25 L190,55 L170,55 Z" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
        <circle cx="180" cy="20" r="14" fill="#C7B9FF" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="172" cy="12" r="10" fill="#9575CD" stroke="#2C2016" stroke-width="2"/>
        <circle cx="190" cy="15" r="10" fill="#D1C4E9" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Các nhánh hoa oải hương cận cảnh đong đưa -->
      <g transform="translate(380, 260)">
        <line x1="20" y1="90" x2="20" y2="0" stroke="#558B2F" stroke-width="3.5"/>
        <circle cx="20" cy="10" r="7" fill="#7E57C2" stroke="#2C2016" stroke-width="2"/>
        <circle cx="20" cy="25" r="7" fill="#9575CD" stroke="#2C2016" stroke-width="2"/>
        <circle cx="20" cy="40" r="7" fill="#B39DDB" stroke="#2C2016" stroke-width="2"/>
        <line x1="45" y1="90" x2="45" y2="15" stroke="#558B2F" stroke-width="3.5"/>
        <circle cx="45" cy="25" r="7" fill="#7E57C2" stroke="#2C2016" stroke-width="2"/>
        <circle cx="45" cy="40" r="7" fill="#9575CD" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "botanical-english-rose": makeScene(
    "botanicalenglishrose",
    "Vườn Hoa Hồng Cổ Nước Anh",
    "🌹",
    "#F4ACB7",
    ["#FFF0F5","#FDE2E4","#E8F8F5"],
    `<!-- Vòm cổng hoa hồng leo kiểu Anh cổ điển -->
      <path d="M70,250 L70,80 Q250,-10 430,80 L430,250" fill="none" stroke="#2C2016" stroke-width="5"/>
      <path d="M85,250 L85,90 Q250,10 415,90 L415,250" fill="none" stroke="#2C2016" stroke-width="3"/>
      <!-- Dây hoa hồng quấn quanh vòm -->
      <circle cx="150" cy="55" r="14" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="250" cy="30" r="16" fill="#F4ACB7" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="350" cy="55" r="14" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Lối đi lát đá cuội và bãi cỏ nhung xanh -->
      <rect x="8" y="240" width="484" height="127" fill="#D8F3DC" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M190,367 L210,240 L290,240 L310,367 Z" fill="#EBDDD4" stroke="#2C2016" stroke-width="3"/>
      <ellipse cx="250" cy="290" rx="30" ry="12" fill="#DDBEA9" stroke="#2C2016" stroke-width="2"/>`,
    `<!-- Ghế dài sân vườn sắt rèn uốn lượn trắng thanh nhã -->
      <g transform="translate(140, 160)">
        <rect x="25" y="45" width="170" height="18" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="40" y1="15" x2="40" y2="45" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="80" y1="10" x2="80" y2="45" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="140" y1="10" x2="140" y2="45" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="180" y1="15" x2="180" y2="45" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Chân ghế uốn hoa văn -->
        <path d="M40,63 L30,105 M180,63 L190,105" stroke="#2C2016" stroke-width="4" stroke-linecap="round"/>
        <!-- Bụi hoa hồng mẫu đơn nhiều lớp nở rộ 2 bên -->
        <circle cx="10" cy="40" r="22" fill="#F4ACB7" stroke="#2C2016" stroke-width="3"/>
        <circle cx="10" cy="40" r="13" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="10" cy="40" r="6" fill="#FFFDF9"/>
        <circle cx="210" cy="40" r="22" fill="#F4ACB7" stroke="#2C2016" stroke-width="3"/>
        <circle cx="210" cy="40" r="13" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="210" cy="40" r="6" fill="#FFFDF9"/>
      </g>`,
    `<!-- Cánh hoa hồng rơi trên phiến đá -->
      <ellipse cx="230" cy="310" rx="7" ry="4" fill="#FFCAD4" stroke="#2C2016" stroke-width="1.5"/>
      <ellipse cx="270" cy="330" rx="8" ry="5" fill="#F4ACB7" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "animal-cozy-shiba": makeScene(
    "animalcozyshiba",
    "Chú Cún Shiba Khăn Quàng Ấm",
    "🐕",
    "#E29578",
    ["#FFE5D9","#FFF1C5","#FFDDD2"],
    `<!-- Công viên mùa thu lá phong bay phấp phới -->
      <path d="M60,40 Q90,20 120,40 Q150,60 100,70 Z" fill="#FFCCD5" opacity="0.6"/>
      <g transform="translate(390, 45)">
        <path d="M0,0 L15,-10 L8,15 Z" fill="#E29578" stroke="#2C2016" stroke-width="2"/>
      </g>
      <g transform="translate(80, 85)">
        <path d="M0,0 L-12,-8 L-6,12 Z" fill="#E29578" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Đường lát đá công viên và tán cây phong đỏ -->
      <rect x="8" y="240" width="484" height="127" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="190" ry="40" fill="#EBDDD4" stroke="#2C2016" stroke-width="2.5"/>
      <line x1="8" y1="240" x2="492" y2="240" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chú cún Shiba béo tròn quàng khăn đỏ mỉm cười -->
      <g transform="translate(180, 110)">
        <!-- Thân mình mập mạp tròn trĩnh -->
        <ellipse cx="70" cy="110" rx="65" ry="55" fill="#FFE5D9" stroke="#2C2016" stroke-width="4"/>
        <ellipse cx="70" cy="115" rx="42" ry="35" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Đầu tròn và 2 tai tam giác vểnh -->
        <circle cx="70" cy="45" r="48" fill="#FFE5D9" stroke="#2C2016" stroke-width="4"/>
        <path d="M30,15 L20,-15 L52,-2 Z" fill="#E29578" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M32,10 L25,-8 L48,0 Z" fill="#FFCAD4"/>
        <path d="M110,15 L120,-15 L88,-2 Z" fill="#E29578" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M108,10 L115,-8 L92,0 Z" fill="#FFCAD4"/>
        <!-- Má trắng bầu bĩnh và mắt híp cười -->
        <ellipse cx="70" cy="55" rx="35" ry="25" fill="#FFFDF9"/>
        <ellipse cx="48" cy="62" rx="8" ry="5" fill="#FFCAD4" opacity="0.8"/>
        <ellipse cx="92" cy="62" rx="8" ry="5" fill="#FFCAD4" opacity="0.8"/>
        <path d="M42,40 Q50,33 58,40" stroke="#2C2016" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <path d="M82,40 Q90,33 98,40" stroke="#2C2016" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <!-- Mũi tam giác và miệng cười tam giác chữ w -->
        <path d="M66,48 L74,48 L70,54 Z" fill="#2C2016"/>
        <path d="M62,55 Q70,62 70,55 Q70,62 78,55" stroke="#2C2016" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Khăn quàng cổ len xù đỏ ấm cúng -->
        <path d="M25,82 Q70,105 115,82 Q120,98 70,105 Q20,98 25,82 Z" fill="#E63946" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M85,95 L95,145 L70,145 L75,98 Z" fill="#E63946" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="72" y1="145" x2="72" y2="152" stroke="#2C2016" stroke-width="2"/>
        <line x1="82" y1="145" x2="82" y2="152" stroke="#2C2016" stroke-width="2"/>
        <line x1="92" y1="145" x2="92" y2="152" stroke="#2C2016" stroke-width="2"/>
        <!-- Đuôi cuộn tròn phía sau -->
        <path d="M125,120 Q155,100 145,80 Q130,70 125,85" stroke="#2C2016" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M125,120 Q155,100 145,80 Q130,70 125,85" stroke="#FFE5D9" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Hai bàn chân tròn trước -->
        <circle cx="50" cy="155" r="14" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="90" cy="155" r="14" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Tách cà phê giấy ấm bên cạnh và lá rụng -->
      <g transform="translate(360, 240)">
        <path d="M5,0 L35,0 L30,40 L10,40 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="2" y="-5" width="36" height="7" rx="3" fill="#E29578" stroke="#2C2016" stroke-width="2"/>
      </g>
      <ellipse cx="140" cy="275" rx="10" ry="6" fill="#E29578" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "animal-bunny-strawberry": makeScene(
    "animalbunnystrawberry",
    "Bé Thỏ Ôm Quả Dâu Tây",
    "🐰",
    "#FFCCD5",
    ["#FFF0F5","#FFCCD5","#D8F3DC"],
    `<!-- Cầu vồng pastel và mây xốp -->
      <path d="M100,120 Q250,20 400,120" fill="none" stroke="#FFD1DC" stroke-width="10" opacity="0.6"/>
      <path d="M100,130 Q250,30 400,130" fill="none" stroke="#FFF1C5" stroke-width="10" opacity="0.6"/>
      <path d="M100,140 Q250,40 400,140" fill="none" stroke="#D8F3DC" stroke-width="10" opacity="0.6"/>`,
    `<!-- Thảm cỏ dã ngoại và hàng rào trắng -->
      <rect x="8" y="240" width="484" height="127" fill="#B7E4C7" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Khăn trải dã ngoại ca-rô dâu tây -->
      <ellipse cx="250" cy="270" rx="180" ry="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="270" rx="170" ry="38" fill="#FFCAD4" opacity="0.3"/>`,
    `<!-- Bé thỏ trắng mũm mĩm ôm quả dâu tây đỏ to đùng -->
      <g transform="translate(160, 100)">
        <!-- Đôi tai dài cụp hồng phấn -->
        <ellipse cx="50" cy="10" rx="14" ry="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="50" cy="10" rx="7" ry="32" fill="#FFCCD5"/>
        <ellipse cx="130" cy="10" rx="14" ry="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="130" cy="10" rx="7" ry="32" fill="#FFCCD5"/>
        <!-- Thân thỏ tròn xoe -->
        <circle cx="90" cy="115" r="55" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Đầu thỏ trắng tròn -->
        <circle cx="90" cy="65" r="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Mắt đen tròn long lanh và má hồng -->
        <circle cx="70" cy="65" r="6" fill="#2C2016"/>
        <circle cx="68" cy="63" r="2" fill="#FFFFFF"/>
        <circle cx="110" cy="65" r="6" fill="#2C2016"/>
        <circle cx="108" cy="63" r="2" fill="#FFFFFF"/>
        <ellipse cx="58" cy="74" rx="8" ry="5" fill="#FFCAD4"/>
        <ellipse cx="122" cy="74" rx="8" ry="5" fill="#FFCAD4"/>
        <circle cx="90" cy="72" r="3.5" fill="#FFCAD4"/>
        <!-- Quả dâu tây khổng lồ đỏ mọng được ôm phía trước -->
        <path d="M60,115 C55,85 125,85 120,115 C115,155 90,165 90,165 C90,165 65,155 60,115 Z" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <!-- Tai lá xanh quả dâu -->
        <path d="M75,95 Q90,105 85,90 Q95,105 105,95 Z" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>
        <!-- Hạt dâu tây vàng nhỏ xinh -->
        <ellipse cx="78" cy="115" rx="2" ry="3" fill="#FFF1C5"/>
        <ellipse cx="102" cy="115" rx="2" ry="3" fill="#FFF1C5"/>
        <ellipse cx="90" cy="130" rx="2" ry="3" fill="#FFF1C5"/>
        <ellipse cx="80" cy="142" rx="2" ry="3" fill="#FFF1C5"/>
        <ellipse cx="100" cy="142" rx="2" ry="3" fill="#FFF1C5"/>
        <!-- Hai tay thỏ ôm quả dâu -->
        <circle cx="62" cy="120" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <circle cx="118" cy="120" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Giỏ mây đựng đầy dâu tây bên cạnh -->
      <g transform="translate(360, 240)">
        <path d="M5,15 L45,15 L40,40 L10,40 Z" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
        <circle cx="20" cy="10" r="8" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
        <circle cx="32" cy="12" r="8" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "animal-panda-bamboo": makeScene(
    "animalpandabamboo",
    "Gấu Trúc Tắm Nắng Rừng Trúc",
    "🐼",
    "#52B788",
    ["#E8F8F5","#D8F3DC","#B7E4C7"],
    `<!-- Rừng trúc xanh mát mẻ thanh bình -->
      <line x1="60" y1="8" x2="60" y2="260" stroke="#74C69D" stroke-width="12"/>
      <line x1="60" y1="8" x2="60" y2="260" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="120" y1="8" x2="120" y2="260" stroke="#74C69D" stroke-width="10"/>
      <line x1="120" y1="8" x2="120" y2="260" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="390" y1="8" x2="390" y2="260" stroke="#74C69D" stroke-width="12"/>
      <line x1="390" y1="8" x2="390" y2="260" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="440" y1="8" x2="440" y2="260" stroke="#74C69D" stroke-width="10"/>
      <line x1="440" y1="8" x2="440" y2="260" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Tảng đá rêu phong bên bờ suối -->
      <rect x="8" y="240" width="484" height="127" fill="#95D5B2" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="160" ry="42" fill="#D8F3DC" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Bé gấu trúc tròn xoe ngồi gặm nhánh trúc -->
      <g transform="translate(170, 110)">
        <!-- Hai tai đen tròn -->
        <circle cx="40" cy="20" r="18" fill="#2C2016"/>
        <circle cx="120" cy="20" r="18" fill="#2C2016"/>
        <!-- Thân trắng tròn trịa -->
        <ellipse cx="80" cy="115" rx="65" ry="50" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Hai chân sau duỗi tròn -->
        <ellipse cx="25" cy="135" rx="22" ry="16" fill="#2C2016"/>
        <circle cx="25" cy="135" r="8" fill="#442B22"/>
        <ellipse cx="135" cy="135" rx="22" ry="16" fill="#2C2016"/>
        <circle cx="135" cy="135" r="8" fill="#442B22"/>
        <!-- Đầu tròn trắng -->
        <circle cx="80" cy="55" r="50" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Hai quầng mắt đen nghiêng đáng yêu -->
        <ellipse cx="55" cy="50" rx="15" ry="18" fill="#2C2016" transform="rotate(-15, 55, 50)"/>
        <circle cx="57" cy="50" r="5" fill="#FFFDF9"/>
        <ellipse cx="105" cy="50" rx="15" ry="18" fill="#2C2016" transform="rotate(15, 105, 50)"/>
        <circle cx="103" cy="50" r="5" fill="#FFFDF9"/>
        <!-- Mũi tam giác đen và miệng cười -->
        <path d="M74,65 L86,65 L80,73 Z" fill="#2C2016"/>
        <path d="M72,75 Q80,82 88,75" stroke="#2C2016" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Cành trúc xanh cầm 2 tay gặm -->
        <line x1="20" y1="120" x2="140" y2="70" stroke="#52B788" stroke-width="7" stroke-linecap="round"/>
        <line x1="20" y1="120" x2="140" y2="70" stroke="#2C2016" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Hai tay đen ôm nhánh trúc -->
        <circle cx="48" cy="95" r="16" fill="#2C2016"/>
        <circle cx="112" cy="85" r="16" fill="#2C2016"/>
      </g>`,
    `<!-- Măng non mọc trên đất xanh -->
      <g transform="translate(370, 255)">
        <path d="M10,35 Q20,5 30,35 Z" fill="#74C69D" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="12" y1="28" x2="28" y2="28" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "animal-otter-sleep": makeScene(
    "animalottersleep",
    "Đôi Rái Cá Nắm Tay Ngủ",
    "🦦",
    "#A2D2FF",
    ["#E0F2FE","#BDE0FE","#CCE3DE"],
    `<!-- Ánh nắng lấp lánh phản chiếu mặt nước và bọt sóng -->
      <circle cx="120" cy="60" r="3" fill="#FFFDF9"/>
      <circle cx="160" cy="80" r="4" fill="#FFFDF9"/>
      <circle cx="340" cy="50" r="4" fill="#FFFDF9"/>
      <circle cx="380" cy="70" r="3" fill="#FFFDF9"/>`,
    `<!-- Dòng sông êm đềm với các gợn sóng nước lăn tăn -->
      <rect x="8" y="160" width="484" height="207" fill="#A2D2FF" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M40,200 Q90,190 140,200 Q190,210 240,200 Q290,190 340,200 Q390,210 440,200" stroke="#FFFDF9" stroke-width="3" fill="none" opacity="0.7"/>
      <path d="M60,310 Q110,300 160,310 Q210,320 260,310 Q310,300 360,310 Q410,320 460,310" stroke="#FFFDF9" stroke-width="3" fill="none" opacity="0.7"/>
      <!-- Lá sen tròn nổi trên mặt nước -->
      <ellipse cx="80" cy="240" rx="35" ry="18" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>
      <ellipse cx="420" cy="270" rx="38" ry="20" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Đôi bạn rái cá nhỏ nắm tay thả trôi ngửa bụng ngủ -->
      <g transform="translate(140, 160)">
        <!-- Rái cá 1 (bên trái) -->
        <g transform="translate(0, 0)">
          <ellipse cx="50" cy="65" rx="35" ry="55" fill="#DDBEA9" stroke="#2C2016" stroke-width="4"/>
          <ellipse cx="50" cy="70" rx="22" ry="38" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
          <circle cx="50" cy="25" r="28" fill="#DDBEA9" stroke="#2C2016" stroke-width="4"/>
          <!-- Tai nhỏ và mặt ngủ -->
          <circle cx="26" cy="15" r="7" fill="#DDBEA9" stroke="#2C2016" stroke-width="2.5"/>
          <path d="M38,25 Q44,30 50,25" stroke="#2C2016" stroke-width="3" fill="none"/>
          <circle cx="50" cy="28" r="3" fill="#2C2016"/>
        </g>
        <!-- Rái cá 2 (bên phải) -->
        <g transform="translate(110, 0)">
          <ellipse cx="50" cy="65" rx="35" ry="55" fill="#CDB4DB" stroke="#2C2016" stroke-width="4"/>
          <ellipse cx="50" cy="70" rx="22" ry="38" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
          <circle cx="50" cy="25" r="28" fill="#CDB4DB" stroke="#2C2016" stroke-width="4"/>
          <circle cx="74" cy="15" r="7" fill="#CDB4DB" stroke="#2C2016" stroke-width="2.5"/>
          <path d="M50,25 Q56,30 62,25" stroke="#2C2016" stroke-width="3" fill="none"/>
          <circle cx="50" cy="28" r="3" fill="#2C2016"/>
        </g>
        <!-- Hai tay nắm chặt nhau ở giữa -->
        <path d="M75,65 Q105,60 135,65" stroke="#2C2016" stroke-width="5" fill="none" stroke-linecap="round"/>
        <circle cx="105" cy="63" r="10" fill="#FFE5D9" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Bông hoa súng trắng nở trên lá sen -->
      <g transform="translate(70, 220)">
        <circle cx="10" cy="10" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        <circle cx="10" cy="10" r="4" fill="#FFE599"/>
      </g>`
  ),
  "animal-duck-puddle": makeScene(
    "animalduckpuddle",
    "Chú Vịt Vàng Đội Lá Sen",
    "🦆",
    "#FFE599",
    ["#E0F2FE","#D8F3DC","#FFF1C5"],
    `<!-- Mưa xuân dịu dàng rơi tí tách -->
      <line x1="80" y1="20" x2="70" y2="60" stroke="#A2D2FF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="180" y1="30" x2="170" y2="70" stroke="#A2D2FF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="320" y1="15" x2="310" y2="55" stroke="#A2D2FF" stroke-width="2.5" stroke-linecap="round"/>
      <line x1="420" y1="35" x2="410" y2="75" stroke="#A2D2FF" stroke-width="2.5" stroke-linecap="round"/>`,
    `<!-- Vũng nước trong veo sau mưa phản chiếu ánh sáng -->
      <rect x="8" y="240" width="484" height="127" fill="#B7E4C7" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="170" ry="40" fill="#BDE0FE" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="130" ry="25" fill="#A2D2FF" opacity="0.6"/>`,
    `<!-- Vịt con lông vàng tơ đội chiếc lá sen che mưa -->
      <g transform="translate(180, 110)">
        <!-- Chiếc lá sen to đùng đội nghiêng như ô che -->
        <path d="M10,25 Q70,-10 130,25 Q110,40 70,35 Q30,40 10,25 Z" fill="#74C69D" stroke="#2C2016" stroke-width="4"/>
        <line x1="70" y1="35" x2="75" y2="65" stroke="#52B788" stroke-width="4"/>
        <circle cx="50" cy="18" r="4" fill="#BDE0FE"/>
        <!-- Thân vịt con vàng béo tròn -->
        <ellipse cx="70" cy="115" rx="45" ry="38" fill="#FFF1C5" stroke="#2C2016" stroke-width="4"/>
        <path d="M105,105 Q125,100 120,115 Z" fill="#FFF1C5" stroke="#2C2016" stroke-width="3"/>
        <!-- Đầu tròn và mỏ cam dẹt dễ thương -->
        <circle cx="70" cy="65" r="32" fill="#FFF1C5" stroke="#2C2016" stroke-width="4"/>
        <circle cx="58" cy="62" r="5" fill="#2C2016"/>
        <circle cx="57" cy="60" r="1.5" fill="#FFFDF9"/>
        <ellipse cx="50" cy="70" rx="6" ry="3" fill="#FFCCD5"/>
        <ellipse cx="85" cy="70" rx="16" ry="9" fill="#F4A261" stroke="#2C2016" stroke-width="3"/>
        <!-- Hai chân màng cam lội bì bõm -->
        <ellipse cx="55" cy="152" rx="12" ry="6" fill="#F4A261" stroke="#2C2016" stroke-width="2.5"/>
        <ellipse cx="85" cy="152" rx="12" ry="6" fill="#F4A261" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Chú ốc sên nhỏ bò bên vũng nước -->
      <g transform="translate(370, 260)">
        <path d="M5,15 Q25,15 30,10" stroke="#2C2016" stroke-width="3" fill="none"/>
        <circle cx="15" cy="10" r="10" fill="#E29578" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "fantasy-fairy-wings": makeScene(
    "fantasyfairywings",
    "Tiên Nữ Bướm Hoa Chuông",
    "🧚",
    "#DFCCF1",
    ["#E8D7F1","#DFCCF1","#FFD1DC"],
    `<!-- Bầu trời cổ tích với ngôi sao lấp lánh và đốm sáng thần tiên -->
      <path d="M100,50 L104,65 L120,67 L106,75 L110,90 L98,78 L85,88 L92,73 L80,65 L96,63 Z" fill="#FFF1C5" stroke="#2C2016" stroke-width="1.5"/>
      <circle cx="380" cy="70" r="15" fill="#FFE599" opacity="0.6"/>
      <circle cx="220" cy="40" r="3" fill="#FFFFFF"/>
      <circle cx="300" cy="90" r="4" fill="#FFFFFF"/>`,
    `<!-- Trảng cỏ thần tiên với hoa chuông rủ bóng -->
      <rect x="8" y="240" width="484" height="127" fill="#C7B9FF" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M50,260 Q120,230 200,260 Q280,290 350,260 Q420,230 480,260" stroke="#FFFDF9" stroke-width="3" fill="none" opacity="0.6"/>`,
    `<!-- Đôi cánh bướm tiên nữ phát quang rực rỡ và vương miện hoa -->
      <g transform="translate(140, 90)">
        <!-- Đôi cánh trên lớn lấp lánh họa tiết -->
        <path d="M110,90 C50,20 -20,20 10,90 C30,140 100,120 110,90 Z" fill="#E8D7F1" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M110,90 C170,20 240,20 210,90 C190,140 120,120 110,90 Z" fill="#E8D7F1" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Đôi cánh dưới tròn xoe -->
        <ellipse cx="60" cy="130" rx="35" ry="25" fill="#FFCCD5" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="160" cy="130" rx="35" ry="25" fill="#FFCCD5" stroke="#2C2016" stroke-width="3"/>
        <!-- Hoa chuông thần kỳ xanh tím ở giữa -->
        <path d="M90,70 Q110,40 130,70 L135,110 L85,110 Z" fill="#C7B9FF" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Đũa phép ngôi sao tỏa sáng -->
        <line x1="110" y1="90" x2="110" y2="180" stroke="#2C2016" stroke-width="4"/>
        <polygon points="110,75 114,85 125,85 116,92 120,102 110,96 100,102 104,92 95,85 106,85" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Đom đóm phát sáng bay lượn -->
      <circle cx="80" cy="270" r="6" fill="#FFF1C5" stroke="#2C2016" stroke-width="1.5"/>
      <circle cx="420" cy="250" r="5" fill="#FFE599" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "fantasy-glowing-mushrooms": makeScene(
    "fantasyglowingmushrooms",
    "Rừng Nấm Phát Quang Huyền Bí",
    "🍄",
    "#FFB4A2",
    ["#2B2D42","#4A4E69","#8D99AE"],
    `<!-- Rừng đêm ngập tràn đốm sáng phát quang ma thuật -->
      <circle cx="100" cy="60" r="2.5" fill="#FFFDF9"/>
      <circle cx="200" cy="40" r="3" fill="#FFFDF9"/>
      <circle cx="340" cy="50" r="2.5" fill="#FFFDF9"/>
      <circle cx="420" cy="80" r="3" fill="#FFFDF9"/>
      <!-- Vầng trăng lưỡi liềm vàng dịu -->
      <path d="M60,40 A20,20 0 1 0 85,65 A16,16 0 1 1 60,40" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>`,
    `<!-- Thảm rêu rừng đêm phát sáng xanh ngọc -->
      <rect x="8" y="240" width="484" height="127" fill="#3D5A80" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="190" ry="45" fill="#293241" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Cụm nấm khổng lồ mũ đỏ chấm bi phát quang -->
      <g transform="translate(150, 100)">
        <!-- Thân nấm lớn cong uyển chuyển -->
        <path d="M85,90 C80,140 70,165 70,170 L130,170 C130,165 120,140 115,90 Z" fill="#EBDDD4" stroke="#2C2016" stroke-width="4"/>
        <!-- Mũ nấm khổng lồ đỏ cam -->
        <path d="M20,95 Q100,-10 180,95 Q100,105 20,95 Z" fill="#E63946" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Chấm tròn phát sáng trên mũ nấm -->
        <circle cx="65" cy="55" r="14" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="135" cy="55" r="14" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="100" cy="30" r="16" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="100" cy="75" r="10" fill="#FFF1C5" stroke="#2C2016" stroke-width="2"/>
        <!-- Nấm nhỏ bên cạnh màu lam ngọc phát sáng -->
        <g transform="translate(-40, 50)">
          <path d="M35,65 L40,110 L55,110 L50,65 Z" fill="#EBDDD4" stroke="#2C2016" stroke-width="3"/>
          <path d="M15,68 Q45,20 75,68 Z" fill="#83C5BE" stroke="#2C2016" stroke-width="3.5"/>
          <circle cx="45" cy="48" r="6" fill="#FFFDF9"/>
        </g>
      </g>`,
    `<!-- Cỏ thần thoại và nấm tí hon phát quang dưới chân -->
      <ellipse cx="120" cy="290" rx="6" ry="12" fill="#98D8AA" stroke="#2C2016" stroke-width="1.5"/>
      <ellipse cx="380" cy="300" rx="7" ry="14" fill="#98D8AA" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "fantasy-crystal-lake": makeScene(
    "fantasycrystallake",
    "Hồ Nước Pha Lê Kỳ Ảo",
    "💎",
    "#A2D2FF",
    ["#C7B9FF","#BDE0FE","#E0F2FE"],
    `<!-- Bầu trời phản chiếu tinh thể pha lê ngũ sắc -->
      <polygon points="120,40 135,15 150,40 135,65" fill="#E8D7F1" stroke="#2C2016" stroke-width="2"/>
      <polygon points="360,50 375,25 390,50 375,75" fill="#BDE0FE" stroke="#2C2016" stroke-width="2"/>`,
    `<!-- Mặt hồ phẳng lặng như gương pha lê trong suốt -->
      <rect x="8" y="180" width="484" height="187" fill="#A2D2FF" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="190" ry="60" fill="#E0F2FE" stroke="#2C2016" stroke-width="2.5" opacity="0.8"/>`,
    `<!-- Khối tinh thể pha lê thạch anh khổng lồ mọc giữa hồ -->
      <g transform="translate(170, 90)">
        <polygon points="80,10 50,150 110,150" fill="#BDE0FE" stroke="#2C2016" stroke-width="4"/>
        <polygon points="80,10 110,150 135,150" fill="#A2D2FF" stroke="#2C2016" stroke-width="3.5"/>
        <polygon points="35,60 15,160 65,160" fill="#E8D7F1" stroke="#2C2016" stroke-width="3.5"/>
        <polygon points="125,50 110,160 155,160" fill="#FFCCD5" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Vòng sóng nước phát sáng tỏa tròn quanh chân pha lê -->
        <ellipse cx="80" cy="155" rx="75" ry="18" fill="none" stroke="#FFFDF9" stroke-width="3.5"/>
        <ellipse cx="80" cy="155" rx="95" ry="24" fill="none" stroke="#FFFDF9" stroke-width="2" stroke-dasharray="6,4"/>
      </g>`,
    `<!-- Tinh thể pha lê nhỏ lấp lánh ven bờ -->
      <polygon points="70,300 80,275 90,300" fill="#C7B9FF" stroke="#2C2016" stroke-width="2"/>
      <polygon points="410,290 420,265 430,290" fill="#BDE0FE" stroke="#2C2016" stroke-width="2"/>`
  ),
  "fantasy-wishing-tree": makeScene(
    "fantasywishingtree",
    "Cây Ước Nguyện Đom Đóm",
    "✨",
    "#FFE599",
    ["#1D3557","#457B9D","#A8DADC"],
    `<!-- Đêm trăng tròn ngàn sao huyền thoại -->
      <circle cx="390" cy="75" r="35" fill="#FFF1C5" stroke="#2C2016" stroke-width="3"/>
      <circle cx="100" cy="50" r="3" fill="#FFFDF9"/>
      <circle cx="180" cy="70" r="2.5" fill="#FFFDF9"/>`,
    `<!-- Ngọn đồi cỏ uốn lượn trong đêm thanh bình -->
      <path d="M8,220 Q180,180 320,220 Q420,250 492,230 L492,367 L8,367 Z" fill="#2A9D8F" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q220,230 492,260 L492,367 L8,367 Z" fill="#264653" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Cây ước nguyện nghìn năm với vô số lọ thủy tinh chứa đom đóm -->
      <g transform="translate(130, 70)">
        <!-- Thân cây cổ thụ xoắn cong nghệ thuật -->
        <path d="M90,180 C80,130 60,110 50,70 Q110,60 110,110 C120,130 140,150 150,180 Z" fill="#A0522D" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Tán lá bồng bềnh hồng tím như kẹo bông -->
        <circle cx="60" cy="50" r="45" fill="#F4ACB7" stroke="#2C2016" stroke-width="4"/>
        <circle cx="120" cy="40" r="50" fill="#FFCAD4" stroke="#2C2016" stroke-width="4"/>
        <circle cx="160" cy="65" r="40" fill="#DFCCF1" stroke="#2C2016" stroke-width="4"/>
        <circle cx="95" cy="20" r="42" fill="#FFE5D9" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Lọ thủy tinh đom đóm treo lủng lẳng -->
        <line x1="70" y1="85" x2="70" y2="115" stroke="#2C2016" stroke-width="2"/>
        <rect x="63" y="115" width="14" height="18" rx="4" fill="#FFF1C5" stroke="#2C2016" stroke-width="2"/>
        <line x1="140" y1="95" x2="140" y2="125" stroke="#2C2016" stroke-width="2"/>
        <rect x="133" y="125" width="14" height="18" rx="4" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Đom đóm bay tự do khắp bầu không khí -->
      <circle cx="90" cy="230" r="5" fill="#FFE599" stroke="#2C2016" stroke-width="1.5"/>
      <circle cx="340" cy="200" r="6" fill="#FFF1C5" stroke="#2C2016" stroke-width="1.5"/>
      <circle cx="430" cy="270" r="5" fill="#FFE599" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "fantasy-pastel-unicorn": makeScene(
    "fantasypastelunicorn",
    "Kỳ Lân Cầu Vồng Mộng Mơ",
    "🦄",
    "#FFCAD4",
    ["#FFF0F5","#E8D7F1","#BDE0FE"],
    `<!-- Cầu vồng mơ màng và sao chổi phép thuật -->
      <path d="M50,140 Q250,-10 450,140" fill="none" stroke="#FFCAD4" stroke-width="10" opacity="0.6"/>
      <path d="M50,150 Q250,0 450,150" fill="none" stroke="#FFF1C5" stroke-width="10" opacity="0.6"/>
      <path d="M50,160 Q250,10 450,160" fill="none" stroke="#BDE0FE" stroke-width="10" opacity="0.6"/>`,
    `<!-- Đồi hoa cỏ cầu vồng mềm mại -->
      <rect x="8" y="240" width="484" height="127" fill="#D8F3DC" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Chú kỳ lân trắng bờm cầu vồng và sừng xoắn vàng -->
      <g transform="translate(160, 95)">
        <!-- Thân ngựa trắng đáng yêu -->
        <ellipse cx="90" cy="115" rx="60" ry="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <path d="M45,115 L35,165 M75,125 L70,165 M115,125 L120,165 M140,115 L145,165" stroke="#2C2016" stroke-width="4" stroke-linecap="round"/>
        <!-- Cổ và đầu kỳ lân -->
        <path d="M120,95 Q135,45 155,50 Q165,85 140,110 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <circle cx="160" cy="55" r="22" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M152,58 Q158,64 164,58" stroke="#2C2016" stroke-width="3" fill="none"/>
        <ellipse cx="145" cy="65" rx="6" ry="4" fill="#FFCAD4"/>
        <!-- Chiếc sừng xoắn vàng thần kỳ -->
        <polygon points="160,35 180,-5 170,35" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <!-- Bờm tóc cầu vồng uốn lượn -->
        <path d="M140,30 Q110,40 120,65 Q105,75 115,95" stroke="#FFCAD4" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M140,30 Q110,40 120,65 Q105,75 115,95" stroke="#2C2016" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Đuôi xù bồng bềnh -->
        <path d="M35,100 Q10,120 20,145" stroke="#BDE0FE" stroke-width="10" fill="none" stroke-linecap="round"/>
      </g>`,
    `<!-- Ngôi sao nhỏ lấp lánh rơi trên bãi cỏ -->
      <polygon points="100,280 104,288 112,288 106,293 108,301 100,296 92,301 94,293 88,288 96,288" fill="#FFE599" stroke="#2C2016" stroke-width="1.5"/>
      <polygon points="390,270 393,276 400,276 395,280 397,286 390,282 383,286 385,280 380,276 387,276" fill="#FFCAD4" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "ocean-sea-turtle": makeScene(
    "oceanseaturtle",
    "Chú Rùa Biển Lướt Sóng",
    "🐢",
    "#52B788",
    ["#E0F2FE","#BDE0FE","#83C5BE"],
    `<!-- Ánh nắng khúc xạ xuyên qua làn nước trong vắt -->
      <polygon points="80,8 110,8 170,180 130,180" fill="#FFFDF9" opacity="0.25"/>
      <polygon points="220,8 250,8 320,180 280,180" fill="#FFFDF9" opacity="0.25"/>
      <polygon points="360,8 390,8 450,180 410,180" fill="#FFFDF9" opacity="0.25"/>`,
    `<!-- Đáy biển cát trắng và rạn san hô, rong biển đung đưa -->
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Khóm rong biển xanh uốn lượn -->
      <path d="M40,240 Q25,180 45,130 Q30,80 40,40" stroke="#52B788" stroke-width="7" fill="none" stroke-linecap="round"/>
      <path d="M450,240 Q470,180 445,130 Q465,80 450,40" stroke="#52B788" stroke-width="7" fill="none" stroke-linecap="round"/>`,
    `<!-- Chú rùa biển lướt êm đềm với mai rùa lục giác màu ngọc bích -->
      <g transform="translate(160, 110)">
        <!-- Mai rùa lớn bầu dục -->
        <ellipse cx="90" cy="80" rx="70" ry="50" fill="#74C69D" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Hoa văn mai rùa hình lục giác -->
        <polygon points="90,50 110,65 110,95 90,110 70,95 70,65" fill="#52B788" stroke="#2C2016" stroke-width="3"/>
        <polygon points="50,60 70,65 70,95 50,100 35,80" fill="#95D5B2" stroke="#2C2016" stroke-width="2.5"/>
        <polygon points="130,60 145,80 130,100 110,95 110,65" fill="#95D5B2" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Đầu rùa hiền lành vươn ra trước -->
        <ellipse cx="175" cy="80" rx="22" ry="16" fill="#B7E4C7" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="182" cy="76" r="4" fill="#2C2016"/>
        <circle cx="183" cy="75" r="1.5" fill="#FFFDF9"/>
        <!-- Hai vây chèo phía trước sải cánh dài -->
        <path d="M125,45 Q160,-5 200,10 Q160,35 125,55 Z" fill="#95D5B2" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M125,115 Q160,165 200,150 Q160,125 125,105 Z" fill="#95D5B2" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Hai chân chèo nhỏ phía sau -->
        <ellipse cx="30" cy="50" rx="18" ry="10" fill="#B7E4C7" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="30" cy="110" rx="18" ry="10" fill="#B7E4C7" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Chuỗi bọt khí nổi lên mặt nước -->
      <circle cx="340" cy="140" r="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="2" opacity="0.8"/>
      <circle cx="350" cy="110" r="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="2" opacity="0.8"/>
      <circle cx="345" cy="85" r="4" fill="#FFFDF9" stroke="#2C2016" stroke-width="1.5" opacity="0.8"/>`
  ),
  "ocean-lighthouse-dawn": makeScene(
    "oceanlighthousedawn",
    "Ngọn Hải Đăng Bình Minh",
    "🗼",
    "#E76F51",
    ["#F4A261","#E76F51","#264653"],
    `<!-- Mặt trời ban mai mọc rực rỡ và đàn hải âu bay lượn -->
      <circle cx="380" cy="110" r="45" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
      <path d="M100,50 Q115,40 130,50 Q145,40 160,50" fill="none" stroke="#2C2016" stroke-width="2.5"/>
      <path d="M140,80 Q150,72 160,80 Q170,72 180,80" fill="none" stroke="#2C2016" stroke-width="2"/>`,
    `<!-- Mỏm đá ngầm sừng sững đối diện đại dương cuộn sóng -->
      <path d="M8,367 L8,220 Q90,200 160,250 Q230,220 270,367 Z" fill="#6C757D" stroke="#2C2016" stroke-width="4"/>
      <rect x="180" y="270" width="312" height="97" fill="#457B9D" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Sóng bạc đầu vỗ bờ đá -->
      <path d="M180,280 Q250,265 320,280 Q390,265 492,280" stroke="#FFFDF9" stroke-width="4" fill="none"/>`,
    `<!-- Ngọn hải đăng sọc đỏ trắng hiên ngang phát luồng sáng vàng -->
      <g transform="translate(70, 70)">
        <!-- Tháp hải đăng hình chóp cụt -->
        <polygon points="50,60 70,60 85,210 35,210" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Các dải sọc đỏ tươi nổi bật -->
        <polygon points="45,95 75,95 79,135 41,135" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <polygon points="38,170 82,170 85,205 35,205" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Buồng đèn pha trên đỉnh và mái chóp đỏ -->
        <rect x="46" y="35" width="28" height="25" rx="3" fill="#FFF1C5" stroke="#2C2016" stroke-width="3.5"/>
        <polygon points="40,35 60,10 80,35" fill="#E63946" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Tia sáng rực rỡ từ hải đăng chiếu ra biển -->
        <polygon points="74,45 350,-10 350,90 74,50" fill="#FFE599" opacity="0.45"/>
      </g>`,
    `<!-- Lan can gỗ trên vách đá -->
      <line x1="30" y1="280" x2="140" y2="280" stroke="#2C2016" stroke-width="3"/>
      <line x1="50" y1="280" x2="50" y2="310" stroke="#2C2016" stroke-width="3"/>
      <line x1="120" y1="280" x2="120" y2="310" stroke="#2C2016" stroke-width="3"/>`
  ),
  "ocean-seashell-beach": makeScene(
    "oceanseashellbeach",
    "Vỏ Ốc Xà Cừ Cát Trắng",
    "🐚",
    "#F4A261",
    ["#E0F2FE","#BDE0FE","#FFE5D9"],
    `<!-- Bầu trời nhiệt đới trong xanh và mây trắng xa xăm -->
      <path d="M80,50 Q130,30 180,50 Q210,70 150,75 Z" fill="#FFFDF9" opacity="0.7"/>
      <path d="M300,40 Q350,20 400,40 Q430,60 370,65 Z" fill="#FFFDF9" opacity="0.7"/>`,
    `<!-- Bờ cát vàng thoai thoải và làn sóng biếc vỗ bờ -->
      <path d="M8,160 Q250,140 492,160 L492,367 L8,367 Z" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,180 Q250,165 492,180" stroke="#BDE0FE" stroke-width="8" fill="none"/>
      <path d="M8,183 Q250,168 492,183" stroke="#FFFDF9" stroke-width="4" fill="none"/>`,
    `<!-- Vỏ ốc xà cừ xoắn ốc khổng lồ chứa ngọc trai lấp lánh -->
      <g transform="translate(150, 140)">
        <!-- Vỏ sò xòe cánh quạt hồng ngọc trai -->
        <path d="M40,110 C20,30 180,30 160,110 Z" fill="#FFCAD4" stroke="#2C2016" stroke-width="4"/>
        <line x1="100" y1="110" x2="60" y2="40" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="100" y1="110" x2="85" y2="35" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="100" y1="110" x2="115" y2="35" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="100" y1="110" x2="140" y2="40" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Nắp sò dưới mở ra -->
        <ellipse cx="100" cy="115" rx="75" ry="30" fill="#FFE5D9" stroke="#2C2016" stroke-width="4"/>
        <!-- Viên ngọc trai tròn xoe phát sáng trắng muốt -->
        <circle cx="100" cy="110" r="22" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="94" cy="103" rx="6" ry="4" fill="#FFFFFF"/>
        <!-- Sao biển cam nằm cạnh -->
        <polygon points="190,120 197,135 212,135 200,144 204,158 190,150 176,158 180,144 168,135 183,135" fill="#E76F51" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Lâu đài cát nhỏ và dấu chân trên cát -->
      <g transform="translate(70, 270)">
        <rect x="10" y="20" width="35" height="30" fill="#E9C46A" stroke="#2C2016" stroke-width="2.5"/>
        <polygon points="5,20 27,0 50,20" fill="#E9C46A" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "ocean-dolphin-splash": makeScene(
    "oceandolphinsplash",
    "Cá Heo Nhảy Múa Dưới Nắng",
    "🐬",
    "#48CAE4",
    ["#CAF0F8","#90E0EF","#0077B6"],
    `<!-- Nắng vàng rạng rỡ và mây mùa hè -->
      <circle cx="100" cy="80" r="35" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
      <path d="M320,60 Q360,45 400,60 Q430,75 380,80 Z" fill="#FFFDF9" opacity="0.8"/>`,
    `<!-- Đại dương xanh thẳm với những con sóng bạc đầu dâng cao -->
      <rect x="8" y="210" width="484" height="157" fill="#0096C7" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,230 Q70,190 130,230 Q190,270 260,220 Q330,170 400,220 Q450,260 492,230" fill="none" stroke="#FFFDF9" stroke-width="5"/>`,
    `<!-- Chú cá heo bóng bẩy nhảy vút lên khỏi mặt nước uốn cong hình cung -->
      <g transform="translate(150, 70)">
        <!-- Thân cá heo cong vút xanh ngọc -->
        <path d="M20,130 C40,40 140,20 180,70 C190,85 180,105 150,110 C100,120 50,135 20,130 Z" fill="#48CAE4" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Bụng cá heo màu trắng bạc -->
        <path d="M50,125 C80,110 130,100 150,110 C130,118 80,128 50,125 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        <!-- Mỏ cá heo mỉm cười và mắt tròn -->
        <path d="M180,70 Q195,78 185,85" stroke="#2C2016" stroke-width="3.5" fill="none"/>
        <circle cx="165" cy="68" r="4" fill="#2C2016"/>
        <circle cx="166" cy="67" r="1.5" fill="#FFFDF9"/>
        <!-- Vây lưng nhô cao -->
        <path d="M95,40 Q110,15 125,35 Z" fill="#0077B6" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Vây ngực rẽ sóng -->
        <path d="M120,95 Q135,120 150,105 Z" fill="#0077B6" stroke="#2C2016" stroke-width="3"/>
        <!-- Đuôi xòe quạt hai thùy -->
        <path d="M25,130 L-5,110 L5,132 L-5,150 Z" fill="#0077B6" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Tia nước bắn tung tóe quanh chú cá heo -->
      <circle cx="160" cy="190" r="5" fill="#CAF0F8" stroke="#2C2016" stroke-width="2"/>
      <circle cx="180" cy="180" r="7" fill="#CAF0F8" stroke="#2C2016" stroke-width="2"/>
      <circle cx="340" cy="200" r="6" fill="#CAF0F8" stroke="#2C2016" stroke-width="2"/>`
  ),
  "ocean-sunken-city": makeScene(
    "oceansunkencity",
    "Thành Phố Đáy Biển Atlantis",
    "🏛️",
    "#0096C7",
    ["#03045E","#023E8A","#0077B6"],
    `<!-- Vực thẳm đại dương huyền bí với luồng ánh sáng thần thoại -->
      <polygon points="150,8 180,8 240,240 200,240" fill="#90E0EF" opacity="0.3"/>
      <polygon points="300,8 330,8 390,240 350,240" fill="#90E0EF" opacity="0.3"/>`,
    `<!-- Đáy đại dương với những bậc thềm đá cẩm thạch phủ rong rêu -->
      <rect x="8" y="240" width="484" height="127" fill="#0077B6" stroke="#2C2016" stroke-width="3.5"/>
      <rect x="50" y="270" width="400" height="20" rx="4" fill="#EBDDD4" stroke="#2C2016" stroke-width="3"/>
      <rect x="90" y="290" width="320" height="25" rx="4" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Đền thờ Atlantis cổ kính với cột La Mã và cổng vòm tráng lệ -->
      <g transform="translate(130, 80)">
        <!-- Mái đền tam giác cẩm thạch chạm khắc -->
        <polygon points="120,25 20,70 220,70" fill="#EBDDD4" stroke="#2C2016" stroke-width="4.5"/>
        <rect x="30" y="70" width="180" height="15" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
        <!-- 4 cột trụ cổ điển Corinthian -->
        <rect x="40" y="85" width="20" height="110" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <rect x="85" y="85" width="20" height="110" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <rect x="135" y="85" width="20" height="110" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <rect x="180" y="85" width="20" height="110" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Viên ngọc bích phát quang trên đỉnh đền -->
        <circle cx="120" cy="25" r="14" fill="#48CAE4" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Đàn cá phát sáng bơi qua cột đền và rương kho báu -->
      <g transform="translate(360, 260)">
        <rect x="10" y="15" width="45" height="30" rx="5" fill="#E76F51" stroke="#2C2016" stroke-width="3"/>
        <circle cx="32" cy="30" r="5" fill="#FFE599"/>
      </g>
      <ellipse cx="90" cy="230" rx="12" ry="5" fill="#FFE599" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "cafe-butter-cookies": makeScene(
    "cafebuttercookies",
    "Bánh Quy Bơ & Trà Anh Quốc",
    "🍪",
    "#DDA15E",
    ["#FFFDF9","#FFE5D9","#DDBEA9"],
    `<!-- Giấy dán tường hoa nhí vintage ấm cúng và rèm ren -->
      <circle cx="80" cy="50" r="4" fill="#FFCAD4"/>
      <circle cx="160" cy="40" r="4" fill="#FFCAD4"/>
      <circle cx="340" cy="45" r="4" fill="#FFCAD4"/>
      <circle cx="420" cy="55" r="4" fill="#FFCAD4"/>`,
    `<!-- Mặt bàn trà gỗ ấm áp với khăn lót ren thêu trắng -->
      <rect x="8" y="220" width="484" height="147" fill="#BC6C25" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="270" rx="190" ry="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="270" rx="175" ry="38" fill="none" stroke="#2C2016" stroke-width="1.5" stroke-dasharray="6,4"/>`,
    `<!-- Tách trà sứ hoa hồng bốc khói và đĩa bánh quy bơ thơm lừng -->
      <g transform="translate(130, 110)">
        <!-- Đĩa bánh sứ viền sóng -->
        <ellipse cx="180" cy="120" rx="65" ry="25" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Bánh quy bơ xoắn ốc kiểu Đan Mạch -->
        <circle cx="160" cy="110" r="16" fill="#DDA15E" stroke="#2C2016" stroke-width="3"/>
        <circle cx="160" cy="110" r="6" fill="#BC6C25"/>
        <!-- Bánh quy kẹo mứt dâu đỏ (Linzer cookie) -->
        <circle cx="195" cy="112" r="15" fill="#DDA15E" stroke="#2C2016" stroke-width="3"/>
        <circle cx="195" cy="112" r="6" fill="#E63946"/>
        <!-- Tách trà sứ Anh quốc thanh lịch -->
        <ellipse cx="70" cy="130" rx="45" ry="14" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <path d="M35,115 C35,145 105,145 105,115 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="70" cy="115" rx="35" ry="10" fill="#DDA15E" stroke="#2C2016" stroke-width="2"/>
        <!-- Quai tách trà tròn -->
        <path d="M105,120 Q122,125 105,135" stroke="#2C2016" stroke-width="3.5" fill="none"/>
        <!-- Làn khói trà thơm uốn lượn -->
        <path d="M65,100 Q60,75 75,55 Q65,35 70,15" stroke="#DDBEA9" stroke-width="3" fill="none" stroke-linecap="round"/>
      </g>`,
    `<!-- Thìa bạc cổ điển và viên đường nâu -->
      <line x1="80" y1="290" x2="140" y2="280" stroke="#2C2016" stroke-width="3" stroke-linecap="round"/>
      <rect x="360" y="270" width="16" height="14" rx="3" fill="#DDA15E" stroke="#2C2016" stroke-width="2"/>`
  ),
  "cafe-antique-bookshop": makeScene(
    "cafeantiquebookshop",
    "Cà Phê Sách Cổ Nằm Trong Ngõ",
    "📖",
    "#A0522D",
    ["#EBDDD4","#DDBEA9","#BC6C25"],
    `<!-- Kệ sách gỗ kịch trần với vô vàn cuốn sách bìa da màu sắc -->
      <rect x="30" y="20" width="440" height="180" fill="#8B5A2B" stroke="#2C2016" stroke-width="4"/>
      <line x1="30" y1="75" x2="470" y2="75" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="30" y1="130" x2="470" y2="130" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Các cuốn sách xếp hàng trên kệ -->
      <rect x="50" y="30" width="18" height="45" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
      <rect x="70" y="25" width="22" height="50" fill="#457B9D" stroke="#2C2016" stroke-width="2"/>
      <rect x="94" y="32" width="16" height="43" fill="#2A9D8F" stroke="#2C2016" stroke-width="2"/>
      <rect x="112" y="28" width="24" height="47" fill="#E9C46A" stroke="#2C2016" stroke-width="2"/>
      <rect x="250" y="85" width="20" height="45" fill="#9C6644" stroke="#2C2016" stroke-width="2"/>
      <rect x="272" y="80" width="24" height="50" fill="#6B705C" stroke="#2C2016" stroke-width="2"/>
      <rect x="298" y="88" width="18" height="42" fill="#DDBEA9" stroke="#2C2016" stroke-width="2"/>`,
    `<!-- Sàn gỗ parquet ấm áp và góc đọc sách cổ điển -->
      <rect x="8" y="220" width="484" height="147" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="170" ry="42" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Bàn tròn với sách mở, kính lão và tách cà phê thơm -->
      <g transform="translate(160, 160)">
        <ellipse cx="90" cy="80" rx="75" ry="25" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Cuốn sách đang mở trang -->
        <path d="M45,70 Q70,75 90,68 Q110,75 135,70 L135,90 Q110,95 90,88 Q70,95 45,90 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <line x1="90" y1="68" x2="90" y2="88" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Kính mắt gọng tròn đặt trên trang sách -->
        <circle cx="75" cy="74" r="8" fill="none" stroke="#2C2016" stroke-width="2"/>
        <circle cx="105" cy="74" r="8" fill="none" stroke="#2C2016" stroke-width="2"/>
        <line x1="83" y1="74" x2="97" y2="74" stroke="#2C2016" stroke-width="2"/>
        <!-- Ly cà phê nhỏ có tim bọt sữa -->
        <ellipse cx="145" cy="65" rx="14" ry="7" fill="#6F4E37" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Chồng sách cũ buộc dây thừng mộc mạc bên chân bàn -->
      <g transform="translate(70, 260)">
        <rect x="10" y="25" width="45" height="12" rx="3" fill="#7F4F24" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="14" y="14" width="40" height="12" rx="3" fill="#A68A64" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "cafe-marshmallow-cocoa": makeScene(
    "cafemarshmallowcocoa",
    "Cacao Nóng Kẹo Marshmallow",
    "☕",
    "#6F4E37",
    ["#D8E2DC","#FFE5D9","#FFCAD4"],
    `<!-- Ô cửa sổ ngày đông tuyết rơi ấm cúng -->
      <line x1="8" y1="120" x2="492" y2="120" stroke="#2C2016" stroke-width="3" opacity="0.4"/>
      <circle cx="100" cy="50" r="3" fill="#FFFDF9"/>
      <circle cx="200" cy="70" r="3" fill="#FFFDF9"/>
      <circle cx="350" cy="40" r="3" fill="#FFFDF9"/>`,
    `<!-- Bệ cửa sổ gỗ với khăn len đan dệt ấm áp -->
      <rect x="8" y="230" width="484" height="137" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M40,250 Q250,220 460,250" stroke="#E63946" stroke-width="12" fill="none" stroke-linecap="round"/>`,
    `<!-- Ly gốm cacao nóng đầy ụ kẹo dẻo marshmallow trắng béo -->
      <g transform="translate(170, 110)">
        <!-- Thân ly gốm tròn to có áo len đan cáp -->
        <rect x="35" y="45" width="90" height="95" rx="15" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <line x1="60" y1="45" x2="60" y2="140" stroke="#FFFDF9" stroke-width="3" stroke-dasharray="6,4"/>
        <line x1="100" y1="45" x2="100" y2="140" stroke="#FFFDF9" stroke-width="3" stroke-dasharray="6,4"/>
        <!-- Quai ly to dễ thương -->
        <path d="M125,60 Q155,75 125,120" stroke="#2C2016" stroke-width="4.5" fill="none"/>
        <!-- Miệng ly với cacao sô cô la đậm đà -->
        <ellipse cx="80" cy="45" rx="45" ry="12" fill="#582F0E" stroke="#2C2016" stroke-width="3"/>
        <!-- 3 viên kẹo marshmallow bồng bềnh trên mặt -->
        <rect x="55" y="25" width="22" height="18" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="80" y="20" width="24" height="20" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="68" y="10" width="20" height="18" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Thanh quế cuộn cắm trong ly -->
        <line x1="105" y1="10" x2="90" y2="50" stroke="#7F4F24" stroke-width="6" stroke-linecap="round"/>
        <line x1="105" y1="10" x2="90" y2="50" stroke="#2C2016" stroke-width="2" stroke-linecap="round"/>
      </g>`,
    `<!-- Kẹo marshmallow rơi và vụn sô-cô-la rắc -->
      <rect x="130" y="270" width="16" height="14" rx="4" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      <circle cx="340" cy="265" r="4" fill="#582F0E"/>
      <circle cx="355" cy="272" r="3" fill="#582F0E"/>`
  ),
  "cafe-chamomile-honey": makeScene(
    "cafechamomilehoney",
    "Trà Hoa Cúc Mật Ong",
    "🌼",
    "#E9C46A",
    ["#FEFAE0","#FAEDCD","#D4A373"],
    `<!-- Nắng sớm sân vườn rực rỡ và những bông cúc bay lơ lửng -->
      <circle cx="80" cy="60" r="30" fill="#FFF1C5" opacity="0.7"/>
      <circle cx="380" cy="50" r="12" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      <circle cx="380" cy="50" r="5" fill="#E9C46A"/>`,
    `<!-- Bàn gỗ mộc bên hiên vườn đầy nắng -->
      <rect x="8" y="230" width="484" height="137" fill="#E9EDC9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="270" rx="180" ry="40" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Ấm trà thủy tinh trong veo thấy hoa cúc và hũ mật ong vàng óng -->
      <g transform="translate(130, 110)">
        <!-- Bình trà thủy tinh tròn xoe -->
        <circle cx="80" cy="90" r="48" fill="#FFF1C5" stroke="#2C2016" stroke-width="4" opacity="0.9"/>
        <!-- Nắp bình sứ và núm cầm -->
        <ellipse cx="80" cy="45" rx="30" ry="8" fill="#CCD5AE" stroke="#2C2016" stroke-width="3"/>
        <circle cx="80" cy="38" r="6" fill="#CCD5AE" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Vòi ấm trà thanh thoát -->
        <path d="M35,80 Q10,75 25,60" stroke="#2C2016" stroke-width="4" fill="none"/>
        <path d="M125,75 Q150,90 125,115" stroke="#2C2016" stroke-width="4" fill="none"/>
        <!-- Hoa cúc vàng bơi trong bình trà -->
        <circle cx="80" cy="90" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        <circle cx="80" cy="90" r="4" fill="#E9C46A"/>
        <!-- Hũ mật ong thủy tinh bên cạnh với muỗng khuấy gỗ -->
        <g transform="translate(145, 45)">
          <path d="M15,40 L65,40 L60,85 L20,85 Z" fill="#E9C46A" stroke="#2C2016" stroke-width="3.5"/>
          <ellipse cx="40" cy="40" rx="25" ry="7" fill="#D4A373" stroke="#2C2016" stroke-width="2.5"/>
          <!-- Cây lấy mật ong bằng gỗ -->
          <line x1="40" y1="15" x2="40" y2="60" stroke="#7F4F24" stroke-width="4"/>
          <circle cx="40" cy="50" r="8" fill="#D4A373" stroke="#2C2016" stroke-width="2"/>
        </g>
      </g>`,
    `<!-- Lát chanh vàng tươi mát và bông cúc rơi -->
      <circle cx="90" cy="275" r="14" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="380" cy="265" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      <circle cx="380" cy="265" r="4" fill="#E9C46A"/>`
  ),
  "cafe-croissant-morning": makeScene(
    "cafecroissantmorning",
    "Bánh Sừng Bò & Nắng Sớm",
    "🥐",
    "#DDA15E",
    ["#FFF1C5","#FFE5D9","#FDE2E4"],
    `<!-- Nắng sớm Paris và tháp Eiffel mờ ảo xa xa -->
      <polygon points="120,30 115,140 125,140" fill="#DDBEA9" opacity="0.5"/>
      <path d="M280,40 Q320,25 360,40 Q390,55 340,60 Z" fill="#FFFDF9" opacity="0.7"/>`,
    `<!-- Bàn cafe đá cẩm thạch trắng thanh lịch -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="190" ry="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chiếc bánh sừng bò vàng ươm nhiều lớp thơm giòn béo ngậy -->
      <g transform="translate(140, 120)">
        <!-- Đĩa sứ viền vàng -->
        <ellipse cx="110" cy="115" rx="95" ry="32" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="110" cy="115" rx="80" ry="24" fill="none" stroke="#FFE599" stroke-width="2"/>
        <!-- Bánh croissant hình lưỡi liềm vàng rộm -->
        <path d="M35,115 C50,75 170,75 185,115 C150,135 70,135 35,115 Z" fill="#DDA15E" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Các nếp cuộn giòn tan của bánh sừng bò -->
        <path d="M85,85 C95,125 100,125 110,80" stroke="#BC6C25" stroke-width="3.5" fill="none"/>
        <path d="M125,85 C135,125 140,125 150,85" stroke="#BC6C25" stroke-width="3.5" fill="none"/>
        <path d="M55,100 C70,120 75,120 80,95" stroke="#BC6C25" stroke-width="3" fill="none"/>
        <!-- Hũ mứt dâu đỏ nhỏ bên cạnh -->
        <g transform="translate(180, 70)">
          <rect x="10" y="20" width="30" height="28" rx="4" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
          <ellipse cx="25" cy="20" rx="17" ry="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        </g>
      </g>`,
    `<!-- Vụn bánh giòn tan rơi trên đĩa -->
      <circle cx="160" cy="270" r="3" fill="#DDA15E"/>
      <circle cx="280" cy="280" r="2.5" fill="#DDA15E"/>
      <circle cx="320" cy="265" r="3.5" fill="#DDA15E"/>`
  ),
  "sweet-rainbow-macaron": makeScene(
    "sweetrainbowmacaron",
    "Tháp Bánh Macaron Bảy Màu",
    "🧁",
    "#F4ACB7",
    ["#FFF0F5","#FDE2E4","#E8D7F1"],
    `<!-- Cờ đuôi nheo tiệm bánh ngọt ngào -->
      <path d="M20,30 Q250,80 480,30" stroke="#2C2016" stroke-width="2.5" fill="none"/>
      <polygon points="60,37 80,39 70,65" fill="#FFCAD4" stroke="#2C2016" stroke-width="1.5"/>
      <polygon points="120,45 140,48 130,73" fill="#BDE0FE" stroke="#2C2016" stroke-width="1.5"/>
      <polygon points="180,51 200,53 190,79" fill="#D8F3DC" stroke="#2C2016" stroke-width="1.5"/>
      <polygon points="240,54 260,54 250,80" fill="#FFF1C5" stroke="#2C2016" stroke-width="1.5"/>
      <polygon points="300,53 320,51 310,79" fill="#E8D7F1" stroke="#2C2016" stroke-width="1.5"/>
      <polygon points="360,48 380,45 370,73" fill="#FFCCD5" stroke="#2C2016" stroke-width="1.5"/>`,
    `<!-- Quầy bánh kính sang trọng và chân tháp bạc -->
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="160" ry="35" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Tháp macaron 4 tầng màu pastel xếp hình chóp nón tuyệt đẹp -->
      <g transform="translate(170, 75)">
        <!-- Tầng 4 (đáy): Macaron xanh bạc hà -->
        <g transform="translate(0, 130)">
          <ellipse cx="80" cy="20" rx="65" ry="16" fill="#B7E4C7" stroke="#2C2016" stroke-width="3.5"/>
          <ellipse cx="80" cy="14" rx="60" ry="12" fill="#D8F3DC"/>
        </g>
        <!-- Tầng 3: Macaron vàng chanh chanh sả -->
        <g transform="translate(10, 95)">
          <ellipse cx="70" cy="20" rx="52" ry="14" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>
          <ellipse cx="70" cy="14" rx="48" ry="10" fill="#FFF1C5"/>
        </g>
        <!-- Tầng 2: Macaron dâu tây má hồng -->
        <g transform="translate(20, 60)">
          <ellipse cx="60" cy="20" rx="40" ry="12" fill="#FFCAD4" stroke="#2C2016" stroke-width="3.5"/>
          <ellipse cx="60" cy="14" rx="36" ry="9" fill="#FFCCD5"/>
        </g>
        <!-- Tầng 1 (đỉnh): Macaron oải hương tím mộng mơ -->
        <g transform="translate(30, 25)">
          <ellipse cx="50" cy="20" rx="28" ry="10" fill="#C7B9FF" stroke="#2C2016" stroke-width="3.5"/>
          <ellipse cx="50" cy="14" rx="25" ry="8" fill="#DFCCF1"/>
        </g>
      </g>`,
    `<!-- Chiếc nơ ruy băng satin hồng đính chân tháp -->
      <g transform="translate(225, 255)">
        <circle cx="25" cy="15" r="8" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>
        <path d="M25,15 L0,5 Q5,25 25,15" fill="#FFCAD4" stroke="#2C2016" stroke-width="2"/>
        <path d="M25,15 L50,5 Q45,25 25,15" fill="#FFCAD4" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "sweet-fluffy-pancake": makeScene(
    "sweetfluffypancake",
    "Bánh Pancake Bồng Bềnh Rót Mật",
    "🥞",
    "#F4A261",
    ["#FFFDF9","#FFE5D9","#FFF1C5"],
    `<!-- Căn bếp thơm mùi bánh nướng ban mai -->
      <circle cx="100" cy="60" r="4" fill="#FFCCD5"/>
      <circle cx="400" cy="50" r="4" fill="#BDE0FE"/>`,
    `<!-- Bàn ăn gỗ ấm cúng với khăn ca-rô vàng cam -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="190" ry="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Ba tầng bánh pancake bông xốp soufflé rót mật ong óng ả -->
      <g transform="translate(140, 100)">
        <!-- Bánh 1 (dưới cùng) -->
        <ellipse cx="110" cy="125" rx="90" ry="25" fill="#F4A261" stroke="#2C2016" stroke-width="4"/>
        <ellipse cx="110" cy="115" rx="85" ry="20" fill="#FFE599"/>
        <!-- Bánh 2 (ở giữa) -->
        <ellipse cx="110" cy="95" rx="85" ry="24" fill="#F4A261" stroke="#2C2016" stroke-width="4"/>
        <ellipse cx="110" cy="85" rx="80" ry="19" fill="#FFE599"/>
        <!-- Bánh 3 (trên cùng) -->
        <ellipse cx="110" cy="65" rx="80" ry="22" fill="#F4A261" stroke="#2C2016" stroke-width="4"/>
        <ellipse cx="110" cy="55" rx="75" ry="18" fill="#FFE599"/>
        <!-- Miếng bơ vuông tan chảy trên đỉnh -->
        <polygon points="100,45 125,40 120,55 95,60" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <!-- Dòng mật ong vàng óng chảy tràn qua từng tầng bánh -->
        <path d="M110,55 Q115,75 105,95 Q118,115 108,135" stroke="#E76F51" stroke-width="7" fill="none" stroke-linecap="round"/>
        <path d="M80,65 Q75,85 85,115" stroke="#E76F51" stroke-width="6" fill="none" stroke-linecap="round"/>
        <!-- Quả việt quất và dâu tây trang trí -->
        <circle cx="65" cy="55" r="8" fill="#457B9D" stroke="#2C2016" stroke-width="2"/>
        <circle cx="150" cy="60" r="8" fill="#457B9D" stroke="#2C2016" stroke-width="2"/>
        <circle cx="135" cy="50" r="10" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Nĩa bạc và siro ngọt ngào -->
      <line x1="80" y1="260" x2="110" y2="300" stroke="#2C2016" stroke-width="3" stroke-linecap="round"/>`
  ),
  "sweet-rainbow-icecream": makeScene(
    "sweetrainbowicecream",
    "Kem Ốc Quế Cầu Vồng Mùa Hạ",
    "🍦",
    "#FFCAD4",
    ["#E0F2FE","#FFD1DC","#FFF1C5"],
    `<!-- Nắng biển rực rỡ và những đám mây ngũ sắc vui tươi -->
      <circle cx="90" cy="70" r="35" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
      <path d="M330,60 Q370,40 410,60 Q440,75 390,80 Z" fill="#FFFDF9" opacity="0.8"/>`,
    `<!-- Bờ biển mùa hè với quầy bán kem rực rỡ sắc màu -->
      <rect x="8" y="240" width="484" height="127" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q250,245 492,260" stroke="#BDE0FE" stroke-width="6" fill="none"/>`,
    `<!-- Chiếc kem ốc quế 3 viên khổng lồ: dâu, bạc hà, xoài có phủ cốm bảy màu -->
      <g transform="translate(180, 80)">
        <!-- Vỏ ốc quế giòn đan hoa văn ca-rô vàng cam -->
        <polygon points="70,120 40,210 100,120" fill="#DDA15E" stroke="#2C2016" stroke-width="4"/>
        <line x1="55" y1="160" x2="85" y2="135" stroke="#BC6C25" stroke-width="2"/>
        <line x1="48" y1="185" x2="78" y2="160" stroke="#BC6C25" stroke-width="2"/>
        <!-- Viên kem 1 (dưới): Bạc hà xanh mát -->
        <circle cx="70" cy="115" r="35" fill="#B7E4C7" stroke="#2C2016" stroke-width="4"/>
        <!-- Viên kem 2 (giữa): Xoài vàng ngọt lịm -->
        <circle cx="70" cy="75" r="32" fill="#FFE599" stroke="#2C2016" stroke-width="4"/>
        <!-- Viên kem 3 (trên): Dâu hồng phớt -->
        <circle cx="70" cy="35" r="28" fill="#FFCAD4" stroke="#2C2016" stroke-width="4"/>
        <!-- Quả anh đào đỏ mọng có cuống cắm trên đỉnh -->
        <circle cx="70" cy="10" r="10" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <path d="M70,10 Q85,-5 75,-15" stroke="#2C2016" stroke-width="2.5" fill="none"/>
        <!-- Cốm cầu vồng rắc xinh xắn -->
        <rect x="58" y="32" width="6" height="2.5" rx="1" fill="#457B9D"/>
        <rect x="75" y="40" width="6" height="2.5" rx="1" fill="#E76F51"/>
        <rect x="62" y="70" width="6" height="2.5" rx="1" fill="#E63946"/>
        <rect x="80" y="80" width="6" height="2.5" rx="1" fill="#2A9D8F"/>
      </g>`,
    `<!-- Giọt kem mát lạnh tan chảy rơi xuống -->
      <circle cx="230" cy="225" r="4" fill="#B7E4C7" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "sweet-cream-puff": makeScene(
    "sweetcreampuff",
    "Bánh Su Kem Nhân Vani Béo",
    "🥮",
    "#F4A261",
    ["#FFFDF9","#FFE5D9","#DDBEA9"],
    `<!-- Bếp bánh thơm lừng mùi vani nướng -->
      <circle cx="120" cy="60" r="3" fill="#DDBEA9"/>
      <circle cx="360" cy="70" r="3" fill="#DDBEA9"/>`,
    `<!-- Đĩa gốm tròn và khăn trải bàn kẻ sọc -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="40" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Bộ ba bánh su kem Choux puff rắc đường bột trắng xốp -->
      <g transform="translate(140, 110)">
        <!-- Bánh su lớn ở giữa cắt đôi tràn ngập kem vani -->
        <ellipse cx="110" cy="110" rx="45" ry="25" fill="#DDA15E" stroke="#2C2016" stroke-width="4"/>
        <!-- Lớp kem bơ vani trắng bồng bềnh tràn ra -->
        <ellipse cx="110" cy="98" rx="42" ry="16" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Nắp bánh su phủ đường tuyết -->
        <ellipse cx="110" cy="85" rx="38" ry="20" fill="#DDA15E" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="105" cy="80" r="2" fill="#FFFDF9"/>
        <circle cx="115" cy="82" r="2" fill="#FFFDF9"/>
        <!-- Bánh su nhỏ bên trái -->
        <circle cx="45" cy="115" r="28" fill="#DDA15E" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="45" cy="110" r="10" fill="#FFFDF9" opacity="0.6"/>
        <!-- Bánh su nhỏ bên phải -->
        <circle cx="175" cy="115" r="28" fill="#DDA15E" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="175" cy="110" r="10" fill="#FFFDF9" opacity="0.6"/>
      </g>`,
    `<!-- Đường tuyết rắc lấm tấm xung quanh đĩa -->
      <circle cx="210" cy="265" r="2" fill="#FFFDF9"/>
      <circle cx="290" cy="270" r="2" fill="#FFFDF9"/>`
  ),
  "sweet-gingerbread-man": makeScene(
    "sweetgingerbreadman",
    "Bánh Quy Gừng Giáng Sinh",
    "🍪",
    "#BC6C25",
    ["#1D3557","#457B9D","#E63946"],
    `<!-- Đêm Giáng Sinh lung linh với hoa tuyết và đèn dây -->
      <circle cx="80" cy="50" r="6" fill="#FFE599"/>
      <circle cx="160" cy="45" r="6" fill="#E63946"/>
      <circle cx="340" cy="45" r="6" fill="#2A9D8F"/>
      <circle cx="420" cy="50" r="6" fill="#FFE599"/>`,
    `<!-- Khay nướng bánh ấm áp rải bột đường trắng -->
      <rect x="8" y="230" width="484" height="137" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>
      <rect x="40" y="240" width="420" height="110" rx="8" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Chú người bánh gừng nụ cười đường trắng và nút áo kẹo đỏ -->
      <g transform="translate(180, 95)">
        <!-- Đầu tròn bánh gừng nâu -->
        <circle cx="70" cy="45" r="32" fill="#BC6C25" stroke="#2C2016" stroke-width="4"/>
        <circle cx="60" cy="42" r="4" fill="#2C2016"/>
        <circle cx="80" cy="42" r="4" fill="#2C2016"/>
        <path d="M60,55 Q70,65 80,55" stroke="#FFFDF9" stroke-width="3.5" fill="none" stroke-linecap="round"/>
        <!-- Thân và tay chân bánh gừng -->
        <rect x="52" y="75" width="36" height="55" rx="10" fill="#BC6C25" stroke="#2C2016" stroke-width="4"/>
        <!-- Hai tay giang rộng thân thiện -->
        <path d="M52,85 L15,100 M88,85 L125,100" stroke="#BC6C25" stroke-width="18" stroke-linecap="round"/>
        <path d="M52,85 L15,100 M88,85 L125,100" stroke="#2C2016" stroke-width="4" stroke-linecap="round"/>
        <!-- Hai chân đứng vững chãi -->
        <path d="M56,130 L45,170 M84,130 L95,170" stroke="#BC6C25" stroke-width="18" stroke-linecap="round"/>
        <path d="M56,130 L45,170 M84,130 L95,170" stroke="#2C2016" stroke-width="4" stroke-linecap="round"/>
        <!-- Nơ cổ đỏ và nút áo kẹo kẹo bông -->
        <polygon points="62,75 78,75 70,82" fill="#E63946"/>
        <circle cx="70" cy="95" r="5" fill="#E63946"/>
        <circle cx="70" cy="112" r="5" fill="#2A9D8F"/>
        <!-- Viền kem trắng gợn sóng ở cổ tay và cổ chân -->
        <path d="M18,97 Q25,100 22,105" stroke="#FFFDF9" stroke-width="3" fill="none"/>
        <path d="M118,97 Q125,100 122,105" stroke="#FFFDF9" stroke-width="3" fill="none"/>
      </g>`,
    `<!-- Kẹo gậy sọc đỏ trắng Giáng sinh -->
      <g transform="translate(100, 260)">
        <path d="M15,40 L15,15 A12,12 0 0 1 35,15" stroke="#E63946" stroke-width="7" fill="none"/>
        <path d="M15,40 L15,15 A12,12 0 0 1 35,15" stroke="#FFFDF9" stroke-width="3" stroke-dasharray="4,4" fill="none"/>
      </g>`
  ),
  "season-spring-breeze": makeScene(
    "seasonspringbreeze",
    "Gió Xuân Trăm Hoa Đua Nở",
    "🌸",
    "#F4ACB7",
    ["#E0F2FE","#FFF0F5","#D8F3DC"],
    `<!-- Bầu trời mùa xuân trong xanh và chim én chao lượn -->
      <path d="M120,50 Q135,40 150,50 Q165,40 180,50" fill="none" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="80" cy="70" r="28" fill="#FFF1C5" opacity="0.6"/>`,
    `<!-- Thảm cỏ xanh mơn mởn đầy hoa dại mùa xuân -->
      <path d="M8,210 Q250,180 492,210 L492,367 L8,367 Z" fill="#95D5B2" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q200,230 492,260 L492,367 L8,367 Z" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Nhà chòi lục giác gỗ quấn đầy hoa tử đằng tím và hoa hồng xuân -->
      <g transform="translate(160, 90)">
        <polygon points="90,15 20,65 160,65" fill="#DDBEA9" stroke="#2C2016" stroke-width="4"/>
        <rect x="35" y="65" width="110" height="95" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="55" y1="65" x2="55" y2="160" stroke="#2C2016" stroke-width="3"/>
        <line x1="125" y1="65" x2="125" y2="160" stroke="#2C2016" stroke-width="3"/>
        <!-- Dây leo hoa tử đằng rủ buông mộng mơ -->
        <circle cx="45" cy="75" r="12" fill="#C7B9FF" stroke="#2C2016" stroke-width="2"/>
        <circle cx="40" cy="95" r="9" fill="#DFCCF1" stroke="#2C2016" stroke-width="2"/>
        <circle cx="135" cy="75" r="12" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>
        <circle cx="140" cy="95" r="9" fill="#FFCAD4" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Cánh hoa anh đào bay lượn theo ngọn gió xuân -->
      <ellipse cx="90" cy="260" rx="8" ry="5" fill="#FFCAD4" stroke="#2C2016" stroke-width="1.5"/>
      <ellipse cx="380" cy="270" rx="7" ry="4" fill="#FFCCD5" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "season-summer-beach": makeScene(
    "seasonsummerbeach",
    "Nắng Hạ Rực Rỡ Bờ Cát",
    "🏖️",
    "#F4A261",
    ["#CAF0F8","#90E0EF","#FFE5D9"],
    `<!-- Nắng hè chói chang và mây bồng bềnh -->
      <circle cx="390" cy="80" r="38" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="390" y1="35" x2="390" y2="20" stroke="#F4A261" stroke-width="3.5"/>
      <line x1="435" y1="80" x2="450" y2="80" stroke="#F4A261" stroke-width="3.5"/>`,
    `<!-- Biển xanh ngắt và bãi cát vàng trải dài -->
      <rect x="8" y="170" width="484" height="60" fill="#0096C7" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,210 Q250,195 492,210 L492,367 L8,367 Z" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Dù che nắng sọc đỏ trắng và ghế nằm bãi biển thư thái -->
      <g transform="translate(150, 100)">
        <!-- Dù che nắng bãi biển xòe rộng -->
        <path d="M20,70 Q100,-15 180,70 Z" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <line x1="100" y1="70" x2="100" y2="180" stroke="#2C2016" stroke-width="4.5"/>
        <path d="M60,65 Q100,5 140,65" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Ghế tựa gấp bãi biển màu xanh ngọc -->
        <path d="M90,140 L160,140 L190,175 L80,175 Z" fill="#2A9D8F" stroke="#2C2016" stroke-width="3"/>
        <!-- Trái dừa tươi cắm ống hút cạnh ghế -->
        <circle cx="70" cy="170" r="14" fill="#8B5A2B" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="70" y1="160" x2="80" y2="145" stroke="#E63946" stroke-width="2.5"/>
      </g>`,
    `<!-- Sao biển và bóng bãi biển sọc màu -->
      <circle cx="90" cy="290" r="18" fill="#E76F51" stroke="#2C2016" stroke-width="2.5"/>`
  ),
  "season-autumn-maple": makeScene(
    "seasonautumnmaple",
    "Rừng Phong Thu Đỏ Rực",
    "🍁",
    "#E76F51",
    ["#FFE5D9","#F4A261","#E76F51"],
    `<!-- Lá phong đỏ và vàng bay ngập trời thu -->
      <g transform="translate(100, 50)">
        <polygon points="15,0 18,10 28,8 20,15 25,25 15,20 5,25 10,15 2,8 12,10" fill="#E63946" stroke="#2C2016" stroke-width="1.5"/>
      </g>
      <g transform="translate(380, 70)">
        <polygon points="15,0 18,10 28,8 20,15 25,25 15,20 5,25 10,15 2,8 12,10" fill="#F4A261" stroke="#2C2016" stroke-width="1.5"/>
      </g>`,
    `<!-- Thảm lá phong dày đặc trên lối mòn rừng thu -->
      <path d="M8,220 Q250,190 492,220 L492,367 L8,367 Z" fill="#DDA15E" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,265 Q250,240 492,265 L492,367 L8,367 Z" fill="#BC6C25" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Ghế gỗ công viên phủ đầy lá phong và quả bí ngô cam đầu thu -->
      <g transform="translate(150, 120)">
        <!-- Ghế băng gỗ phong cách cổ điển -->
        <rect x="20" y="55" width="160" height="15" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="30" y1="20" x2="30" y2="55" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="170" y1="20" x2="170" y2="55" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="30" y1="20" x2="170" y2="20" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Chân ghế -->
        <line x1="40" y1="70" x2="30" y2="110" stroke="#2C2016" stroke-width="4"/>
        <line x1="160" y1="70" x2="170" y2="110" stroke="#2C2016" stroke-width="4"/>
        <!-- Quả bí ngô cam tròn dưới chân ghế -->
        <circle cx="140" cy="115" r="22" fill="#E76F51" stroke="#2C2016" stroke-width="3"/>
        <line x1="140" y1="95" x2="140" y2="90" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Quả sồi nâu và lá phong rực rỡ tiền cảnh -->
      <ellipse cx="90" cy="290" rx="9" ry="12" fill="#8B5A2B" stroke="#2C2016" stroke-width="2"/>`
  ),
  "season-winter-snow": makeScene(
    "seasonwintersnow",
    "Ngôi Làng Tuyết Trắng Mùa Đông",
    "❄️",
    "#A2D2FF",
    ["#1D3557","#457B9D","#A2D2FF"],
    `<!-- Bầu trời đông tuyết rơi lả tả trắng muốt -->
      <circle cx="80" cy="40" r="3.5" fill="#FFFDF9"/>
      <circle cx="160" cy="70" r="3.5" fill="#FFFDF9"/>
      <circle cx="340" cy="50" r="3.5" fill="#FFFDF9"/>
      <circle cx="420" cy="80" r="3.5" fill="#FFFDF9"/>`,
    `<!-- Đồi tuyết trắng nhấp nhô và rặng thông phủ tuyết -->
      <path d="M8,210 Q250,180 492,210 L492,367 L8,367 Z" fill="#E0F2FE" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q200,230 492,260 L492,367 L8,367 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Ngôi nhà gỗ ấm áp ống khói bay lên và người tuyết mỉm cười -->
      <g transform="translate(130, 90)">
        <!-- Nhà gỗ với mái phủ lớp tuyết dày -->
        <rect x="50" y="65" width="110" height="85" fill="#A0522D" stroke="#2C2016" stroke-width="4"/>
        <polygon points="35,65 105,15 175,65" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Ống khói gạch tỏa khói ấm -->
        <rect x="135" y="25" width="20" height="30" fill="#E63946" stroke="#2C2016" stroke-width="3"/>
        <path d="M145,20 Q140,5 150,-10" stroke="#FFFDF9" stroke-width="3" fill="none"/>
        <!-- Cửa sổ sáng ánh đèn vàng ấm áp -->
        <rect x="80" y="85" width="30" height="30" rx="4" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <!-- Chú người tuyết quàng khăn đỏ -->
        <g transform="translate(170, 75)">
          <circle cx="30" cy="75" r="24" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
          <circle cx="30" cy="42" r="17" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
          <polygon points="30,42 42,45 30,46" fill="#F4A261"/>
          <!-- Khăn quàng đỏ -->
          <path d="M18,52 Q30,56 42,52" stroke="#E63946" stroke-width="4" fill="none"/>
        </g>
      </g>`,
    `<!-- Xe trượt tuyết gỗ bên gốc cây -->
      <path d="M80,310 L130,310 Q145,305 140,295" stroke="#2C2016" stroke-width="3.5" fill="none"/>`
  ),
  "season-summer-rain": makeScene(
    "seasonsummerrain",
    "Cơn Mưa Rào Đầu Hạ",
    "🌧️",
    "#457B9D",
    ["#8D99AE","#A2D2FF","#B7E4C7"],
    `<!-- Màn mưa rơi xối xả mát lành -->
      <line x1="80" y1="20" x2="60" y2="90" stroke="#FFFDF9" stroke-width="2.5" opacity="0.7"/>
      <line x1="180" y1="10" x2="160" y2="80" stroke="#FFFDF9" stroke-width="2.5" opacity="0.7"/>
      <line x1="280" y1="30" x2="260" y2="100" stroke="#FFFDF9" stroke-width="2.5" opacity="0.7"/>
      <line x1="380" y1="15" x2="360" y2="85" stroke="#FFFDF9" stroke-width="2.5" opacity="0.7"/>`,
    `<!-- Sân vườn ngập nước và những tán cây xanh mướt tắm mưa -->
      <rect x="8" y="240" width="484" height="127" fill="#74C69D" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="180" ry="42" fill="#BDE0FE" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây dù xanh ngọc trong suốt che cho khóm hoa cẩm tú cầu đẫm nước -->
      <g transform="translate(150, 100)">
        <path d="M30,80 Q100,5 170,80 Z" fill="#A2D2FF" stroke="#2C2016" stroke-width="4" opacity="0.85"/>
        <line x1="100" y1="80" x2="100" y2="175" stroke="#2C2016" stroke-width="4"/>
        <path d="M100,175 Q100,190 115,185" stroke="#2C2016" stroke-width="4" fill="none"/>
        <!-- Khóm hoa cẩm tú cầu tươi tắn nở bung dưới mưa -->
        <circle cx="50" cy="135" r="28" fill="#C7B9FF" stroke="#2C2016" stroke-width="3"/>
        <circle cx="150" cy="135" r="28" fill="#FFCCD5" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Vòng sóng nước đồng tâm lan tỏa -->
      <ellipse cx="100" cy="285" rx="30" ry="10" fill="none" stroke="#FFFDF9" stroke-width="2"/>`
  ),
  "season-fireworks-eve": makeScene(
    "seasonfireworkseve",
    "Đêm Giao Thừa Pháo Hoa Rực Sáng",
    "🎆",
    "#E63946",
    ["#0B090A","#161A1D","#2F3E46"],
    `<!-- Chùm pháo hoa rực sáng đa sắc màu nổ bung trên nền trời -->
      <g transform="translate(150, 80)">
        <circle cx="0" cy="0" r="4" fill="#FFE599"/>
        <line x1="0" y1="0" x2="35" y2="0" stroke="#FFE599" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="-35" y2="0" stroke="#FFE599" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="0" y2="35" stroke="#FFCAD4" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="0" y2="-35" stroke="#FFCAD4" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="25" y2="25" stroke="#A2D2FF" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="-25" y2="-25" stroke="#A2D2FF" stroke-width="3" stroke-dasharray="4,3"/>
      </g>
      <g transform="translate(350, 60)">
        <circle cx="0" cy="0" r="4" fill="#FFCCD5"/>
        <line x1="0" y1="0" x2="30" y2="0" stroke="#FFCCD5" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="-30" y2="0" stroke="#FFCCD5" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="0" y2="30" stroke="#95D5B2" stroke-width="3" stroke-dasharray="4,3"/>
        <line x1="0" y1="0" x2="0" y2="-30" stroke="#95D5B2" stroke-width="3" stroke-dasharray="4,3"/>
      </g>`,
    `<!-- Cầu cảng thành phố ngắm pháo hoa rực rỡ soi bóng xuống nước -->
      <rect x="8" y="240" width="484" height="127" fill="#1D3557" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q250,245 492,260" stroke="#FFE599" stroke-width="3" fill="none" opacity="0.6"/>`,
    `<!-- Lan can gỗ bến cảng với dây đèn lồng và 2 ly sâm panh chúc mừng -->
      <g transform="translate(160, 160)">
        <line x1="0" y1="50" x2="180" y2="50" stroke="#2C2016" stroke-width="5"/>
        <line x1="40" y1="50" x2="40" y2="110" stroke="#2C2016" stroke-width="4"/>
        <line x1="140" y1="50" x2="140" y2="110" stroke="#2C2016" stroke-width="4"/>
        <!-- 2 ly rượu thủy tinh chạm cốc -->
        <polygon points="75,20 85,20 82,45 78,45" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
        <polygon points="95,20 105,20 102,45 98,45" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Pháo bông cầm tay lóe sáng lấp lánh -->
      <g transform="translate(360, 270)">
        <line x1="10" y1="40" x2="25" y2="10" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="25" cy="10" r="6" fill="#FFE599"/>
      </g>`
  ),
  "camp-starlit-tent": makeScene(
    "campstarlittent",
    "Lều Trại Dưới Bầu Trời Sao",
    "⛺",
    "#F4A261",
    ["#0B132B","#1C2541","#3A506B"],
    `<!-- Bầu trời đêm ngàn sao và dải Ngân Hà huyền bí -->
      <circle cx="100" cy="50" r="2.5" fill="#FFFDF9"/>
      <circle cx="200" cy="35" r="3" fill="#FFFDF9"/>
      <circle cx="340" cy="60" r="2.5" fill="#FFFDF9"/>
      <circle cx="420" cy="40" r="3" fill="#FFFDF9"/>
      <polygon points="150,80 152,86 158,86 153,90 155,96 150,92 145,96 147,90 142,86 148,86" fill="#FFE599"/>`,
    `<!-- Thảm cỏ rừng thông tĩnh mịch cạnh bờ hồ -->
      <path d="M8,230 Q250,200 492,230 L492,367 L8,367 Z" fill="#2D6A4F" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Hàng thông cao vút phía sau -->
      <polygon points="60,240 75,140 90,240" fill="#1B4332" stroke="#2C2016" stroke-width="3"/>
      <polygon points="410,240 425,130 440,240" fill="#1B4332" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Chiếc lều tam giác màu cam ấm áp sáng đèn bên trong -->
      <g transform="translate(160, 110)">
        <polygon points="90,20 15,140 165,140" fill="#F4A261" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Cửa lều mở hé lộ ánh sáng vàng dịu -->
        <polygon points="90,20 60,140 120,140" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <line x1="90" y1="20" x2="90" y2="140" stroke="#2C2016" stroke-width="3"/>
        <!-- Cọc lều và dây chằng -->
        <line x1="15" y1="140" x2="-10" y2="155" stroke="#2C2016" stroke-width="3"/>
        <line x1="165" y1="140" x2="190" y2="155" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Đèn bão cổ điển tỏa ánh sáng vàng cạnh lều -->
      <g transform="translate(100, 260)">
        <rect x="10" y="15" width="22" height="30" rx="4" fill="#E76F51" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="21" cy="30" r="6" fill="#FFE599"/>
      </g>`
  ),
  "camp-campfire-marshmallow": makeScene(
    "campcampfiremarshmallow",
    "Lửa Trại Nướng Kẹo Dẻo",
    "🔥",
    "#E63946",
    ["#1B263B","#415A77","#778DA9"],
    `<!-- Đêm rừng thông ngập tràn đốm lửa bập bùng bay lên -->
      <circle cx="210" cy="70" r="3" fill="#FFE599"/>
      <circle cx="290" cy="50" r="3.5" fill="#F4A261"/>
      <circle cx="240" cy="90" r="2.5" fill="#E63946"/>`,
    `<!-- Vòng tròn đá xếp quanh đống lửa trại -->
      <rect x="8" y="240" width="484" height="127" fill="#415A77" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="290" rx="150" ry="35" fill="#1B263B" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Các hòn đá tròn bảo vệ bếp lửa -->
      <circle cx="160" cy="285" r="14" fill="#778DA9" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="200" cy="305" r="16" fill="#778DA9" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="250" cy="315" r="18" fill="#778DA9" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="300" cy="305" r="16" fill="#778DA9" stroke="#2C2016" stroke-width="2.5"/>
      <circle cx="340" cy="285" r="14" fill="#778DA9" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Ngọn lửa đỏ cam bốc cao và que xiên nướng kẹo marshmallow phồng xốp -->
      <g transform="translate(170, 95)">
        <!-- Khúc củi bắt chéo -->
        <line x1="20" y1="165" x2="140" y2="145" stroke="#6F4E37" stroke-width="12" stroke-linecap="round"/>
        <line x1="20" y1="165" x2="140" y2="145" stroke="#2C2016" stroke-width="3.5" stroke-linecap="round"/>
        <line x1="20" y1="145" x2="140" y2="165" stroke="#6F4E37" stroke-width="12" stroke-linecap="round"/>
        <line x1="20" y1="145" x2="140" y2="165" stroke="#2C2016" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Ngọn lửa bập bùng nhiều lớp -->
        <path d="M80,150 C50,110 50,60 80,15 C95,65 125,75 120,110 C120,130 100,150 80,150 Z" fill="#E63946" stroke="#2C2016" stroke-width="4.5"/>
        <path d="M80,150 C65,120 65,85 80,50 C90,85 110,95 105,120 C105,135 95,150 80,150 Z" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M80,150 C70,130 70,110 80,80 C85,110 95,115 95,130 Z" fill="#FFE599"/>
        <!-- Que xiên nướng kẹo dài cắm qua đống lửa -->
        <line x1="-30" y1="60" x2="65" y2="95" stroke="#2C2016" stroke-width="3.5" stroke-linecap="round"/>
        <rect x="40" y="80" width="18" height="15" rx="4" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Chiếc ca men dã ngoại nóng hổi -->
      <rect x="90" y="280" width="25" height="25" rx="4" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>`
  ),
  "camp-kayak-lake": makeScene(
    "campkayaklake",
    "Chèo Thuyền Kayak Hồ Phẳng",
    "🛶",
    "#F4A261",
    ["#D8E2DC","#BDE0FE","#98D8AA"],
    `<!-- Dãy núi hùng vĩ phản chiếu trên mặt nước phẳng lặng -->
      <polygon points="60,180 160,80 260,180" fill="#6C757D" stroke="#2C2016" stroke-width="3"/>
      <polygon points="140,100 160,80 180,100" fill="#FFFDF9"/>
      <polygon points="220,180 320,70 420,180" fill="#495057" stroke="#2C2016" stroke-width="3"/>
      <polygon points="300,92 320,70 340,92" fill="#FFFDF9"/>`,
    `<!-- Hồ nước trên núi trong như ngọc bích -->
      <rect x="8" y="180" width="484" height="187" fill="#83C5BE" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,200 Q250,190 492,200" stroke="#FFFDF9" stroke-width="2" opacity="0.6"/>`,
    `<!-- Chiếc thuyền kayak vàng cam rẽ sóng và mái chèo vắt ngang -->
      <g transform="translate(150, 160)">
        <!-- Thuyền kayak thon dài hai đầu vuốt nhọn -->
        <path d="M10,80 Q100,50 200,80 Q100,105 10,80 Z" fill="#F4A261" stroke="#2C2016" stroke-width="4.5"/>
        <ellipse cx="105" cy="78" rx="35" ry="12" fill="#2C2016"/>
        <ellipse cx="105" cy="78" rx="28" ry="8" fill="#E76F51"/>
        <!-- Mái chèo 2 đầu chéo ngang thuyền -->
        <line x1="30" y1="35" x2="180" y2="120" stroke="#2C2016" stroke-width="4.5" stroke-linecap="round"/>
        <ellipse cx="35" cy="38" rx="14" ry="7" fill="#E63946" stroke="#2C2016" stroke-width="2.5" transform="rotate(-30, 35, 38)"/>
        <ellipse cx="175" cy="117" rx="14" ry="7" fill="#E63946" stroke="#2C2016" stroke-width="2.5" transform="rotate(-30, 175, 117)"/>
      </g>`,
    `<!-- Vệt sóng rẽ nước và đóa hoa súng nổi -->
      <ellipse cx="100" cy="290" rx="35" ry="10" fill="none" stroke="#FFFDF9" stroke-width="2"/>`
  ),
  "camp-shooting-stars": makeScene(
    "campshootingstars",
    "Ngắm Sao Băng Trên Đỉnh Đồi",
    "🌠",
    "#FFE599",
    ["#03071E","#0B132B","#1C2541"],
    `<!-- Sao băng rực sáng vụt qua bầu trời ngàn sao -->
      <line x1="80" y1="40" x2="220" y2="110" stroke="#FFE599" stroke-width="4" stroke-linecap="round"/>
      <line x1="80" y1="40" x2="140" y2="70" stroke="#FFFDF9" stroke-width="2"/>
      <polygon points="220,110 223,118 231,118 225,123 227,131 220,126 213,131 215,123 209,118 217,118" fill="#FFE599"/>
      <!-- Vệt sao băng thứ 2 nhỏ hơn -->
      <line x1="320" y1="30" x2="420" y2="80" stroke="#A2D2FF" stroke-width="3" stroke-linecap="round"/>`,
    `<!-- Đỉnh đồi lộng gió trải thảm ngắm trời đêm -->
      <path d="M8,220 Q250,170 492,220 L492,367 L8,367 Z" fill="#1C2541" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Kính thiên văn viễn vọng ngắm sao trên chân 3 chạc vững chãi -->
      <g transform="translate(170, 100)">
        <!-- Ống kính thiên văn màu xanh đậm viền đồng -->
        <polygon points="40,90 120,40 130,55 50,105" fill="#457B9D" stroke="#2C2016" stroke-width="4"/>
        <ellipse cx="125" cy="47" rx="8" ry="12" fill="#A2D2FF" stroke="#2C2016" stroke-width="3"/>
        <!-- Khớp nối và chân đỡ 3 chạc -->
        <circle cx="85" cy="75" r="10" fill="#E9C46A" stroke="#2C2016" stroke-width="3"/>
        <line x1="85" y1="85" x2="45" y2="165" stroke="#2C2016" stroke-width="4.5"/>
        <line x1="85" y1="85" x2="85" y2="165" stroke="#2C2016" stroke-width="4.5"/>
        <line x1="85" y1="85" x2="125" y2="165" stroke="#2C2016" stroke-width="4.5"/>
      </g>`,
    `<!-- Thảm dạ ấm áp và cốc giữ nhiệt bên cạnh -->
      <g transform="translate(320, 270)">
        <ellipse cx="30" cy="15" rx="35" ry="14" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="22" y="-5" width="16" height="22" rx="4" fill="#F4A261" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "camp-vintage-van": makeScene(
    "campvintagevan",
    "Chuyến Xe Van Du Lịch Mùa Hạ",
    "🚐",
    "#E76F51",
    ["#F4A261","#E76F51","#2A9D8F"],
    `<!-- Hoàng hôn biển rực rỡ và hàng cọ dừa đung đưa -->
      <circle cx="250" cy="100" r="45" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
      <path d="M100,60 Q120,50 140,60" fill="none" stroke="#2C2016" stroke-width="2"/>`,
    `<!-- Bãi cỏ vách đá nhìn ra biển mênh mông -->
      <rect x="8" y="240" width="484" height="127" fill="#E9C46A" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="270" x2="492" y2="270" stroke="#2C2016" stroke-width="2.5" opacity="0.6"/>`,
    `<!-- Chiếc xe van Volkswagen bo tròn cổ điển chở ván lướt sóng -->
      <g transform="translate(130, 110)">
        <!-- Ván lướt sóng sọc trên nóc xe -->
        <ellipse cx="110" cy="20" rx="90" ry="12" fill="#E76F51" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="110" cy="20" rx="80" ry="6" fill="#FFFDF9"/>
        <!-- Thân xe van bo tròn 2 tone màu: trắng trên, xanh ngọc dưới -->
        <rect x="20" y="30" width="190" height="100" rx="25" fill="#FFFDF9" stroke="#2C2016" stroke-width="4.5"/>
        <path d="M20,80 L210,80 L210,105 Q210,130 185,130 L45,130 Q20,130 20,105 Z" fill="#2A9D8F" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Kính xe trước và bên hông -->
        <rect x="35" y="42" width="60" height="32" rx="6" fill="#BDE0FE" stroke="#2C2016" stroke-width="3"/>
        <rect x="105" y="42" width="50" height="32" rx="6" fill="#BDE0FE" stroke="#2C2016" stroke-width="3"/>
        <rect x="165" y="42" width="35" height="32" rx="6" fill="#BDE0FE" stroke="#2C2016" stroke-width="3"/>
        <!-- Đèn tròn trước và logo tròn -->
        <circle cx="25" cy="95" r="9" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Hai bánh xe cao su viền trắng tròn trĩnh -->
        <circle cx="65" cy="130" r="22" fill="#2C2016"/>
        <circle cx="65" cy="130" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="170" cy="130" r="22" fill="#2C2016"/>
        <circle cx="170" cy="130" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Ghế xếp cắm trại bằng vải dù bên cạnh xe -->
      <g transform="translate(370, 260)">
        <polygon points="10,35 40,35 30,10" fill="#E76F51" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "camp-creek-fishing": makeScene(
    "campcreekfishing",
    "Câu Cá Bên Bờ Suối Vắng",
    "🎣",
    "#2A9D8F",
    ["#E8F8F5","#D8F3DC","#BDE0FE"],
    `<!-- Rừng xanh nắng sớm rọi qua tán lá râm ran -->
      <circle cx="80" cy="50" r="28" fill="#FFF1C5" opacity="0.6"/>`,
    `<!-- Dòng suối đá róc rách rợp bóng mát cây xanh -->
      <rect x="8" y="200" width="484" height="167" fill="#83C5BE" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Những tảng đá cuội tròn nhẵn bên suối -->
      <ellipse cx="100" cy="260" rx="60" ry="30" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="400" cy="280" rx="70" ry="35" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cần câu trúc uốn cong và chú cá hồi nhảy tung bọt nước -->
      <g transform="translate(140, 110)">
        <!-- Cần câu trúc cong vút -->
        <path d="M-10,130 Q40,60 120,30" stroke="#8B5A2B" stroke-width="4.5" fill="none" stroke-linecap="round"/>
        <line x1="120" y1="30" x2="160" y2="110" stroke="#2C2016" stroke-width="2" stroke-dasharray="4,2"/>
        <!-- Chú cá nhỏ ngớp mồi giãy đuôi -->
        <g transform="translate(150, 100)">
          <ellipse cx="15" cy="15" rx="18" ry="10" fill="#E76F51" stroke="#2C2016" stroke-width="2.5"/>
          <polygon points="0,15 -10,8 -10,22" fill="#E76F51" stroke="#2C2016" stroke-width="2"/>
        </g>
      </g>`,
    `<!-- Giỏ tre câu cá đựng đầy cá tươi bên bờ đá -->
      <g transform="translate(90, 240)">
        <path d="M5,10 L35,10 L30,35 L10,35 Z" fill="#DDBEA9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "anime-magical-girl": makeScene(
    "animemagicalgirl",
    "Cô Bé Phép Thuật Ngôi Sao",
    "⭐",
    "#F4ACB7",
    ["#FFF0F5","#E8D7F1","#FFCCD5"],
    `<!-- Trăng sao lấp lánh và dải ruy băng ma thuật hồng tím -->
      <path d="M50,80 Q250,10 450,80" fill="none" stroke="#FFCAD4" stroke-width="8" opacity="0.6"/>
      <polygon points="120,40 124,52 136,52 126,60 130,72 120,64 110,72 114,60 104,52 116,52" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>`,
    `<!-- Vòng tròn ma thuật phát sáng với ký hiệu chiêm tinh -->
      <rect x="8" y="240" width="484" height="127" fill="#C7B9FF" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="180" ry="45" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="150" ry="35" fill="none" stroke="#F4ACB7" stroke-width="3" stroke-dasharray="10,6"/>`,
    `<!-- Gậy phép thuật trái tim có cánh thiên thần tỏa hào quang -->
      <g transform="translate(170, 70)">
        <!-- Tay cầm vàng ngọc -->
        <line x1="80" y1="80" x2="80" y2="200" stroke="#FFE599" stroke-width="8" stroke-linecap="round"/>
        <line x1="80" y1="80" x2="80" y2="200" stroke="#2C2016" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Trái tim ngọc bích hồng ở đỉnh -->
        <path d="M80,80 C50,40 40,90 80,120 C120,90 110,40 80,80 Z" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <!-- Đôi cánh thiên thần trắng muốt hai bên -->
        <path d="M45,75 C10,50 0,90 40,95 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <path d="M115,75 C150,50 160,90 120,95 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Vương miện nhỏ đính ngọc trên đầu trái tim -->
        <polygon points="70,55 75,40 80,50 85,40 90,55" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Những ngôi sao và trái tim nhỏ lơ lửng -->
      <polygon points="80,260 83,267 90,267 85,272 87,279 80,275 73,279 75,272 70,267 77,267" fill="#FFE599" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "anime-school-rooftop": makeScene(
    "animeschoolrooftop",
    "Hoàng Hôn Sân Thượng Trường Học",
    "🌇",
    "#F4A261",
    ["#E76F51","#F4A261","#457B9D"],
    `<!-- Hoàng hôn rực cháy anime với các tầng mây cuồn cuộn -->
      <path d="M50,110 Q150,60 250,110 Q350,70 450,120" stroke="#FFE599" stroke-width="12" fill="none" opacity="0.5"/>`,
    `<!-- Sân thượng bê tông với hàng rào lưới thép chống rơi -->
      <rect x="8" y="230" width="484" height="137" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Lưới thép đan mắt cáo đặc trưng anime -->
      <line x1="8" y1="120" x2="492" y2="120" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="170" x2="492" y2="170" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="100" y1="120" x2="100" y2="230" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="200" y1="120" x2="200" y2="230" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="300" y1="120" x2="300" y2="230" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="400" y1="120" x2="400" y2="230" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cặp học sinh và hộp cơm bento mở nắp ngắm hoàng hôn -->
      <g transform="translate(170, 160)">
        <!-- Cặp da học sinh màu nâu dựa hàng rào -->
        <rect x="25" y="30" width="65" height="50" rx="8" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>
        <rect x="40" y="20" width="35" height="15" rx="4" fill="#8B5A2B" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Hộp cơm bento chia ngăn có xúc xích bạch tuộc -->
        <rect x="105" y="45" width="55" height="35" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="120" cy="62" rx="9" ry="7" fill="#E63946"/>
        <circle cx="142" cy="62" r="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        <polygon points="142,58 140,65 145,65" fill="#2C2016"/>
      </g>`,
    `<!-- Lon nước ngọt soda mát lạnh trên sàn -->
      <g transform="translate(90, 270)">
        <rect x="10" y="10" width="18" height="28" rx="4" fill="#457B9D" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "anime-chibi-baker": makeScene(
    "animechibibaker",
    "Chibi Thợ Làm Bánh Nhí",
    "👩‍🍳",
    "#F4ACB7",
    ["#FFF0F5","#FFCAD4","#FFE5D9"],
    `<!-- Phòng làm bánh màu pastel ngọt lịm kẹo bông -->
      <circle cx="90" cy="50" r="5" fill="#FFFDF9"/>
      <circle cx="410" cy="60" r="5" fill="#FFFDF9"/>`,
    `<!-- Bàn bếp gỗ phủ bột mì trắng -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Bé chibi đội nón đầu bếp to đùng cầm phới đánh trứng -->
      <g transform="translate(180, 85)">
        <!-- Mũ đầu bếp bồng bềnh trắng muốt to gấp đôi đầu -->
        <path d="M30,55 C10,20 60,-10 70,25 C90,-10 130,20 110,55 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <rect x="42" y="50" width="56" height="18" rx="4" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Khuôn mặt chibi tròn trĩnh mắt long lanh -->
        <circle cx="70" cy="85" r="32" fill="#FFE5D9" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="58" cy="85" rx="5" ry="7" fill="#2C2016"/>
        <circle cx="56" cy="82" r="2" fill="#FFFDF9"/>
        <ellipse cx="82" cy="85" rx="5" ry="7" fill="#2C2016"/>
        <circle cx="80" cy="82" r="2" fill="#FFFDF9"/>
        <ellipse cx="50" cy="95" rx="6" ry="3" fill="#FFCAD4"/>
        <ellipse cx="90" cy="95" rx="6" ry="3" fill="#FFCAD4"/>
        <path d="M66,92 Q70,97 74,92" stroke="#2C2016" stroke-width="2.5" fill="none"/>
        <!-- Thân nhỏ mặc tạp dề hồng -->
        <rect x="52" y="115" width="36" height="40" rx="8" fill="#F4ACB7" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Cầm cây phới đánh trứng to tướng -->
        <line x1="90" y1="90" x2="115" y2="155" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="120" cy="160" rx="12" ry="16" fill="none" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Tô bột kem tươi đánh bông và quả dâu tây -->
      <g transform="translate(110, 250)">
        <ellipse cx="25" cy="20" rx="25" ry="12" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <ellipse cx="25" cy="15" rx="20" ry="8" fill="#FFFDF9"/>
      </g>`
  ),
  "anime-cyber-neko": makeScene(
    "animecyberneko",
    "Cô Gái Mèo Neon Tương Lai",
    "🐱",
    "#00F5D4",
    ["#0F0E17","#2E1A47","#5B146F"],
    `<!-- Tòa nhà chọc trời neon tương lai và lưới cyberpunk -->
      <rect x="60" y="30" width="50" height="150" fill="#2E1A47" stroke="#00F5D4" stroke-width="1.5"/>
      <rect x="390" y="40" width="50" height="140" fill="#2E1A47" stroke="#FF007F" stroke-width="1.5"/>
      <circle cx="200" cy="50" r="3" fill="#00F5D4"/>
      <circle cx="300" cy="60" r="3" fill="#FF007F"/>`,
    `<!-- Lan can thép công nghệ tương lai sáng đèn neon -->
      <rect x="8" y="240" width="484" height="127" fill="#0F0E17" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="240" x2="492" y2="240" stroke="#00F5D4" stroke-width="4"/>
      <line x1="8" y1="260" x2="492" y2="260" stroke="#FF007F" stroke-width="3"/>`,
    `<!-- Tai mèo công nghệ phát sáng neon và kính râm hologram -->
      <g transform="translate(170, 90)">
        <!-- Đôi tai mèo cơ khí phát sáng cyan và hồng -->
        <polygon points="30,50 15,10 50,30" fill="#00F5D4" stroke="#2C2016" stroke-width="3.5"/>
        <polygon points="25,45 18,20 40,32" fill="#FF007F"/>
        <polygon points="110,50 125,10 90,30" fill="#00F5D4" stroke="#2C2016" stroke-width="3.5"/>
        <polygon points="115,45 122,20 100,32" fill="#FF007F"/>
        <!-- Tai nghe chụp đầu tương lai -->
        <path d="M30,50 Q70,20 110,50" stroke="#2C2016" stroke-width="6" fill="none"/>
        <circle cx="25" cy="55" r="14" fill="#FF007F" stroke="#2C2016" stroke-width="3"/>
        <circle cx="115" cy="55" r="14" fill="#FF007F" stroke="#2C2016" stroke-width="3"/>
        <!-- Kính râm công nghệ visor che mắt -->
        <rect x="35" y="70" width="70" height="22" rx="6" fill="#00F5D4" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Chú mèo máy robot tròn xoe chạy quanh -->
      <g transform="translate(350, 250)">
        <circle cx="20" cy="20" r="18" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="14" cy="18" rx="3" ry="4" fill="#00F5D4"/>
        <ellipse cx="26" cy="18" rx="3" ry="4" fill="#00F5D4"/>
      </g>`
  ),
  "anime-summer-festival": makeScene(
    "animesummerfestival",
    "Cô Gái Mặc Yukata Xem Pháo Hoa",
    "👘",
    "#E63946",
    ["#0B090A","#2B2D42","#8D99AE"],
    `<!-- Pháo hoa rực rỡ và lồng đèn lễ hội Matsuri đỏ treo dây -->
      <line x1="20" y1="40" x2="480" y2="40" stroke="#2C2016" stroke-width="2.5"/>
      <rect x="80" y="40" width="22" height="32" rx="6" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
      <rect x="220" y="40" width="22" height="32" rx="6" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
      <rect x="360" y="40" width="22" height="32" rx="6" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Cầu gỗ truyền thống ngắm pháo hoa -->
      <path d="M8,260 Q250,220 492,260 L492,367 L8,367 Z" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Bóng lưng cô gái mặc Yukata hoa đào cài trâm hoa cầm quạt tròn -->
      <g transform="translate(170, 95)">
        <!-- Tóc búi cài hoa kanzashi xinh đẹp -->
        <circle cx="70" cy="40" r="26" fill="#2C2016"/>
        <circle cx="90" cy="35" r="9" fill="#FFCAD4" stroke="#2C2016" stroke-width="2"/>
        <!-- Cổ áo và áo Yukata hoa văn hoa anh đào -->
        <path d="M40,65 L100,65 L115,165 L25,165 Z" fill="#F4ACB7" stroke="#2C2016" stroke-width="4"/>
        <!-- Đai lưng Obi thắt nơ lớn màu đỏ tươi -->
        <rect x="35" y="95" width="70" height="24" fill="#E63946" stroke="#2C2016" stroke-width="3"/>
        <circle cx="70" cy="107" r="12" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
        <!-- Chiếc quạt giấy Uchiwa cầm trên tay -->
        <circle cx="115" cy="120" r="18" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="115" y1="138" x2="115" y2="155" stroke="#8B5A2B" stroke-width="3"/>
      </g>`,
    `<!-- Túi bóng đựng chú cá vàng bơi lượn -->
      <g transform="translate(110, 260)">
        <circle cx="15" cy="20" r="14" fill="#BDE0FE" stroke="#2C2016" stroke-width="2" opacity="0.8"/>
        <ellipse cx="15" cy="20" rx="6" ry="4" fill="#E76F51"/>
      </g>`
  ),
  "anime-mecha-flower": makeScene(
    "animemechaflower",
    "Robot Khổng Lồ Giữa Đồi Hoa",
    "🤖",
    "#457B9D",
    ["#E0F2FE","#FFF1C5","#95D5B2"],
    `<!-- Mây trắng hòa bình bồng bềnh trôi -->
      <path d="M80,50 Q130,30 180,50 Q210,70 150,75 Z" fill="#FFFDF9" opacity="0.8"/>`,
    `<!-- Đồi hoa cúc họa mi trải dài ngút tầm mắt -->
      <path d="M8,210 Q250,180 492,210 L492,367 L8,367 Z" fill="#95D5B2" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q200,230 492,260 L492,367 L8,367 Z" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Chú robot khổng lồ nằm ngủ say phủ đầy dây leo và hoa dại -->
      <g transform="translate(150, 110)">
        <!-- Đầu robot bọc thép vuông vức cổ điển -->
        <rect x="35" y="30" width="90" height="75" rx="15" fill="#A8DADC" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Hai ăng-ten tròn 2 bên -->
        <circle cx="25" cy="65" r="10" fill="#457B9D" stroke="#2C2016" stroke-width="3"/>
        <circle cx="135" cy="65" r="10" fill="#457B9D" stroke="#2C2016" stroke-width="3"/>
        <!-- Mắt ngủ mỉm cười thanh bình -->
        <path d="M50,65 Q60,75 70,65" stroke="#2C2016" stroke-width="3.5" fill="none"/>
        <path d="M90,65 Q100,75 110,65" stroke="#2C2016" stroke-width="3.5" fill="none"/>
        <!-- Bông hoa nở trên đỉnh đầu robot -->
        <line x1="80" y1="30" x2="80" y2="10" stroke="#2C2016" stroke-width="3"/>
        <circle cx="80" cy="10" r="12" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="80" cy="10" r="5" fill="#FFE599"/>
      </g>`,
    `<!-- Chú chim nhỏ đậu trên ngón tay kim loại của robot -->
      <g transform="translate(340, 240)">
        <ellipse cx="20" cy="20" rx="14" ry="10" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
        <polygon points="32,20 40,22 32,24" fill="#F4A261"/>
      </g>`
  ),
  "galaxy-nebula-cat": makeScene(
    "galaxynebulacat",
    "Chú Mèo Ngồi Trên Vành Đai Sao Thổ",
    "🪐",
    "#DFCCF1",
    ["#03071E","#370617","#6A040F"],
    `<!-- Tinh vân tím đỏ huyền ảo với hàng triệu hạt bụi sao lấp lánh -->
      <circle cx="80" cy="50" r="2.5" fill="#FFFDF9"/>
      <circle cx="160" cy="30" r="3" fill="#FFFDF9"/>
      <circle cx="360" cy="60" r="2.5" fill="#FFFDF9"/>
      <circle cx="440" cy="40" r="3" fill="#FFFDF9"/>`,
    `<!-- Quả cầu Sao Thổ khổng lồ với vành đai ánh sáng rực rỡ -->
      <circle cx="250" cy="220" r="110" fill="#F4A261" stroke="#2C2016" stroke-width="4.5"/>
      <!-- Vành đai nghiêng ngoạn mục của Sao Thổ -->
      <ellipse cx="250" cy="220" rx="210" ry="40" fill="none" stroke="#FFE599" stroke-width="22" opacity="0.85"/>
      <ellipse cx="250" cy="220" rx="210" ry="40" fill="none" stroke="#2C2016" stroke-width="4"/>`,
    `<!-- Chú mèo con ngồi cuộn tròn trên vành đai sao ngắm ngân hà -->
      <g transform="translate(210, 140)">
        <!-- Thân mèo đen trắng tròn xoe -->
        <ellipse cx="40" cy="55" rx="32" ry="25" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Đầu tròn và tai mèo nhọn -->
        <circle cx="40" cy="30" r="22" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <polygon points="25,18 20,2 35,12" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <polygon points="55,18 60,2 45,12" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Đuôi mèo dài ngoe nguẩy buông xuống khoảng không vũ trụ -->
        <path d="M12,65 Q-15,80 -5,95 Q5,100 15,85" stroke="#2C2016" stroke-width="6" fill="none" stroke-linecap="round"/>
      </g>`,
    `<!-- Tiểu hành tinh pha lê lơ lửng -->
      <polygon points="70,290 85,275 100,290 90,305 75,305" fill="#C7B9FF" stroke="#2C2016" stroke-width="2"/>`
  ),
  "galaxy-cosmic-whale": makeScene(
    "galaxycosmicwhale",
    "Cá Voi Lượn Giữa Dải Ngân Hà",
    "🐋",
    "#4CC9F0",
    ["#0B090A","#161A1D","#0077B6"],
    `<!-- Dải Ngân Hà rực sáng với các chòm sao kết nối nhau -->
      <line x1="80" y1="50" x2="140" y2="70" stroke="#4CC9F0" stroke-width="1.5" stroke-dasharray="3,3"/>
      <line x1="140" y1="70" x2="200" y2="40" stroke="#4CC9F0" stroke-width="1.5" stroke-dasharray="3,3"/>
      <circle cx="80" cy="50" r="3" fill="#FFFDF9"/>
      <circle cx="140" cy="70" r="3" fill="#FFFDF9"/>
      <circle cx="200" cy="40" r="3" fill="#FFFDF9"/>`,
    `<!-- Biển mây vũ trụ sâu thẳm -->
      <rect x="8" y="240" width="484" height="127" fill="#03045E" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q250,230 492,260" stroke="#4CC9F0" stroke-width="3" fill="none" opacity="0.6"/>`,
    `<!-- Chú cá voi lưng gù khổng lồ da dát ngàn sao bơi lượn trong vũ trụ -->
      <g transform="translate(130, 90)">
        <path d="M20,110 C40,40 180,30 220,90 C230,105 210,135 170,140 C100,150 40,145 20,110 Z" fill="#0077B6" stroke="#2C2016" stroke-width="4.5"/>
        <path d="M50,135 C100,140 180,135 200,110 C180,120 100,125 50,135 Z" fill="#90E0EF"/>
        <!-- Đuôi cá voi xòe quạt kiêu hãnh -->
        <polygon points="25,115 -10,85 5,115 -10,145" fill="#0096C7" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Vây bơi khổng lồ chèo giữa các vì sao -->
        <path d="M120,135 Q145,175 165,155 Z" fill="#0096C7" stroke="#2C2016" stroke-width="3"/>
        <!-- Các ngôi sao phát sáng trên lưng cá voi -->
        <circle cx="100" cy="85" r="3" fill="#FFFDF9"/>
        <circle cx="130" cy="75" r="3" fill="#FFFDF9"/>
        <circle cx="160" cy="90" r="3.5" fill="#FFE599"/>
      </g>`,
    `<!-- Sao chổi nhỏ lướt qua dưới bụng cá voi -->
      <line x1="80" y1="280" x2="160" y2="300" stroke="#FFE599" stroke-width="3"/>`
  ),
  "galaxy-observatory-moon": makeScene(
    "galaxyobservatorymoon",
    "Đài Thiên Văn Ngắm Trăng Rằm",
    "🔭",
    "#FFE599",
    ["#0D1B2A","#1B263B","#415A77"],
    `<!-- Mặt trăng tròn vĩ đại với các hố trăng chân thực -->
      <circle cx="360" cy="110" r="65" fill="#FFF1C5" stroke="#2C2016" stroke-width="4.5"/>
      <circle cx="335" cy="90" r="14" fill="#FFE599" opacity="0.6"/>
      <circle cx="370" cy="80" r="10" fill="#FFE599" opacity="0.6"/>
      <circle cx="385" cy="130" r="16" fill="#FFE599" opacity="0.6"/>`,
    `<!-- Đỉnh núi cao đặt đài quan sát thiên văn -->
      <path d="M8,240 Q150,200 300,240 Q400,260 492,230 L492,367 L8,367 Z" fill="#0D1B2A" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Mái vòm tròn đài thiên văn mở khe hé hướng về mặt trăng -->
      <g transform="translate(100, 110)">
        <rect x="25" y="65" width="110" height="75" fill="#EBDDD4" stroke="#2C2016" stroke-width="4"/>
        <!-- Mái vòm bán cầu phía trên -->
        <path d="M15,65 Q80,-15 145,65 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="4.5"/>
        <rect x="70" y="10" width="20" height="55" fill="#415A77" stroke="#2C2016" stroke-width="3"/>
        <!-- Ống kính viễn vọng nhô ra ngoài mái vòm -->
        <polygon points="75,25 155,-15 162,-5 82,35" fill="#E9C46A" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Đèn bão chiếu sáng lối đi lên đài quan sát -->
      <circle cx="80" cy="280" r="8" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>`
  ),
  "galaxy-constellation-harp": makeScene(
    "galaxyconstellationharp",
    "Chùm Sao Đàn Lia Tỏa Sáng",
    "✨",
    "#DFCCF1",
    ["#10002B","#240046","#3C096C"],
    `<!-- Chòm sao Thiên Cầm (Lyra) kết nối các vì sao sáng nhất -->
      <circle cx="80" cy="40" r="2.5" fill="#FFFDF9"/>
      <circle cx="400" cy="60" r="3" fill="#FFFDF9"/>`,
    `<!-- Thềm đá vũ trụ chạm khắc ký tự thần thoại -->
      <rect x="8" y="240" width="484" height="127" fill="#240046" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="42" fill="#5A189A" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây đàn Harp bằng vàng rực rỡ với các dây đàn là tia sáng ngôi sao -->
      <g transform="translate(160, 85)">
        <path d="M30,30 Q90,5 110,65 Q120,135 150,150 L50,150 Q20,110 30,30 Z" fill="#FFE599" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Dây đàn ánh sáng song song -->
        <line x1="50" y1="50" x2="65" y2="150" stroke="#FFFDF9" stroke-width="2.5"/>
        <line x1="68" y1="55" x2="85" y2="150" stroke="#FFFDF9" stroke-width="2.5"/>
        <line x1="86" y1="62" x2="105" y2="150" stroke="#FFFDF9" stroke-width="2.5"/>
        <line x1="104" y1="72" x2="125" y2="150" stroke="#FFFDF9" stroke-width="2.5"/>
        <!-- Ngôi sao Vega sáng chói trên đỉnh đàn -->
        <polygon points="30,20 33,28 41,28 35,33 37,41 30,36 23,41 25,33 19,28 27,28" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Nốt nhạc thần kỳ bay bổng hóa thành bụi sao -->
      <circle cx="120" cy="260" r="5" fill="#C7B9FF"/>
      <circle cx="360" cy="250" r="6" fill="#DFCCF1"/>`
  ),
  "galaxy-space-capsule": makeScene(
    "galaxyspacecapsule",
    "Trạm Không Gian Vườn Cây Xanh",
    "🚀",
    "#74C69D",
    ["#000814","#001D3D","#003566"],
    `<!-- Trái Đất xanh lam tuyệt đẹp nhìn qua cửa sổ vũ trụ -->
      <circle cx="370" cy="110" r="60" fill="#0077B6" stroke="#2C2016" stroke-width="4"/>
      <path d="M340,90 Q370,80 390,110 Q400,130 360,140 Z" fill="#74C69D"/>`,
    `<!-- Khung cửa sổ tròn module không gian ngắm vũ trụ -->
      <rect x="8" y="8" width="484" height="359" fill="none" stroke="#6C757D" stroke-width="20"/>
      <rect x="8" y="240" width="484" height="127" fill="#495057" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Vườn dâu tây thủy canh không trọng lực phát triển xanh mướt -->
      <g transform="translate(130, 130)">
        <rect x="40" y="45" width="160" height="40" rx="8" fill="#EBDDD4" stroke="#2C2016" stroke-width="4"/>
        <line x1="40" y1="65" x2="200" y2="65" stroke="#00F5D4" stroke-width="3"/>
        <!-- Cây dâu tây treo lơ lửng -->
        <circle cx="70" cy="35" r="14" fill="#74C69D" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="75" cy="42" r="7" fill="#E63946"/>
        <circle cx="120" cy="30" r="15" fill="#74C69D" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="125" cy="38" r="8" fill="#E63946"/>
        <circle cx="170" cy="35" r="14" fill="#74C69D" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="165" cy="42" r="7" fill="#E63946"/>
      </g>`,
    `<!-- Giọt nước tròn xoe trôi nổi không trọng lực -->
      <circle cx="120" cy="270" r="10" fill="#BDE0FE" stroke="#2C2016" stroke-width="2" opacity="0.85"/>
      <circle cx="340" cy="260" r="8" fill="#BDE0FE" stroke="#2C2016" stroke-width="2" opacity="0.85"/>`
  ),
  "galaxy-aurora-borealis": makeScene(
    "galaxyauroraborealis",
    "Cực Quang Phương Bắc Huyền Ảo",
    "🌌",
    "#52B788",
    ["#081C15","#1B4332","#2D6A4F"],
    `<!-- Những dải cực quang xanh ngọc và tím nhảy múa trên nền trời tuyết -->
      <path d="M20,60 Q150,10 250,70 Q350,130 480,40" stroke="#74C69D" stroke-width="28" fill="none" opacity="0.75"/>
      <path d="M20,75 Q150,25 250,85 Q350,145 480,55" stroke="#C7B9FF" stroke-width="18" fill="none" opacity="0.65"/>`,
    `<!-- Cảnh băng tuyết Bắc Cực và hàng thông phủ sương giá -->
      <path d="M8,220 Q250,180 492,220 L492,367 L8,367 Z" fill="#D8F3DC" stroke="#2C2016" stroke-width="3.5"/>
      <polygon points="80,230 95,150 110,230" fill="#1B4332" stroke="#2C2016" stroke-width="3"/>
      <polygon points="380,230 395,140 410,230" fill="#1B4332" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Ngôi nhà lều kính igloo ấm áp ánh đèn vàng ngắm cực quang -->
      <g transform="translate(180, 130)">
        <!-- Mái vòm kính nửa hình cầu -->
        <path d="M15,90 Q70,5 125,90 Z" fill="#FFE599" stroke="#2C2016" stroke-width="4.5" opacity="0.9"/>
        <!-- Khung kim loại tam giác ghép kính -->
        <line x1="70" y1="20" x2="70" y2="90" stroke="#2C2016" stroke-width="3"/>
        <line x1="38" y1="55" x2="102" y2="55" stroke="#2C2016" stroke-width="3"/>
        <line x1="15" y1="90" x2="125" y2="90" stroke="#2C2016" stroke-width="4"/>
        <!-- Cửa vòm nhỏ lối vào -->
        <rect x="55" y="70" width="30" height="20" rx="4" fill="#DDBEA9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Chú cáo tuyết trắng ngồi ngắm cực quang -->
      <g transform="translate(320, 260)">
        <ellipse cx="25" cy="20" rx="16" ry="12" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="35" cy="12" r="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "fest-mid-autumn-lantern": makeScene(
    "festmidautumnlantern",
    "Rước Đèn Lồng Cá Chép Trung Thu",
    "🏮",
    "#E63946",
    ["#0B132B","#1C2541","#8D0801"],
    `<!-- Trăng rằm vằng vặc chiếu sáng đêm hội Trung Thu -->
      <circle cx="390" cy="80" r="45" fill="#FFE599" stroke="#2C2016" stroke-width="4"/>`,
    `<!-- Sân đình lát gạch đỏ và rặng tre đung đưa -->
      <rect x="8" y="240" width="484" height="127" fill="#C1121F" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="280" x2="492" y2="280" stroke="#FFE599" stroke-width="2.5" opacity="0.6"/>`,
    `<!-- Chiếc đèn lồng cá chép bằng giấy kính đỏ vàng rực rỡ có nến sáng -->
      <g transform="translate(130, 80)">
        <!-- Thân cá chép uốn lượn thon thả -->
        <path d="M40,110 C80,30 180,40 210,95 C190,140 80,150 40,110 Z" fill="#E63946" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Vảy cá chép vẽ tay ngũ sắc -->
        <path d="M100,75 Q115,90 130,75" stroke="#FFE599" stroke-width="3" fill="none"/>
        <path d="M120,95 Q135,110 150,95" stroke="#FFE599" stroke-width="3" fill="none"/>
        <path d="M140,75 Q155,90 170,75" stroke="#FFE599" stroke-width="3" fill="none"/>
        <!-- Đuôi cá chép xếp ly xòe rộng như hoa sen -->
        <path d="M45,110 L10,75 Q25,110 10,145 Z" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Vây cá vươn cao -->
        <path d="M120,55 Q135,20 150,55 Z" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <path d="M120,130 Q135,165 150,130 Z" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <!-- Mắt cá chép to tròn lấp lánh -->
        <circle cx="190" cy="85" r="9" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="193" cy="85" r="4" fill="#2C2016"/>
        <!-- Cán cầm tre và dây buộc -->
        <line x1="140" y1="50" x2="140" y2="5" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Đĩa bánh Trung Thu nướng hoa văn chạm khắc bên cạnh -->
      <g transform="translate(340, 260)">
        <ellipse cx="25" cy="20" rx="25" ry="14" fill="#DDA15E" stroke="#2C2016" stroke-width="3"/>
        <circle cx="25" cy="20" r="8" fill="#BC6C25"/>
      </g>`
  ),
  "fest-cherry-blossom-matsuri": makeScene(
    "festcherryblossommatsuri",
    "Lễ Hội Hoa Anh Đào Dưới Núi Phú Sĩ",
    "🌸",
    "#FFCAD4",
    ["#E0F2FE","#FFF0F5","#FFCCD5"],
    `<!-- Núi Phú Sĩ tuyết phủ trắng đỉnh trên nền trời xuân -->
      <polygon points="170,180 250,70 330,180" fill="#457B9D" stroke="#2C2016" stroke-width="3.5"/>
      <polygon points="230,100 250,70 270,100" fill="#FFFDF9"/>`,
    `<!-- Bờ hồ hoa anh đào nở rộ soi bóng nước -->
      <path d="M8,210 Q250,190 492,210 L492,367 L8,367 Z" fill="#BDE0FE" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cổng Torii đỏ rực và cành anh đào cổ thụ nở bung cánh -->
      <g transform="translate(150, 95)">
        <!-- Cổng Torii thần đạo truyền thống -->
        <rect x="25" y="35" width="130" height="14" rx="4" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <rect x="35" y="55" width="110" height="10" fill="#E63946" stroke="#2C2016" stroke-width="3"/>
        <line x1="50" y1="35" x2="50" y2="155" stroke="#E63946" stroke-width="12"/>
        <line x1="50" y1="35" x2="50" y2="155" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="130" y1="35" x2="130" y2="155" stroke="#E63946" stroke-width="12"/>
        <line x1="130" y1="35" x2="130" y2="155" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Chùm hoa anh đào hồng thắm rủ trước cổng -->
        <circle cx="35" cy="50" r="16" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="35" cy="50" r="6" fill="#FFF1C5"/>
        <circle cx="145" cy="45" r="16" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="145" cy="45" r="6" fill="#FFF1C5"/>
      </g>`,
    `<!-- Cánh hoa rơi bồng bềnh trên mặt nước hồ -->
      <ellipse cx="110" cy="270" rx="8" ry="5" fill="#FFCAD4" stroke="#2C2016" stroke-width="1.5"/>
      <ellipse cx="380" cy="280" rx="8" ry="5" fill="#FFCAD4" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "fest-christmas-tree": makeScene(
    "festchristmastree",
    "Cây Thông Noel Ngập Quà Tặng",
    "🎄",
    "#E63946",
    ["#0B2545","#134074","#1D2D44"],
    `<!-- Phòng khách ấm cúng đêm Giáng Sinh rực rỡ đèn sao -->
      <circle cx="80" cy="40" r="2.5" fill="#FFFDF9"/>
      <circle cx="420" cy="45" r="3" fill="#FFFDF9"/>`,
    `<!-- Sàn gỗ phòng khách trải thảm đỏ Noel -->
      <rect x="8" y="240" width="484" height="127" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="170" ry="40" fill="#E63946" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây thông xanh 3 tầng lộng lẫy ngôi sao vàng và vô số hộp quà -->
      <g transform="translate(160, 45)">
        <!-- Tầng 1 (đỉnh thông) -->
        <polygon points="90,40 50,90 130,90" fill="#2D6A4F" stroke="#2C2016" stroke-width="4"/>
        <!-- Tầng 2 (giữa) -->
        <polygon points="90,75 35,140 145,140" fill="#2D6A4F" stroke="#2C2016" stroke-width="4"/>
        <!-- Tầng 3 (đáy) -->
        <polygon points="90,120 20,195 160,195" fill="#2D6A4F" stroke="#2C2016" stroke-width="4"/>
        <!-- Thân cây thông -->
        <rect x="75" y="195" width="30" height="30" fill="#6F4E37" stroke="#2C2016" stroke-width="3"/>
        <!-- Ngôi sao vàng sáng lấp lánh trên đỉnh -->
        <polygon points="90,15 94,28 107,28 97,36 100,49 90,41 80,49 83,36 73,28 86,28" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Quả cầu châu đỏ, vàng, bạc đính trên cành -->
        <circle cx="70" cy="85" r="7" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
        <circle cx="110" cy="85" r="7" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
        <circle cx="55" cy="135" r="8" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
        <circle cx="125" cy="135" r="8" fill="#457B9D" stroke="#2C2016" stroke-width="2"/>
        <circle cx="45" cy="185" r="9" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
        <circle cx="135" cy="185" r="9" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Hộp quà thắt nơ đỏ vàng dưới gốc cây thông -->
      <g transform="translate(110, 250)">
        <rect x="10" y="15" width="40" height="35" rx="4" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <line x1="30" y1="15" x2="30" y2="50" stroke="#E63946" stroke-width="5"/>
      </g>
      <g transform="translate(340, 245)">
        <rect x="10" y="20" width="45" height="40" rx="4" fill="#457B9D" stroke="#2C2016" stroke-width="3"/>
        <line x1="32" y1="20" x2="32" y2="60" stroke="#FFFDF9" stroke-width="5"/>
      </g>`
  ),
  "fest-diwali-lights": makeScene(
    "festdiwalilights",
    "Đèn Dầu Rangoli Lễ Hội Ánh Sáng",
    "🪔",
    "#E76F51",
    ["#2B2D42","#8D0801","#F4A261"],
    `<!-- Bầu trời đêm ngập tràn pháo sáng rực rỡ -->
      <circle cx="90" cy="60" r="3" fill="#FFE599"/>
      <circle cx="410" cy="60" r="3" fill="#FFE599"/>`,
    `<!-- Hoa văn cát màu Rangoli hình mạn-đà-la trên sàn cung điện -->
      <rect x="8" y="210" width="484" height="157" fill="#E76F51" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="190" ry="55" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="150" ry="42" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Chiếc đèn dầu đất nung Diya cháy ngọn lửa ấm áp giữa đóa hoa sen -->
      <g transform="translate(170, 130)">
        <!-- Đèn đất sét Diya uốn lượn truyền thống -->
        <path d="M20,95 Q80,125 140,95 Q150,75 80,75 Q10,75 20,95 Z" fill="#DDA15E" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Ngọn lửa đèn bập bùng thiêng liêng -->
        <path d="M80,75 C60,45 65,15 80,-5 C95,15 100,45 80,75 Z" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M80,70 C70,50 72,30 80,15 C88,30 90,50 80,70 Z" fill="#E76F51"/>
      </g>`,
    `<!-- Cánh hoa cúc vạn thọ cam rải viền quanh đèn -->
      <circle cx="90" cy="280" r="8" fill="#F4A261" stroke="#2C2016" stroke-width="2"/>
      <circle cx="410" cy="280" r="8" fill="#F4A261" stroke="#2C2016" stroke-width="2"/>`
  ),
  "fest-venice-carnival": makeScene(
    "festvenicecarnival",
    "Mặt Nạ Lễ Hội Venice Quý Phái",
    "🎭",
    "#DFCCF1",
    ["#14213D","#4A4E69","#9A8C98"],
    `<!-- Đêm hội hóa trang Venice nguy nga lộng lẫy -->
      <circle cx="100" cy="50" r="2.5" fill="#FFFDF9"/>`,
    `<!-- Ban công đá cẩm thạch nhìn ra kênh đào Venice -->
      <rect x="8" y="240" width="484" height="127" fill="#22223B" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="270" x2="492" y2="270" stroke="#FFE599" stroke-width="3"/>`,
    `<!-- Mặt nạ dạ hội Venice dát vàng đính lông vũ công lộng lẫy -->
      <g transform="translate(160, 85)">
        <!-- Mặt nạ mắt sứ trắng viền vàng quý phái -->
        <path d="M15,95 Q80,135 145,95 Q165,55 125,55 Q80,75 35,55 Q-5,55 15,95 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Hai hốc mắt mèo xếch quyến rũ -->
        <ellipse cx="45" cy="85" rx="18" ry="10" fill="#22223B" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="115" cy="85" rx="18" ry="10" fill="#22223B" stroke="#2C2016" stroke-width="3"/>
        <!-- Chùm lông vũ công hoàng gia vươn cao -->
        <path d="M80,55 Q50,-10 65,-25 Q80,-10 80,55" fill="#2A9D8F" stroke="#2C2016" stroke-width="3"/>
        <path d="M80,55 Q90,-20 105,-30 Q105,-5 80,55" fill="#E76F51" stroke="#2C2016" stroke-width="3"/>
        <path d="M80,55 Q130,5 140,-5 Q125,25 80,55" fill="#9A8C98" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Dây ruy băng lụa buông dài lấp lánh kim tuyến -->
      <path d="M140,240 Q180,290 220,250" stroke="#FFE599" stroke-width="3" fill="none"/>`
  ),
  "fest-lantern-floating": makeScene(
    "festlanternfloating",
    "Thả Hoa Đăng Cầu An Bên Sông",
    "🪷",
    "#F4ACB7",
    ["#0B132B","#1C2541","#3A506B"],
    `<!-- Đêm rằm trăng thanh gió mát soi bóng dòng sông -->
      <circle cx="100" cy="70" r="35" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Mặt sông phẳng lặng trôi hàng trăm đốm sáng lung linh -->
      <rect x="8" y="190" width="484" height="177" fill="#1C2541" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,220 Q250,200 492,220" stroke="#FFE599" stroke-width="2" opacity="0.6"/>`,
    `<!-- Bông hoa đăng sen nở 8 cánh mang ngọn nến sáng trôi trên sông -->
      <g transform="translate(150, 150)">
        <!-- Cánh hoa sen hồng nhiều lớp -->
        <path d="M20,70 Q100,105 180,70" stroke="#2C2016" stroke-width="4" fill="none"/>
        <ellipse cx="100" cy="80" rx="75" ry="25" fill="#FFCAD4" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="50" cy="70" r="16" fill="#F4ACB7" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="150" cy="70" r="16" fill="#F4ACB7" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="100" cy="65" r="18" fill="#FFCCD5" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Ngọn nến lung linh giữa nhụy sen -->
        <rect x="94" y="45" width="12" height="20" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        <path d="M100,45 C95,35 95,20 100,10 C105,20 105,35 100,45 Z" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Những đốm hoa đăng nhỏ trôi xa xa -->
      <circle cx="70" cy="240" r="6" fill="#FFE599"/>
      <circle cx="410" cy="230" r="6" fill="#FFE599"/>`
  ),
  "lib-spiral-staircase": makeScene(
    "libspiralstaircase",
    "Thư Viện Cổ Cầu Thang Xoắn Ốc",
    "📚",
    "#A0522D",
    ["#EBDDD4","#DDBEA9","#6F4E37"],
    `<!-- Mái vòm thư viện cổ kính hoa văn kính ghép -->
      <path d="M40,20 Q250,-10 460,20" stroke="#2C2016" stroke-width="3.5" fill="none"/>`,
    `<!-- Sàn gỗ thư viện và giá sách cao tầng -->
      <rect x="8" y="240" width="484" height="127" fill="#6F4E37" stroke="#2C2016" stroke-width="3.5"/>
      <rect x="40" y="30" width="120" height="210" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>
      <rect x="340" y="30" width="120" height="210" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cầu thang xoắn ốc bằng gỗ và sắt rèn uốn lượn tinh xảo -->
      <g transform="translate(180, 50)">
        <!-- Trụ đứng trung tâm -->
        <line x1="70" y1="20" x2="70" y2="230" stroke="#2C2016" stroke-width="8"/>
        <!-- Các bậc thang xoắn tỏa tròn xuống dưới -->
        <ellipse cx="70" cy="50" rx="55" ry="12" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="70" cy="85" rx="55" ry="12" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="70" cy="120" rx="55" ry="12" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="70" cy="155" rx="55" ry="12" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="70" cy="190" rx="55" ry="12" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Chồng sách bìa da dày cộp đặt dưới chân cầu thang -->
      <g transform="translate(100, 260)">
        <rect x="10" y="25" width="55" height="15" rx="4" fill="#C1121F" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="15" y="10" width="45" height="15" rx="4" fill="#2A9D8F" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "lib-botany-herbarium": makeScene(
    "libbotanyherbarium",
    "Cuốn Sách Ép Hoa Thảo Mộc",
    "🌿",
    "#52B788",
    ["#FEFAE0","#FAEDCD","#CCD5AE"],
    `<!-- Góc bàn làm việc của nhà thực vật học cổ điển -->
      <circle cx="100" cy="50" r="3" fill="#D4A373"/>`,
    `<!-- Bàn làm việc gỗ sồi nâu ấm -->
      <rect x="8" y="220" width="484" height="147" fill="#D4A373" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="42" fill="#FAEDCD" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Quyển sổ da mở rộng trang ép nhành dương xỉ và hoa pansy -->
      <g transform="translate(140, 110)">
        <!-- Bìa sổ da nâu mở toang 2 trang -->
        <rect x="15" y="25" width="95" height="120" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <rect x="110" y="25" width="95" height="120" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <line x1="110" y1="25" x2="110" y2="145" stroke="#BC6C25" stroke-width="4"/>
        <!-- Nhành lá dương xỉ ép khô trang trái -->
        <line x1="60" y1="130" x2="60" y2="45" stroke="#52B788" stroke-width="3"/>
        <ellipse cx="50" cy="65" rx="8" ry="4" fill="#74C69D" transform="rotate(-30, 50, 65)"/>
        <ellipse cx="70" cy="65" rx="8" ry="4" fill="#74C69D" transform="rotate(30, 70, 65)"/>
        <ellipse cx="50" cy="85" rx="9" ry="4" fill="#74C69D" transform="rotate(-30, 50, 85)"/>
        <ellipse cx="70" cy="85" rx="9" ry="4" fill="#74C69D" transform="rotate(30, 70, 85)"/>
        <!-- Đóa hoa pansy tím vàng ép khô trang phải -->
        <circle cx="155" cy="75" r="16" fill="#7E57C2" stroke="#2C2016" stroke-width="2"/>
        <circle cx="155" cy="75" r="6" fill="#FFE599"/>
        <!-- Nhãn ghi chú dán băng keo cổ điển -->
        <rect x="135" y="110" width="45" height="18" fill="#FAEDCD" stroke="#2C2016" stroke-width="1.5"/>
      </g>`,
    `<!-- Kính lúp phóng đại cán đồng cổ điển -->
      <g transform="translate(340, 240)">
        <circle cx="25" cy="25" r="22" fill="#E0F2FE" stroke="#2C2016" stroke-width="3" opacity="0.8"/>
        <line x1="40" y1="40" x2="65" y2="65" stroke="#BC6C25" stroke-width="6" stroke-linecap="round"/>
        <line x1="40" y1="40" x2="65" y2="65" stroke="#2C2016" stroke-width="2.5" stroke-linecap="round"/>
      </g>`
  ),
  "lib-magical-book-wings": makeScene(
    "libmagicalbookwings",
    "Quyển Sách Bay Tỏa Đốm Sáng",
    "✨",
    "#DFCCF1",
    ["#1D3557","#457B9D","#C7B9FF"],
    `<!-- Không gian thư viện phép thuật với những trang sách bay -->
      <circle cx="100" cy="50" r="3" fill="#FFE599"/>
      <circle cx="400" cy="60" r="3" fill="#FFE599"/>`,
    `<!-- Bục đọc sách đá cẩm thạch phát quang -->
      <rect x="8" y="240" width="484" height="127" fill="#457B9D" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="170" ry="40" fill="#C7B9FF" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Cuốn sách ma thuật mở toang đập cánh lông vũ bay lượn -->
      <g transform="translate(150, 95)">
        <!-- Sách mở ở giữa -->
        <path d="M40,90 Q100,105 100,80 Q100,105 160,90 L160,125 Q100,140 100,115 Q100,140 40,125 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <line x1="100" y1="80" x2="100" y2="115" stroke="#2C2016" stroke-width="3"/>
        <!-- Đôi cánh thiên thần trắng muốt sải rộng 2 bên bìa sách -->
        <path d="M40,90 C0,30 -30,60 0,110 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M160,90 C200,30 230,60 200,110 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Đốm sáng ma thuật vàng kim bay ra từ trang sách -->
        <circle cx="100" cy="60" r="5" fill="#FFE599"/>
        <circle cx="85" cy="40" r="3.5" fill="#FFE599"/>
        <circle cx="115" cy="45" r="4" fill="#FFE599"/>
      </g>`,
    `<!-- Cuộn giấy da niêm phong dấu sáp đỏ -->
      <g transform="translate(100, 270)">
        <rect x="10" y="10" width="45" height="18" rx="4" fill="#FAEDCD" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="32" cy="19" r="6" fill="#E63946"/>
      </g>`
  ),
  "lib-sunlit-reading-nook": makeScene(
    "libsunlitreadingnook",
    "Góc Đọc Sách Ngập Tràn Nắng Chiều",
    "🪟",
    "#F4A261",
    ["#FFF1C5","#FFE5D9","#D8E2DC"],
    `<!-- Ánh nắng vàng xiên qua khung cửa sổ kính lớn -->
      <polygon points="120,8 180,8 260,240 200,240" fill="#FFF1C5" opacity="0.35"/>`,
    `<!-- Bệ cửa sổ xây bằng gỗ với đệm ngồi êm ái và gối ôm -->
      <rect x="8" y="210" width="484" height="157" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <rect x="40" y="195" width="420" height="35" rx="8" fill="#BDE0FE" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chú mèo cuộn tròn ngủ trên gối bên cạnh cuốn sách và ly trà -->
      <g transform="translate(160, 130)">
        <!-- Chiếc gối tựa lưng êm ái hoa văn kẻ sọc -->
        <rect x="20" y="30" width="55" height="45" rx="10" fill="#FFCAD4" stroke="#2C2016" stroke-width="3"/>
        <!-- Mèo cam cuộn tròn ngủ say -->
        <ellipse cx="105" cy="60" rx="30" ry="20" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="125" cy="52" r="14" fill="#F4A261" stroke="#2C2016" stroke-width="3"/>
        <polygon points="120,40 125,30 130,42" fill="#E76F51"/>
        <polygon points="132,40 137,30 142,42" fill="#E76F51"/>
        <!-- Tách trà sứ bốc hơi ấm -->
        <ellipse cx="165" cy="65" rx="15" ry="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <path d="M150,55 C150,70 180,70 180,55 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Chậu sen đá nhỏ trên bệ cửa sổ -->
      <g transform="translate(80, 250)">
        <path d="M5,15 L35,15 L30,40 L10,40 Z" fill="#E29578" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="20" cy="10" r="12" fill="#74C69D" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "lib-miniature-bookshop": makeScene(
    "libminiaturebookshop",
    "Tiệm Sách Tí Hon Bằng Gỗ",
    "🏠",
    "#BC6C25",
    ["#EBDDD4","#DDBEA9","#BC6C25"],
    `<!-- Đèn đường phong cách châu Âu thắp sáng đầu hẻm -->
      <circle cx="100" cy="50" r="3" fill="#FFE599"/>`,
    `<!-- Con hẻm lát đá nhỏ trước cửa tiệm sách tí hon -->
      <rect x="8" y="240" width="484" height="127" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="180" ry="35" fill="#495057" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Mặt tiền tiệm sách bằng gỗ cổ kính có mái hiên sọc và cửa kính vòm -->
      <g transform="translate(140, 85)">
        <!-- Khung nhà gỗ sồi ấm áp -->
        <rect x="25" y="35" width="170" height="135" fill="#8B5A2B" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Mái hiên sọc xanh trắng -->
        <polygon points="15,35 205,35 190,65 30,65" fill="#2A9D8F" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Cửa ra vào bằng kính vòm cổ -->
        <rect x="110" y="85" width="45" height="85" rx="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Cửa sổ trưng bày sách ngập tràn ánh đèn vàng -->
        <rect x="40" y="85" width="55" height="55" rx="6" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <line x1="45" y1="125" x2="90" y2="125" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Biển hiệu tiệm sách gỗ hình cuốn sách -->
      <g transform="translate(340, 230)">
        <rect x="10" y="10" width="40" height="28" rx="4" fill="#DDBEA9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "lib-quill-parchment": makeScene(
    "libquillparchment",
    "Bình Mực & Bút Lông Vũ Cổ",
    "🪶",
    "#6F4E37",
    ["#EBDDD4","#DDBEA9","#6F4E37"],
    `<!-- Ánh nến bập bùng trong thư phòng học giả -->
      <circle cx="80" cy="50" r="3" fill="#FFE599"/>`,
    `<!-- Bàn viết gỗ gụ cổ phủ khăn nỉ xanh lục -->
      <rect x="8" y="210" width="484" height="157" fill="#2D6A4F" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="45" fill="#FAEDCD" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chiếc bút lông thiên nga trắng muốt cắm trong bình mực sứ -->
      <g transform="translate(150, 95)">
        <!-- Bình mực thủy tinh góc cạnh chứa mực đen -->
        <rect x="45" y="85" width="45" height="50" rx="8" fill="#2C2016" stroke="#2C2016" stroke-width="4"/>
        <rect x="55" y="70" width="25" height="15" rx="3" fill="#DDBEA9" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Cây bút lông ngỗng dài duyên dáng -->
        <path d="M70,80 C60,40 100,5 140,-5 C125,25 105,65 70,80 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="70" y1="80" x2="140" y2="-5" stroke="#BC6C25" stroke-width="2.5"/>
        <!-- Cuộn giấy da cừu viết dở những dòng thơ -->
        <rect x="105" y="95" width="85" height="55" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <line x1="115" y1="110" x2="175" y2="110" stroke="#6F4E37" stroke-width="2" stroke-dasharray="3,3"/>
        <line x1="115" y1="125" x2="165" y2="125" stroke="#6F4E37" stroke-width="2" stroke-dasharray="3,3"/>
      </g>`,
    `<!-- Con dấu niêm phong đồng đỏ -->
      <g transform="translate(340, 260)">
        <rect x="10" y="10" width="16" height="25" rx="3" fill="#E76F51" stroke="#2C2016" stroke-width="2"/>
        <circle cx="18" cy="10" r="7" fill="#FFE599"/>
      </g>`
  ),
  "toy-snow-globe-village": makeScene(
    "toysnowglobevillage",
    "Quả Cầu Tuyết Ngôi Làng Tí Hon",
    "🔮",
    "#A2D2FF",
    ["#E0F2FE","#BDE0FE","#D8E2DC"],
    `<!-- Mưa tuyết lấp lánh trong quả cầu pha lê -->
      <circle cx="120" cy="50" r="3" fill="#FFFDF9"/>
      <circle cx="380" cy="60" r="3" fill="#FFFDF9"/>`,
    `<!-- Kệ gỗ trưng bày bóng loáng -->
      <rect x="8" y="240" width="484" height="127" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Quả cầu tuyết thủy tinh trong suốt ôm trọn ngôi làng nhỏ -->
      <g transform="translate(140, 65)">
        <!-- Đế gỗ tròn khắc hoa văn -->
        <rect x="40" y="190" width="140" height="35" rx="10" fill="#6F4E37" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Quả cầu thủy tinh tròn xoe -->
        <circle cx="110" cy="105" r="95" fill="#E0F2FE" stroke="#2C2016" stroke-width="5" opacity="0.85"/>
        <!-- Ngôi nhà mái đỏ tí hon bên trong cầu tuyết -->
        <rect x="85" y="110" width="50" height="40" fill="#A0522D" stroke="#2C2016" stroke-width="3"/>
        <polygon points="75,110 110,80 145,110" fill="#E63946" stroke="#2C2016" stroke-width="3"/>
        <!-- Cây thông Noel nhỏ cạnh nhà -->
        <polygon points="65,115 50,145 80,145" fill="#2D6A4F" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Hạt tuyết trắng bay xoay vòng trong cầu -->
        <circle cx="80" cy="70" r="3" fill="#FFFDF9"/>
        <circle cx="140" cy="65" r="3" fill="#FFFDF9"/>
        <circle cx="130" cy="130" r="3" fill="#FFFDF9"/>
      </g>`,
    `<!-- Quả thông khô và ruy băng đỏ cạnh chân quả cầu -->
      <g transform="translate(80, 260)">
        <circle cx="20" cy="20" r="14" fill="#6F4E37" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "toy-music-box-ballerina": makeScene(
    "toymusicboxballerina",
    "Hộp Nhạc Vũ Công Xoay Tròn",
    "🩰",
    "#F4ACB7",
    ["#FFF0F5","#FDE2E4","#FFCAD4"],
    `<!-- Nốt nhạc bay bổng từ hộp nhạc cổ -->
      <circle cx="120" cy="40" r="4" fill="#F4ACB7"/>
      <circle cx="380" cy="50" r="4" fill="#F4ACB7"/>`,
    `<!-- Bàn trang điểm nhung hồng thanh lịch -->
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="170" ry="38" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Hộp nhạc gỗ mở nắp và nàng vũ công ba-lê xoay tròn trên gương -->
      <g transform="translate(150, 80)">
        <!-- Hộp nhạc chữ nhật viền vàng -->
        <rect x="25" y="115" width="150" height="60" rx="8" fill="#8B5A2B" stroke="#2C2016" stroke-width="4.5"/>
        <rect x="40" y="105" width="120" height="15" rx="4" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Nàng vũ công ba-lê váy xoè bồng bềnh kiễng chân -->
        <ellipse cx="100" cy="75" rx="25" ry="10" fill="#FFCAD4" stroke="#2C2016" stroke-width="3"/>
        <circle cx="100" cy="35" r="12" fill="#FFE5D9" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="100" y1="47" x2="100" y2="75" stroke="#2C2016" stroke-width="3"/>
        <line x1="95" y1="85" x2="95" y2="105" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="105" y1="85" x2="105" y2="105" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Chuỗi ngọc trai trắng vắt qua mép hộp -->
      <circle cx="140" cy="265" r="5" fill="#FFFDF9" stroke="#2C2016" stroke-width="1.5"/>
      <circle cx="152" cy="268" r="5" fill="#FFFDF9" stroke="#2C2016" stroke-width="1.5"/>
      <circle cx="164" cy="270" r="5" fill="#FFFDF9" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "toy-vintage-carousel": makeScene(
    "toyvintagecarousel",
    "Ngựa Gỗ Đu Quay Công Viên Cũ",
    "🎠",
    "#E76F51",
    ["#FFF1C5","#FFD1DC","#A2D2FF"],
    `<!-- Mái vòm đu quay lọng lẫy cờ hoa rực rỡ -->
      <polygon points="120,40 250,5 380,40" fill="#E63946" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Sàn gỗ tròn đu quay hội chợ -->
      <rect x="8" y="240" width="484" height="127" fill="#DDA15E" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chú ngựa gỗ bạch mã yên cương mạ vàng gắn trên cột đồng xoắn -->
      <g transform="translate(160, 65)">
        <!-- Cột đồng xoắn óc đứng thẳng -->
        <line x1="90" y1="10" x2="90" y2="210" stroke="#FFE599" stroke-width="8"/>
        <line x1="90" y1="10" x2="90" y2="210" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Chú ngựa gỗ phi nước đại oai vệ -->
        <ellipse cx="90" cy="120" rx="55" ry="32" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Đầu và cổ ngựa vươn cao -->
        <path d="M125,115 Q145,75 160,85 Q150,115 130,125 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="155" cy="90" r="14" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Yên ngựa nhung đỏ thêu chỉ vàng -->
        <rect x="75" y="105" width="30" height="20" rx="4" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Bờm ngựa vàng bay trong gió -->
        <path d="M135,70 Q120,80 130,100" stroke="#FFE599" stroke-width="6" fill="none"/>
      </g>`,
    `<!-- Hạt bóng bay ngũ sắc bay lơ lửng -->
      <circle cx="80" cy="270" r="16" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>`
  ),
  "toy-teddy-bear-picnic": makeScene(
    "toyteddybearpicnic",
    "Chú Gấu Bông Dã Ngoại Khăn Ca-rô",
    "🧸",
    "#BC6C25",
    ["#E0F2FE","#FFF0F5","#D8F3DC"],
    `<!-- Nắng dã ngoại công viên xanh mát mẻ -->
      <circle cx="380" cy="60" r="30" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Bãi cỏ xanh và thảm trải dã ngoại ca-rô đỏ trắng -->
      <rect x="8" y="240" width="484" height="127" fill="#74C69D" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="170" ry="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="155" ry="36" fill="#E63946" opacity="0.3"/>`,
    `<!-- Chú gấu bông lông xù thắt nơ ngồi ngoan bên giỏ bánh quy -->
      <g transform="translate(170, 110)">
        <!-- Thân gấu bông tròn mập -->
        <ellipse cx="70" cy="110" rx="50" ry="42" fill="#BC6C25" stroke="#2C2016" stroke-width="4"/>
        <ellipse cx="70" cy="110" rx="30" ry="25" fill="#DDBEA9"/>
        <!-- Đầu gấu tròn và hai tai xinh -->
        <circle cx="70" cy="55" r="38" fill="#BC6C25" stroke="#2C2016" stroke-width="4"/>
        <circle cx="40" cy="25" r="14" fill="#BC6C25" stroke="#2C2016" stroke-width="3"/>
        <circle cx="40" cy="25" r="6" fill="#DDBEA9"/>
        <circle cx="100" cy="25" r="14" fill="#BC6C25" stroke="#2C2016" stroke-width="3"/>
        <circle cx="100" cy="25" r="6" fill="#DDBEA9"/>
        <!-- Mặt gấu khâu chỉ đen thân thiện -->
        <ellipse cx="70" cy="65" rx="16" ry="12" fill="#DDBEA9"/>
        <circle cx="70" cy="60" r="5" fill="#2C2016"/>
        <circle cx="55" cy="50" r="4" fill="#2C2016"/>
        <circle cx="85" cy="50" r="4" fill="#2C2016"/>
        <!-- Nơ cổ đỏ thắt điệu đà -->
        <polygon points="60,85 80,85 70,95" fill="#E63946"/>
      </g>`,
    `<!-- Tách trà đồ chơi mini và bánh quy gừng -->
      <g transform="translate(100, 260)">
        <ellipse cx="20" cy="15" rx="16" ry="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "toy-wooden-train": makeScene(
    "toywoodentrain",
    "Đoàn Tàu Gỗ Băng Qua Rừng Thông",
    "🚂",
    "#E63946",
    ["#E8F8F5","#D8F3DC","#B7E4C7"],
    `<!-- Rừng thông đồ chơi xanh biếc -->
      <polygon points="80,180 100,100 120,180" fill="#2D6A4F" stroke="#2C2016" stroke-width="2.5"/>
      <polygon points="380,180 400,90 420,180" fill="#2D6A4F" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Đường ray gỗ uốn lượn nối khớp nhau -->
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="260" x2="492" y2="260" stroke="#8B5A2B" stroke-width="5"/>
      <line x1="8" y1="280" x2="492" y2="280" stroke="#8B5A2B" stroke-width="5"/>`,
    `<!-- Đầu tàu hơi nước bằng gỗ sơn đỏ vàng kéo theo toa chở gỗ -->
      <g transform="translate(130, 140)">
        <!-- Đầu tàu kéo hình khối gỗ tròn -->
        <rect x="80" y="30" width="75" height="50" rx="8" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <rect x="125" y="10" width="40" height="70" rx="6" fill="#F4A261" stroke="#2C2016" stroke-width="4"/>
        <!-- Ống khói gỗ nhả cụm khói tròn -->
        <rect x="95" y="10" width="16" height="20" fill="#2C2016"/>
        <circle cx="103" cy="-5" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        <!-- Toa chở gỗ phía sau -->
        <rect x="15" y="45" width="55" height="35" rx="6" fill="#457B9D" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Bánh xe gỗ tròn lăn bánh -->
        <circle cx="35" cy="85" r="14" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <circle cx="65" cy="85" r="14" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <circle cx="100" cy="85" r="14" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <circle cx="145" cy="85" r="16" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Khối gỗ đồ chơi xếp hình vuông tròn -->
      <rect x="90" y="275" width="20" height="20" fill="#E63946" stroke="#2C2016" stroke-width="2"/>`
  ),
  "toy-paper-origami-crane": makeScene(
    "toypaperorigamicrane",
    "Đàn Hạc Giấy Cầu May Mắn",
    "🕊️",
    "#48CAE4",
    ["#FFF0F5","#E8D7F1","#CAF0F8"],
    `<!-- Họa tiết giấy gấp Washi Nhật Bản tao nhã -->
      <circle cx="100" cy="50" r="4" fill="#FFCAD4"/>
      <circle cx="380" cy="60" r="4" fill="#BDE0FE"/>`,
    `<!-- Chiếu tatami truyền thống thanh tịnh -->
      <rect x="8" y="240" width="484" height="127" fill="#E9EDC9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chú hạc giấy origami lớn màu xanh ngọc sải cánh cùng đàn hạc con -->
      <g transform="translate(160, 90)">
        <!-- Thân và cánh hạc gấp nếp sắc sảo -->
        <polygon points="90,30 20,70 90,110" fill="#90E0EF" stroke="#2C2016" stroke-width="4"/>
        <polygon points="90,30 160,70 90,110" fill="#0077B6" stroke="#2C2016" stroke-width="4"/>
        <polygon points="90,110 30,140 90,95" fill="#48CAE4" stroke="#2C2016" stroke-width="3"/>
        <!-- Đầu và mỏ hạc gấp nhọn -->
        <polygon points="90,30 95,0 85,15" fill="#023E8A" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Dây chỉ xâu chuỗi hạc giấy ngũ sắc treo rủ -->
      <g transform="translate(90, 250)">
        <polygon points="20,15 5,30 20,40" fill="#FFCAD4" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "art-easel-canvas": makeScene(
    "arteaselcanvas",
    "Khung Vẽ Tranh Sơn Dầu Ngoài Trời",
    "🎨",
    "#F4A261",
    ["#E0F2FE","#FFF1C5","#D8F3DC"],
    `<!-- Nắng ấm xưởng vẽ ngoài trời đầy hoa cỏ -->
      <circle cx="390" cy="60" r="30" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Thảm cỏ xanh mát dưới chân giá vẽ -->
      <rect x="8" y="240" width="484" height="127" fill="#74C69D" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Giá vẽ ba chân bằng gỗ sồi đỡ bức tranh phong cảnh đang vẽ dở -->
      <g transform="translate(160, 75)">
        <!-- Khung giá vẽ 3 chân gỗ -->
        <line x1="85" y1="10" x2="35" y2="200" stroke="#8B5A2B" stroke-width="5"/>
        <line x1="85" y1="10" x2="85" y2="200" stroke="#8B5A2B" stroke-width="5"/>
        <line x1="85" y1="10" x2="135" y2="200" stroke="#8B5A2B" stroke-width="5"/>
        <!-- Khung tranh canvas vải bố vuông vức -->
        <rect x="30" y="45" width="110" height="85" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <!-- Bức tranh vẽ ngọn núi và mặt trời -->
        <polygon points="45,115 75,75 105,115" fill="#457B9D"/>
        <circle cx="115" cy="65" r="8" fill="#F4A261"/>
        <!-- Thanh gác cọ và bảng pha màu -->
        <rect x="20" y="125" width="130" height="12" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Bảng pha màu hình hạt đậu có các vệt màu nước rực rỡ -->
      <g transform="translate(100, 260)">
        <ellipse cx="30" cy="20" rx="30" ry="18" fill="#EBDDD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="15" cy="15" r="4" fill="#E63946"/>
        <circle cx="28" cy="12" r="4" fill="#FFE599"/>
        <circle cx="40" cy="18" r="4" fill="#2A9D8F"/>
      </g>`
  ),
  "art-ceramic-pottery": makeScene(
    "artceramicpottery",
    "Bàn Xoay Gốm Mộc Phủ Men Lam",
    "🏺",
    "#457B9D",
    ["#EBDDD4","#DDBEA9","#BC6C25"],
    `<!-- Xưởng gốm thủ công mộc mạc ấm áp -->
      <circle cx="100" cy="50" r="3" fill="#BC6C25"/>`,
    `<!-- Bàn làm việc thợ gốm lấm tấm vệt đất sét -->
      <rect x="8" y="240" width="484" height="127" fill="#A68A64" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Bàn xoay gốm đang nặn bình hoa men lam thanh thoát -->
      <g transform="translate(170, 110)">
        <!-- Đĩa bàn xoay tròn kim loại -->
        <ellipse cx="80" cy="130" rx="75" ry="20" fill="#6C757D" stroke="#2C2016" stroke-width="4"/>
        <!-- Bình gốm đất sét đang được vuốt dáng mềm mại -->
        <path d="M45,120 C35,65 50,45 65,30 L95,30 C110,45 125,65 115,120 Z" fill="#457B9D" stroke="#2C2016" stroke-width="4.5"/>
        <ellipse cx="80" cy="30" rx="16" ry="6" fill="#A8DADC" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="80" cy="120" rx="35" ry="10" fill="#1D3557"/>
      </g>`,
    `<!-- Xốp bọt biển và dao gọt gốm bằng gỗ -->
      <g transform="translate(100, 270)">
        <ellipse cx="20" cy="15" rx="18" ry="10" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "art-watercolor-palette": makeScene(
    "artwatercolorpalette",
    "Bảng Màu Nước Trong Veo Loang Màu",
    "🎨",
    "#48CAE4",
    ["#FFFDF9","#E0F2FE","#FFCAD4"],
    `<!-- Giọt nước trong vắt loang màu kỳ ảo -->
      <circle cx="120" cy="60" r="4" fill="#BDE0FE"/>
      <circle cx="380" cy="50" r="4" fill="#FFCCD5"/>`,
    `<!-- Mặt bàn vẽ gỗ sáng màu -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Hộp màu nước nắp gập kim loại 24 ô màu rực rỡ và cọ vẽ lông thú -->
      <g transform="translate(130, 110)">
        <rect x="25" y="30" width="190" height="95" rx="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Các ô màu nước xinh xắn -->
        <rect x="40" y="45" width="22" height="22" rx="4" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
        <rect x="70" y="45" width="22" height="22" rx="4" fill="#F4A261" stroke="#2C2016" stroke-width="2"/>
        <rect x="100" y="45" width="22" height="22" rx="4" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
        <rect x="130" y="45" width="22" height="22" rx="4" fill="#2A9D8F" stroke="#2C2016" stroke-width="2"/>
        <rect x="160" y="45" width="22" height="22" rx="4" fill="#457B9D" stroke="#2C2016" stroke-width="2"/>
        <rect x="40" y="80" width="22" height="22" rx="4" fill="#9B5DE5" stroke="#2C2016" stroke-width="2"/>
        <rect x="70" y="80" width="22" height="22" rx="4" fill="#F15BB5" stroke="#2C2016" stroke-width="2"/>
        <rect x="100" y="80" width="22" height="22" rx="4" fill="#00BBF9" stroke="#2C2016" stroke-width="2"/>
        <rect x="130" y="80" width="22" height="22" rx="4" fill="#00F5D4" stroke="#2C2016" stroke-width="2"/>
        <rect x="160" y="80" width="22" height="22" rx="4" fill="#6F4E37" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Cọ vẽ lông nhọn vắt ngang và hũ nước rửa cọ -->
      <line x1="80" y1="260" x2="220" y2="230" stroke="#8B5A2B" stroke-width="5" stroke-linecap="round"/>
      <line x1="80" y1="260" x2="220" y2="230" stroke="#2C2016" stroke-width="2" stroke-linecap="round"/>`
  ),
  "art-stained-glass": makeScene(
    "artstainedglass",
    "Kính Màu Ghép Cửa Sổ Giáo Đường",
    "🪟",
    "#E63946",
    ["#E76F51","#2A9D8F","#264653"],
    `<!-- Ánh sáng cầu vồng rọi qua kính ghép đa sắc -->
      <polygon points="100,8 150,8 200,120 150,120" fill="#FFE599" opacity="0.3"/>`,
    `<!-- Tường đá vòm La Mã cổ kính nâng đỡ khung kính -->
      <rect x="8" y="240" width="484" height="127" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Khung cửa sổ kính ghép hoa hồng rosette rực rỡ nghìn màu -->
      <g transform="translate(150, 45)">
        <circle cx="100" cy="100" r="85" fill="#FFFDF9" stroke="#2C2016" stroke-width="6"/>
        <!-- Các nan viền chì chia mảng màu hoa hồng -->
        <circle cx="100" cy="100" r="30" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <path d="M100,15 L100,185" stroke="#2C2016" stroke-width="4"/>
        <path d="M15,100 L185,100" stroke="#2C2016" stroke-width="4"/>
        <path d="M40,40 L160,160" stroke="#2C2016" stroke-width="4"/>
        <path d="M40,160 L160,40" stroke="#2C2016" stroke-width="4"/>
        <!-- Các mảng kính màu xanh, vàng, tím ghép nối -->
        <circle cx="100" cy="55" r="12" fill="#457B9D"/>
        <circle cx="100" cy="145" r="12" fill="#457B9D"/>
        <circle cx="55" cy="100" r="12" fill="#FFE599"/>
        <circle cx="145" cy="100" r="12" fill="#FFE599"/>
      </g>`,
    `<!-- Bệt sáng cầu vồng đổ xuống nền đá giáo đường -->
      <ellipse cx="250" cy="290" rx="90" ry="25" fill="#FFE599" opacity="0.4"/>`
  ),
  "art-embroidery-hoop": makeScene(
    "artembroideryhoop",
    "Khung Thêu Hoa Nhỏ Bằng Chỉ Tơ",
    "🪡",
    "#F4ACB7",
    ["#FFF0F5","#FDE2E4","#D8E2DC"],
    `<!-- Góc may vá dịu dàng nữ tính -->
      <circle cx="100" cy="40" r="3" fill="#F4ACB7"/>`,
    `<!-- Khăn trải bàn ren trắng và kéo cắt chỉ chim hạc -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="40" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Khung thêu tròn bằng tre căng vải lanh thêu hoa cúc và lá xanh -->
      <g transform="translate(150, 85)">
        <!-- Vòng khung tre tròn đôi có ốc vít đồng vặn chặt -->
        <circle cx="100" cy="100" r="80" fill="#FFFDF9" stroke="#8B5A2B" stroke-width="10"/>
        <circle cx="100" cy="100" r="80" fill="none" stroke="#2C2016" stroke-width="4"/>
        <rect x="90" y="12" width="20" height="12" rx="3" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>
        <!-- Hoa cúc thêu nổi bằng chỉ tơ hồng phấn -->
        <circle cx="100" cy="100" r="18" fill="#F4ACB7" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="100" cy="100" r="7" fill="#FFE599"/>
        <!-- Lá xanh thêu mũi satin lá lúa -->
        <ellipse cx="75" cy="85" rx="14" ry="7" fill="#74C69D" transform="rotate(-30, 75, 85)"/>
        <ellipse cx="125" cy="115" rx="14" ry="7" fill="#74C69D" transform="rotate(30, 125, 115)"/>
      </g>`,
    `<!-- Cuộn chỉ thêu màu pastel và kim thêu sáng bóng -->
      <g transform="translate(90, 260)">
        <rect x="10" y="10" width="30" height="15" rx="4" fill="#FFCAD4" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "art-knitting-wool-basket": makeScene(
    "artknittingwoolbasket",
    "Giỏ Len Cuộn & Đôi Que Đan",
    "🧶",
    "#E76F51",
    ["#EBDDD4","#FFE5D9","#FFCAD4"],
    `<!-- Căn phòng ấm áp mùa đông bên lò sưởi -->
      <circle cx="120" cy="50" r="3" fill="#E76F51"/>`,
    `<!-- Thảm len tròn dệt tay êm ái -->
      <rect x="8" y="220" width="484" height="147" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="180" ry="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Giỏ mây đan tròn đầy ắp những cuộn len sắc màu và đôi que đan gỗ -->
      <g transform="translate(150, 100)">
        <!-- Giỏ mây đan nan tre -->
        <path d="M25,65 L175,65 L155,140 L45,140 Z" fill="#DDA15E" stroke="#2C2016" stroke-width="4"/>
        <line x1="25" y1="90" x2="175" y2="90" stroke="#BC6C25" stroke-width="2"/>
        <line x1="35" y1="115" x2="165" y2="115" stroke="#BC6C25" stroke-width="2"/>
        <!-- Cuộn len hồng to tròn -->
        <circle cx="70" cy="55" r="28" fill="#F4ACB7" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Cuộn len vàng cam -->
        <circle cx="125" cy="55" r="28" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Cuộn len xanh bạc hà ở giữa -->
        <circle cx="100" cy="40" r="24" fill="#74C69D" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Đôi que đan bằng gỗ cắm chéo -->
        <line x1="30" y1="-5" x2="150" y2="105" stroke="#8B5A2B" stroke-width="4.5" stroke-linecap="round"/>
        <line x1="170" y1="-5" x2="50" y2="105" stroke="#8B5A2B" stroke-width="4.5" stroke-linecap="round"/>
      </g>`,
    `<!-- Sợi len cuộn rớt lăn tròn trên thảm -->
      <g transform="translate(340, 260)">
        <circle cx="20" cy="20" r="16" fill="#E76F51" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "rain-yellow-umbrella": makeScene(
    "rainyellowumbrella",
    "Chiếc Ô Vàng Dưới Cơn Mưa Nhỏ",
    "☂️",
    "#FFE599",
    ["#8D99AE","#BDE0FE","#D8E2DC"],
    `<!-- Hạt mưa rơi dịu êm tí tách -->
      <line x1="80" y1="20" x2="65" y2="70" stroke="#FFFDF9" stroke-width="2.5" opacity="0.75"/>
      <line x1="180" y1="15" x2="165" y2="65" stroke="#FFFDF9" stroke-width="2.5" opacity="0.75"/>
      <line x1="280" y1="25" x2="265" y2="75" stroke="#FFFDF9" stroke-width="2.5" opacity="0.75"/>
      <line x1="380" y1="10" x2="365" y2="60" stroke="#FFFDF9" stroke-width="2.5" opacity="0.75"/>`,
    `<!-- Cây cầu đá phủ rêu bóng loáng nước mưa -->
      <rect x="8" y="240" width="484" height="127" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="190" ry="35" fill="#495057" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Chiếc ô vàng tươi nở bung rực rỡ nước mưa trượt long lanh -->
      <g transform="translate(150, 95)">
        <path d="M20,80 Q100,-15 180,80 Q100,95 20,80 Z" fill="#FFE599" stroke="#2C2016" stroke-width="4.5"/>
        <line x1="100" y1="80" x2="100" y2="175" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Cán ô uốn cong hình móc câu -->
        <path d="M100,175 Q100,195 115,190" stroke="#2C2016" stroke-width="4.5" fill="none"/>
        <!-- Múi ô chia đều -->
        <path d="M60,75 Q100,15 140,75" stroke="#2C2016" stroke-width="2.5" fill="none"/>
      </g>`,
    `<!-- Vũng nước phản chiếu ánh ô vàng và giọt nước bắn tung tóe -->
      <ellipse cx="120" cy="280" rx="35" ry="12" fill="#BDE0FE" stroke="#2C2016" stroke-width="2"/>`
  ),
  "rain-window-raindrops": makeScene(
    "rainwindowraindrops",
    "Hạt Mưa Lăn Trên Tấm Kính Trong",
    "🪟",
    "#A2D2FF",
    ["#4A5568","#718096","#A0AEC0"],
    `<!-- Hạt mưa chảy thành vệt dài trên ô kính -->
      <line x1="120" y1="30" x2="120" y2="150" stroke="#FFFDF9" stroke-width="3" stroke-linecap="round" opacity="0.8"/>
      <line x1="220" y1="50" x2="220" y2="180" stroke="#FFFDF9" stroke-width="2.5" stroke-linecap="round" opacity="0.8"/>
      <line x1="360" y1="20" x2="360" y2="140" stroke="#FFFDF9" stroke-width="3" stroke-linecap="round" opacity="0.8"/>`,
    `<!-- Khung cửa sổ gỗ ấm áp nhìn ra màn mưa -->
      <rect x="8" y="8" width="484" height="359" fill="none" stroke="#DDBEA9" stroke-width="25"/>
      <line x1="8" y1="180" x2="492" y2="180" stroke="#2C2016" stroke-width="5"/>
      <line x1="250" y1="8" x2="250" y2="367" stroke="#2C2016" stroke-width="5"/>`,
    `<!-- Chậu sen đá nhỏ và tách trà nóng nghi ngút khói đặt bên bệ cửa -->
      <g transform="translate(160, 160)">
        <rect x="25" y="35" width="45" height="35" rx="6" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <path d="M70,42 Q82,50 70,58" stroke="#2C2016" stroke-width="3" fill="none"/>
        <path d="M48,25 Q42,10 50,0" stroke="#DDBEA9" stroke-width="2.5" fill="none"/>
        <!-- Chậu cây nhỏ xinh xắn bên cạnh -->
        <rect x="95" y="40" width="35" height="30" rx="4" fill="#E29578" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="112" cy="30" r="14" fill="#74C69D" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Giọt nước mưa tròn đọng trên bệ kính -->
      <circle cx="210" cy="275" r="5" fill="#E0F2FE" stroke="#2C2016" stroke-width="1.5"/>`
  ),
  "rain-frog-lotus-leaf": makeScene(
    "rainfroglotusleaf",
    "Chú Ếch Xanh Trú Dưới Lá Khoai",
    "🐸",
    "#74C69D",
    ["#8D99AE","#BDE0FE","#95D5B2"],
    `<!-- Mưa rơi lất phất làm ướt sũng mặt hồ -->
      <line x1="100" y1="20" x2="85" y2="70" stroke="#FFFDF9" stroke-width="2.5" opacity="0.7"/>`,
    `<!-- Đầm sen mùa hạ xanh ngắt -->
      <rect x="8" y="240" width="484" height="127" fill="#52B788" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="170" ry="40" fill="#BDE0FE" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chú ếch xanh mắt to ngồi ngoan dưới tán lá khoai khổng lồ -->
      <g transform="translate(170, 90)">
        <!-- Tán lá khoai to như chiếc lọng che mưa -->
        <path d="M10,40 Q75,-15 140,40 Q105,65 75,55 Q45,65 10,40 Z" fill="#52B788" stroke="#2C2016" stroke-width="4.5"/>
        <line x1="75" y1="55" x2="75" y2="155" stroke="#2D6A4F" stroke-width="4.5"/>
        <circle cx="50" cy="30" r="6" fill="#BDE0FE"/>
        <!-- Chú ếch xanh tròn trĩnh ngồi dưới cuống lá -->
        <ellipse cx="75" cy="140" rx="35" ry="25" fill="#74C69D" stroke="#2C2016" stroke-width="4"/>
        <ellipse cx="75" cy="145" rx="20" ry="14" fill="#D8F3DC"/>
        <!-- Đôi mắt to tròn ngơ ngác trên đầu -->
        <circle cx="60" cy="120" r="12" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>
        <circle cx="60" cy="120" r="5" fill="#2C2016"/>
        <circle cx="90" cy="120" r="12" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>
        <circle cx="90" cy="120" r="5" fill="#2C2016"/>
      </g>`,
    `<!-- Giọt mưa chuẩn bị rơi từ chóp lá -->
      <circle cx="180" cy="265" r="4" fill="#BDE0FE"/>`
  ),
  "rain-hot-tea-porch": makeScene(
    "rainhotteaporch",
    "Tách Trà Nóng Ngắm Mưa Hiên Nhà",
    "🍵",
    "#E29578",
    ["#718096","#A0AEC0","#CBD5E0"],
    `<!-- Mưa rơi từ mái hiên tạo thành chuỗi ngọc rủ -->
      <line x1="50" y1="8" x2="50" y2="180" stroke="#FFFDF9" stroke-width="2.5" stroke-dasharray="8,6" opacity="0.8"/>
      <line x1="150" y1="8" x2="150" y2="180" stroke="#FFFDF9" stroke-width="2.5" stroke-dasharray="8,6" opacity="0.8"/>
      <line x1="350" y1="8" x2="350" y2="180" stroke="#FFFDF9" stroke-width="2.5" stroke-dasharray="8,6" opacity="0.8"/>
      <line x1="450" y1="8" x2="450" y2="180" stroke="#FFFDF9" stroke-width="2.5" stroke-dasharray="8,6" opacity="0.8"/>`,
    `<!-- Hiên nhà gỗ tuyết tùng engawa nhìn ra vườn mưa -->
      <rect x="8" y="210" width="484" height="157" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="250" x2="492" y2="250" stroke="#8B5A2B" stroke-width="3"/>`,
    `<!-- Bàn trà nhỏ trên hiên với ấm trà gốm mộc và đôi dép gỗ geta -->
      <g transform="translate(160, 140)">
        <rect x="25" y="45" width="130" height="20" rx="4" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="45" y1="65" x2="45" y2="90" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="135" y1="65" x2="135" y2="90" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Ấm trà gốm mộc nắp đồng -->
        <circle cx="75" cy="30" r="22" fill="#E29578" stroke="#2C2016" stroke-width="3"/>
        <path d="M53,25 Q35,22 45,15" stroke="#2C2016" stroke-width="3" fill="none"/>
        <!-- Tách trà bốc khói ấm -->
        <rect x="115" y="22" width="22" height="22" rx="4" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Chuông gió treo góc mái hiên khẽ đung đưa -->
      <g transform="translate(80, 255)">
        <rect x="10" y="10" width="18" height="30" rx="4" fill="#DDBEA9" stroke="#2C2016" stroke-width="2"/>
        <rect x="35" y="10" width="18" height="30" rx="4" fill="#DDBEA9" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "rain-puddle-boots": makeScene(
    "rainpuddleboots",
    "Ủng Đỏ Nhảy Trên Vũng Nước Mưa",
    "👢",
    "#E63946",
    ["#A2D2FF","#BDE0FE","#FFE5D9"],
    `<!-- Cơn mưa rào vừa dứt trời hửng nắng -->
      <circle cx="100" cy="60" r="30" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Vỉa hè lát đá với vũng nước mưa lớn phản chiếu ánh nắng -->
      <rect x="8" y="240" width="484" height="127" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="290" rx="180" ry="42" fill="#BDE0FE" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Đôi ủng cao su màu đỏ tươi bóng loáng giẫm nước bắn tung tóe -->
      <g transform="translate(180, 110)">
        <!-- Ủng trái -->
        <path d="M25,20 L25,100 L0,100 Q0,120 45,120 L55,120 L55,20 Z" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <rect x="23" y="15" width="34" height="10" rx="2" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
        <!-- Ủng phải -->
        <path d="M75,20 L75,100 L50,100 Q50,120 95,120 L105,120 L105,20 Z" fill="#E63946" stroke="#2C2016" stroke-width="4"/>
        <rect x="73" y="15" width="34" height="10" rx="2" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Giọt nước văng hình vương miện khi nhảy ùm -->
      <circle cx="150" cy="250" r="6" fill="#BDE0FE" stroke="#2C2016" stroke-width="2"/>
      <circle cx="310" cy="245" r="7" fill="#BDE0FE" stroke="#2C2016" stroke-width="2"/>`
  ),
  "rain-mossy-stone-bridge": makeScene(
    "rainmossystonebridge",
    "Cây Cầu Đá Phủ Rêu Trong Màn Mưa",
    "🌉",
    "#52B788",
    ["#4A5568","#718096","#95D5B2"],
    `<!-- Mưa giăng mờ ảo khắp thung lũng xanh -->
      <line x1="120" y1="20" x2="105" y2="70" stroke="#FFFDF9" stroke-width="2.5" opacity="0.6"/>
      <line x1="360" y1="15" x2="345" y2="65" stroke="#FFFDF9" stroke-width="2.5" opacity="0.6"/>`,
    `<!-- Dòng suối đá cuội chảy dưới chân cầu -->
      <rect x="8" y="240" width="484" height="127" fill="#83C5BE" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây cầu đá vòm cổ kính phủ rêu phong xanh mướt -->
      <g transform="translate(110, 100)">
        <!-- Vòm cầu đá cong parabol thanh thoát -->
        <path d="M15,140 Q140,5 265,140 L285,140 Q140,-15 -5,140 Z" fill="#6C757D" stroke="#2C2016" stroke-width="4.5"/>
        <path d="M35,140 Q140,45 245,140" fill="#2C2016" stroke="#2C2016" stroke-width="3"/>
        <!-- Rêu phong xanh bám quanh thân cầu -->
        <circle cx="75" cy="85" r="14" fill="#52B788"/>
        <circle cx="140" cy="55" r="16" fill="#52B788"/>
        <circle cx="205" cy="85" r="14" fill="#52B788"/>
      </g>`,
    `<!-- Cây dương xỉ ướt đẫm nước mưa ven bờ -->
      <ellipse cx="90" cy="290" rx="20" ry="10" fill="#74C69D" stroke="#2C2016" stroke-width="2"/>`
  ),
  "sun-misty-mountain-dawn": makeScene(
    "sunmistymountaindawn",
    "Bình Minh Sương Sớm Đỉnh Núi",
    "🌄",
    "#F4A261",
    ["#E76F51","#F4A261","#E9C46A"],
    `<!-- Vầng thái dương rực rỡ ló dạng trên đỉnh núi -->
      <circle cx="250" cy="110" r="45" fill="#FFF1C5" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Biển mây bồng bềnh cuộn sóng quanh các dãy núi -->
      <path d="M8,220 Q250,180 492,220 L492,367 L8,367 Z" fill="#E0F2FE" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="140" cy="240" rx="80" ry="25" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
      <ellipse cx="340" cy="235" rx="90" ry="28" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Đỉnh núi tuyết nhọn vươn cao đón những tia nắng đầu tiên -->
      <g transform="translate(130, 80)">
        <polygon points="120,30 20,165 220,165" fill="#457B9D" stroke="#2C2016" stroke-width="4.5"/>
        <polygon points="120,30 80,85 105,75 120,95 140,80 160,85" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Rừng thông chìm trong sương mờ -->
      <polygon points="70,310 85,240 100,310" fill="#1D3557" stroke="#2C2016" stroke-width="2.5"/>`
  ),
  "sun-golden-hour-wheat": makeScene(
    "sungoldenhourwheat",
    "Cánh Đồng Lúa Mì Giờ Vàng",
    "🌾",
    "#E9C46A",
    ["#F4A261","#E9C46A","#264653"],
    `<!-- Ánh sáng vàng rực rỡ như mật ong của giờ vàng -->
      <circle cx="390" cy="90" r="45" fill="#FFF1C5" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cánh đồng lúa mì vàng óng ả nhấp nhô sóng lúa -->
      <path d="M8,210 Q250,180 492,210 L492,367 L8,367 Z" fill="#E9C46A" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q200,230 492,260 L492,367 L8,367 Z" fill="#DDA15E" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Những bông lúa mì trĩu hạt vàng rực và cối xay gió xa xa -->
      <g transform="translate(170, 95)">
        <!-- Nhánh lúa mì lớn cận cảnh uốn cong duyên dáng -->
        <path d="M50,160 Q70,70 120,20" stroke="#BC6C25" stroke-width="4" fill="none"/>
        <ellipse cx="110" cy="30" rx="8" ry="14" fill="#FFE599" stroke="#2C2016" stroke-width="2.5" transform="rotate(30, 110, 30)"/>
        <ellipse cx="100" cy="50" rx="8" ry="14" fill="#FFE599" stroke="#2C2016" stroke-width="2.5" transform="rotate(30, 100, 50)"/>
        <ellipse cx="90" cy="70" rx="8" ry="14" fill="#FFE599" stroke="#2C2016" stroke-width="2.5" transform="rotate(30, 90, 70)"/>
        <ellipse cx="80" cy="90" rx="8" ry="14" fill="#FFE599" stroke="#2C2016" stroke-width="2.5" transform="rotate(30, 80, 90)"/>
      </g>`,
    `<!-- Đóa hoa anh túc đỏ nở giữa đồng lúa mì -->
      <circle cx="100" cy="280" r="14" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>`
  ),
  "sun-seaside-dusk-boat": makeScene(
    "sunseasideduskboat",
    "Thuyền Buồm Trong Ráng Chiều Đỏ",
    "⛵",
    "#E76F51",
    ["#E76F51","#F4A261","#264653"],
    `<!-- Ráng chiều đỏ rực hoàng hôn trên biển -->
      <circle cx="130" cy="110" r="45" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Biển chiều phản chiếu sắc trời rực lửa -->
      <rect x="8" y="210" width="484" height="157" fill="#264653" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,230 Q250,215 492,230" stroke="#F4A261" stroke-width="3" fill="none"/>`,
    `<!-- Con thuyền buồm trắng lướt sóng về bến trong ánh hoàng hôn -->
      <g transform="translate(170, 95)">
        <!-- Thân thuyền gỗ màu nâu đỏ -->
        <path d="M15,115 L145,115 L125,145 L35,145 Z" fill="#8B5A2B" stroke="#2C2016" stroke-width="4"/>
        <line x1="75" y1="20" x2="75" y2="115" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Cánh buồm tam giác căng gió -->
        <polygon points="75,25 15,105 75,105" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <polygon points="80,35 135,105 80,105" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Đàn hải âu bay lượn trên mặt nước -->
      <path d="M90,260 Q100,250 110,260 Q120,250 130,260" stroke="#2C2016" stroke-width="2.5" fill="none"/>`
  ),
  "sun-purple-horizon-clouds": makeScene(
    "sunpurplehorizonclouds",
    "Mây Tím Chân Trời Cuối Thu",
    "☁️",
    "#DFCCF1",
    ["#240046","#5A189A","#FFCAD4"],
    `<!-- Bầu trời hoàng hôn chuyển từ tím biếc sang hồng dịu -->
      <circle cx="100" cy="50" r="3" fill="#FFFDF9"/>`,
    `<!-- Thảo nguyên rộng lớn với đường chân trời vô tận -->
      <rect x="8" y="240" width="484" height="127" fill="#3C096C" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Những đám mây tím bồng bềnh xếp tầng như lâu đài trên không -->
      <g transform="translate(130, 80)">
        <circle cx="70" cy="80" r="45" fill="#DFCCF1" stroke="#2C2016" stroke-width="4"/>
        <circle cx="130" cy="70" r="55" fill="#C7B9FF" stroke="#2C2016" stroke-width="4"/>
        <circle cx="180" cy="90" r="40" fill="#FFCAD4" stroke="#2C2016" stroke-width="4"/>
        <rect x="50" y="85" width="150" height="40" fill="#DFCCF1"/>
      </g>`,
    `<!-- Bông cỏ lau trắng đong đưa trong gió chiều -->
      <g transform="translate(90, 250)">
        <line x1="20" y1="90" x2="20" y2="10" stroke="#DDBEA9" stroke-width="3"/>
        <ellipse cx="20" cy="20" rx="8" ry="20" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "sun-first-sunbeam-forest": makeScene(
    "sunfirstsunbeamforest",
    "Tia Nắng Đầu Tiên Xuyên Tán Rừng",
    "🌲",
    "#74C69D",
    ["#1B4332","#2D6A4F","#D8F3DC"],
    `<!-- Những luồng ánh sáng Komorebi vàng óng xuyên qua kẽ lá -->
      <polygon points="150,8 180,8 260,240 200,240" fill="#FFF1C5" opacity="0.45"/>
      <polygon points="280,8 310,8 390,240 330,240" fill="#FFF1C5" opacity="0.45"/>`,
    `<!-- Thảm rêu rừng sồi xanh mướt tắm nắng mai -->
      <rect x="8" y="230" width="484" height="137" fill="#2D6A4F" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây cổ thụ uy nghi tỏa bóng và đốm nắng vàng nhảy múa trên thân cây -->
      <g transform="translate(160, 60)">
        <rect x="75" y="75" width="45" height="150" fill="#8B5A2B" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Tán lá xanh bồng bềnh -->
        <circle cx="50" cy="65" r="45" fill="#74C69D" stroke="#2C2016" stroke-width="4"/>
        <circle cx="140" cy="65" r="45" fill="#74C69D" stroke="#2C2016" stroke-width="4"/>
        <circle cx="95" cy="40" r="50" fill="#52B788" stroke="#2C2016" stroke-width="4"/>
      </g>`,
    `<!-- Nấm nhỏ mọc bên gốc cây sồi đón nắng -->
      <circle cx="130" cy="275" r="10" fill="#E76F51" stroke="#2C2016" stroke-width="2"/>`
  ),
  "sun-city-skyline-twilight": makeScene(
    "suncityskylinetwilight",
    "Thành Phố Lên Đèn Lúc Chạng Vạng",
    "🏙️",
    "#FFE599",
    ["#0B090A","#161A1D","#E76F51"],
    `<!-- Bầu trời hoàng hôn rực sáng sau những tòa nhà chọc trời -->
      <circle cx="250" cy="140" r="60" fill="#F4A261" opacity="0.8"/>`,
    `<!-- Mặt nước vịnh phản chiếu ánh đèn lung linh của thành phố -->
      <rect x="8" y="240" width="484" height="127" fill="#0B090A" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q250,245 492,260" stroke="#FFE599" stroke-width="2" opacity="0.6"/>`,
    `<!-- Đường chân trời skyline các tòa cao ốc sáng rực ánh đèn vàng -->
      <g transform="translate(100, 80)">
        <rect x="20" y="45" width="45" height="135" fill="#1D3557" stroke="#2C2016" stroke-width="4"/>
        <rect x="75" y="15" width="55" height="165" fill="#2B2D42" stroke="#2C2016" stroke-width="4"/>
        <rect x="140" y="60" width="50" height="120" fill="#1D3557" stroke="#2C2016" stroke-width="4"/>
        <rect x="200" y="30" width="45" height="150" fill="#2B2D42" stroke="#2C2016" stroke-width="4"/>
        <!-- Các ô cửa sổ sáng đèn li ti -->
        <circle cx="90" cy="40" r="3" fill="#FFE599"/>
        <circle cx="115" cy="40" r="3" fill="#FFE599"/>
        <circle cx="90" cy="70" r="3" fill="#FFE599"/>
        <circle cx="115" cy="70" r="3" fill="#FFE599"/>
      </g>`,
    `<!-- Lan can bờ sông và ánh đèn đường phản chiếu -->
      <line x1="8" y1="300" x2="492" y2="300" stroke="#FFE599" stroke-width="2.5"/>`
  ),
  "forest-glowing-spirit-deer": makeScene(
    "forestglowingspiritdeer",
    "Chú Hươu Phát Sáng Trong Rừng Khuya",
    "🦌",
    "#A2D2FF",
    ["#081C15","#1B4332","#40916C"],
    `<!-- Rừng khuya đom đóm thần tiên tỏa sáng -->
      <circle cx="100" cy="50" r="3.5" fill="#FFE599"/>
      <circle cx="390" cy="60" r="3.5" fill="#FFE599"/>`,
    `<!-- Thảm rêu cổ thụ và dòng suối trong vắt phát quang -->
      <rect x="8" y="240" width="484" height="127" fill="#1B4332" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="170" ry="40" fill="#52B788" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Chú hươu thần trắng muốt với cặp gạc đâm chồi nở hoa phát quang -->
      <g transform="translate(160, 95)">
        <!-- Thân hươu thanh thoát trắng ngọc bích -->
        <ellipse cx="80" cy="95" rx="50" ry="35" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <line x1="45" y1="110" x2="40" y2="160" stroke="#2C2016" stroke-width="4"/>
        <line x1="115" y1="110" x2="120" y2="160" stroke="#2C2016" stroke-width="4"/>
        <!-- Cổ và đầu hươu kiêu hãnh -->
        <path d="M110,85 Q135,45 145,55 Q135,90 120,95 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <circle cx="145" cy="55" r="16" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Cặp gạc hươu phân nhánh phát sáng rực rỡ -->
        <path d="M140,42 Q130,10 115,-5" stroke="#FFE599" stroke-width="4" fill="none"/>
        <path d="M145,42 Q160,10 180,-5" stroke="#FFE599" stroke-width="4" fill="none"/>
        <circle cx="115" cy="-5" r="4" fill="#A2D2FF"/>
        <circle cx="180" cy="-5" r="4" fill="#A2D2FF"/>
      </g>`,
    `<!-- Hoa sen tuyết phát sáng dưới chân chú hươu -->
      <circle cx="100" cy="280" r="12" fill="#E0F2FE" stroke="#2C2016" stroke-width="2"/>`
  ),
  "forest-ancient-moss-oak": makeScene(
    "forestancientmossoak",
    "Cây Sồi Cổ Thụ Ngàn Năm Tuổi",
    "🌳",
    "#52B788",
    ["#E8F8F5","#D8F3DC","#B7E4C7"],
    `<!-- Ánh sáng huyền bí chiếu qua vòm cây cổ tích -->
      <polygon points="120,8 160,8 240,240 180,240" fill="#FFF1C5" opacity="0.35"/>`,
    `<!-- Rễ cây sồi cổ thụ trồi lên mặt đất bện xoắn như rồng -->
      <rect x="8" y="240" width="484" height="127" fill="#2D6A4F" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây sồi ngàn năm tuổi có cánh cửa gỗ tí hon dẫn vào thế giới tiên -->
      <g transform="translate(130, 45)">
        <!-- Thân cây cổ thụ khổng lồ -->
        <path d="M60,195 C50,110 30,70 15,30 L225,30 C210,70 190,110 180,195 Z" fill="#8B5A2B" stroke="#2C2016" stroke-width="5"/>
        <!-- Tán lá sồi khổng lồ xanh tươi -->
        <circle cx="120" cy="25" r="95" fill="#52B788" stroke="#2C2016" stroke-width="4"/>
        <!-- Cánh cửa vòm tròn của người tí hon ở gốc cây -->
        <path d="M100,195 L100,150 A20,20 0 0 1 140,150 L140,195 Z" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="132" cy="172" r="3" fill="#FFE599"/>
      </g>`,
    `<!-- Bậc thang đá nhỏ rêu phong dẫn vào cánh cửa -->
      <ellipse cx="250" cy="275" rx="25" ry="8" fill="#6C757D" stroke="#2C2016" stroke-width="2"/>`
  ),
  "forest-crystal-stream": makeScene(
    "forestcrystalstream",
    "Suối Pha Lê Chảy Qua Thung Lũng",
    "💧",
    "#A2D2FF",
    ["#E0F2FE","#BDE0FE","#98D8AA"],
    `<!-- Thung lũng ngập tràn sương khói và hoa rừng -->
      <circle cx="390" cy="70" r="30" fill="#FFF1C5" opacity="0.6"/>`,
    `<!-- Dòng suối trong vắt như pha lê uốn lượn qua các tảng đá -->
      <rect x="8" y="190" width="484" height="177" fill="#74C69D" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M120,367 L170,190 L310,190 L360,367 Z" fill="#A2D2FF" stroke="#2C2016" stroke-width="4"/>`,
    `<!-- Thác nước nhỏ đổ róc rách qua tảng đá pha lê phát sáng -->
      <g transform="translate(170, 110)">
        <polygon points="50,75 110,75 130,120 30,120" fill="#6C757D" stroke="#2C2016" stroke-width="4"/>
        <!-- Dòng nước trắng xóa đổ qua mỏm đá -->
        <rect x="60" y="75" width="40" height="75" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
        <!-- Cụm tinh thể thạch anh tím mọc bên bờ suối -->
        <polygon points="20,80 30,40 40,80" fill="#C7B9FF" stroke="#2C2016" stroke-width="2.5"/>
        <polygon points="35,80 45,30 55,80" fill="#E8D7F1" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Hạt nước bắn tung tóe óng ánh -->
      <circle cx="210" cy="275" r="5" fill="#FFFDF9"/>
      <circle cx="270" cy="270" r="6" fill="#FFFDF9"/>`
  ),
  "forest-wildflower-glade": makeScene(
    "forestwildflowerglade",
    "Trảng Cỏ Hoa Dại Đầy Bướm Xanh",
    "🦋",
    "#F4ACB7",
    ["#E0F2FE","#FFF0F5","#D8F3DC"],
    `<!-- Đàn bướm xanh bay rập rờn giữa nắng hạ -->
      <g transform="translate(120, 50)">
        <ellipse cx="10" cy="10" rx="8" ry="12" fill="#48CAE4" stroke="#2C2016" stroke-width="1.5"/>
        <ellipse cx="22" cy="10" rx="8" ry="12" fill="#48CAE4" stroke="#2C2016" stroke-width="1.5"/>
      </g>`,
    `<!-- Trảng cỏ xanh ngát rực rỡ trăm ngàn bông hoa dại -->
      <path d="M8,210 Q250,180 492,210 L492,367 L8,367 Z" fill="#95D5B2" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,260 Q200,230 492,260 L492,367 L8,367 Z" fill="#74C69D" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Bụi hoa cúc dại, hoa chuông và bướm xanh đậu cánh -->
      <g transform="translate(160, 110)">
        <circle cx="40" cy="70" r="16" fill="#FFCAD4" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="40" cy="70" r="6" fill="#FFE599"/>
        <circle cx="100" cy="50" r="18" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="100" cy="50" r="7" fill="#FFE599"/>
        <circle cx="140" cy="75" r="16" fill="#C7B9FF" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="140" cy="75" r="6" fill="#FFF1C5"/>
      </g>`,
    `<!-- Quả dâu rừng chín đỏ mọng ven lối đi -->
      <circle cx="90" cy="285" r="8" fill="#E63946" stroke="#2C2016" stroke-width="2"/>`
  ),
  "forest-fairy-stone-door": makeScene(
    "forestfairystonedoor",
    "Cánh Cửa Rêu Dẫn Vào Lòng Đất",
    "🚪",
    "#BC6C25",
    ["#1B4332","#2D6A4F","#D8F3DC"],
    `<!-- Rừng thiêng bí ẩn phủ đầy sương mờ -->
      <circle cx="380" cy="60" r="3" fill="#FFE599"/>`,
    `<!-- Tảng đá rêu phong khổng lồ tựa vách núi -->
      <rect x="8" y="240" width="484" height="127" fill="#2D6A4F" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cánh cửa gỗ tròn kiểu Hobbit khoét sâu vào lòng đá phủ rêu -->
      <g transform="translate(150, 75)">
        <circle cx="100" cy="100" r="85" fill="#6C757D" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Cửa gỗ tròn màu xanh ngọc bích -->
        <circle cx="100" cy="100" r="60" fill="#2A9D8F" stroke="#2C2016" stroke-width="4"/>
        <!-- Tay nắm cửa đồng tròn ở chính giữa -->
        <circle cx="100" cy="100" r="10" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <!-- Dây leo hoa chuông quấn quanh vòm cửa -->
        <circle cx="50" cy="65" r="9" fill="#F4ACB7"/>
        <circle cx="150" cy="65" r="9" fill="#F4ACB7"/>
      </g>`,
    `<!-- Bậc thềm đá cuội trước cửa -->
      <ellipse cx="250" cy="275" rx="45" ry="14" fill="#DDBEA9" stroke="#2C2016" stroke-width="2.5"/>`
  ),
  "forest-giant-fern-canopy": makeScene(
    "forestgiantferncanopy",
    "Vòm Dương Xỉ Khổng Lồ Tiền Sử",
    "🌿",
    "#52B788",
    ["#E8F8F5","#D8F3DC","#74C69D"],
    `<!-- Nắng sớm xuyên qua tán lá dương xỉ hình lông vũ -->
      <polygon points="150,8 180,8 240,180 200,180" fill="#FFF1C5" opacity="0.4"/>`,
    `<!-- Rừng nguyên sinh ẩm ướt với thảm dương xỉ xanh mướt -->
      <rect x="8" y="240" width="484" height="127" fill="#2D6A4F" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Những tàu lá dương xỉ khổng lồ uốn cong xòe ô che mát cả khu rừng -->
      <g transform="translate(130, 70)">
        <path d="M20,180 Q60,40 180,20" stroke="#1B4332" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M20,180 Q60,40 180,20" stroke="#2C2016" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Các thùy lá dương xỉ mọc đối xứng -->
        <ellipse cx="80" cy="75" rx="20" ry="8" fill="#52B788" stroke="#2C2016" stroke-width="2"/>
        <ellipse cx="120" cy="50" rx="20" ry="8" fill="#52B788" stroke="#2C2016" stroke-width="2"/>
        <ellipse cx="155" cy="30" rx="18" ry="7" fill="#52B788" stroke="#2C2016" stroke-width="2"/>
      </g>`,
    `<!-- Chú thằn lằn hoa nhỏ nằm phơi nắng trên phiến đá -->
      <ellipse cx="110" cy="285" rx="18" ry="8" fill="#E76F51" stroke="#2C2016" stroke-width="2"/>`
  ),
  "town-cobblestone-alley": makeScene(
    "towncobblestonealley",
    "Con Hẻm Lát Đá Ngập Hoa Leo",
    "🚲",
    "#F4ACB7",
    ["#E0F2FE","#FFF0F5","#D8E2DC"],
    `<!-- Con phố cổ châu Âu nắng chiều dịu êm -->
      <circle cx="100" cy="50" r="28" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Con dốc lát đá cuội cổ kính với những ngôi nhà sơn tường pastel -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="280" rx="190" ry="45" fill="#DDBEA9" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Dây hoa giấy rực rỡ leo qua tường đá và chiếc xe đạp giỏ hoa tựa tường -->
      <g transform="translate(130, 80)">
        <!-- Tường nhà cổ cửa sổ gỗ màu xanh bạc hà -->
        <rect x="20" y="30" width="100" height="120" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <rect x="40" y="50" width="45" height="55" rx="6" fill="#83C5BE" stroke="#2C2016" stroke-width="3"/>
        <!-- Dàn hoa giấy hồng tím rủ xuống từ ban công -->
        <circle cx="35" cy="40" r="16" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>
        <circle cx="65" cy="30" r="18" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>
        <circle cx="95" cy="40" r="16" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>
        <!-- Chiếc xe đạp giỏ đầy hoa tựa chân tường -->
        <circle cx="140" cy="140" r="25" fill="none" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="190" cy="140" r="25" fill="none" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Chú mèo mướp lười biếng nằm sưởi nắng bên bậc cửa -->
      <ellipse cx="340" cy="275" rx="16" ry="10" fill="#F4A261" stroke="#2C2016" stroke-width="2"/>`
  ),
  "town-vintage-tramway": makeScene(
    "townvintagetramway",
    "Chuyến Xe Điện Cổ Băng Qua Phố",
    "🚋",
    "#FFE599",
    ["#E0F2FE","#FFF1C5","#FFE5D9"],
    `<!-- Bầu trời Lisbon trong veo với dây cáp xe điện giăng ngang -->
      <line x1="8" y1="50" x2="492" y2="50" stroke="#2C2016" stroke-width="2.5"/>`,
    `<!-- Con phố lát đá dốc thoai thoải với đường ray xe điện -->
      <rect x="8" y="240" width="484" height="127" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="160" y1="240" x2="140" y2="367" stroke="#2C2016" stroke-width="4"/>
      <line x1="280" y1="240" x2="300" y2="367" stroke="#2C2016" stroke-width="4"/>`,
    `<!-- Chuyến xe điện vàng cổ kính màu nắng chạy trên phố -->
      <g transform="translate(160, 95)">
        <!-- Toa xe điện hình hộp bo góc vàng rực rỡ -->
        <rect x="25" y="30" width="130" height="100" rx="15" fill="#FFE599" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Dải sọc trắng ngang thân xe -->
        <rect x="25" y="75" width="130" height="15" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <!-- 3 ô cửa kính vuông vức phía trước -->
        <rect x="40" y="42" width="28" height="28" rx="4" fill="#BDE0FE" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="76" y="42" width="28" height="28" rx="4" fill="#BDE0FE" stroke="#2C2016" stroke-width="2.5"/>
        <rect x="112" y="42" width="28" height="28" rx="4" fill="#BDE0FE" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Cần tiếp điện trên nóc xe -->
        <line x1="90" y1="30" x2="90" y2="-10" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="75" y1="-10" x2="105" y2="-10" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Đèn pha tròn sáng vàng -->
        <circle cx="90" cy="105" r="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Cột đèn đường bằng gang đen hoa văn cổ -->
      <line x1="90" y1="160" x2="90" y2="310" stroke="#2C2016" stroke-width="4.5"/>
      <polygon points="80,160 100,160 90,140" fill="#FFE599" stroke="#2C2016" stroke-width="2"/>`
  ),
  "town-flower-balconies": makeScene(
    "townflowerbalconies",
    "Những Ban Công Hoa Dọc Dãy Phố",
    "💐",
    "#E63946",
    ["#E0F2FE","#FFF0F5","#FFE5D9"],
    `<!-- Nắng chiều châu Âu ấm áp rọi vào dãy nhà cổ -->
      <circle cx="380" cy="60" r="30" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Tường nhà cổ Paris sơn màu kem trang nhã -->
      <rect x="8" y="8" width="484" height="359" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Ban công sắt rèn uốn hoa văn tràn ngập hoa phong lữ đỏ thắm -->
      <g transform="translate(140, 80)">
        <!-- Cửa sổ kiểu Pháp mở rộng với rèm ren -->
        <rect x="40" y="20" width="120" height="120" rx="8" fill="#BDE0FE" stroke="#2C2016" stroke-width="4"/>
        <line x1="100" y1="20" x2="100" y2="140" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Lan can sắt uốn cong hoa văn hoa lá -->
        <rect x="25" y="115" width="150" height="35" rx="4" fill="none" stroke="#2C2016" stroke-width="4"/>
        <line x1="50" y1="115" x2="50" y2="150" stroke="#2C2016" stroke-width="3"/>
        <line x1="100" y1="115" x2="100" y2="150" stroke="#2C2016" stroke-width="3"/>
        <line x1="150" y1="115" x2="150" y2="150" stroke="#2C2016" stroke-width="3"/>
        <!-- Khóm hoa phong lữ đỏ tươi rủ xuống ban công -->
        <circle cx="50" cy="115" r="16" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="90" cy="110" r="18" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="130" cy="115" r="16" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="160" cy="120" r="14" fill="#F4ACB7" stroke="#2C2016" stroke-width="2.5"/>
      </g>`,
    `<!-- Cánh hoa rơi lả tả xuống phố -->
      <ellipse cx="230" cy="275" rx="6" ry="4" fill="#E63946"/>
      <ellipse cx="270" cy="290" rx="7" ry="4" fill="#E63946"/>`
  ),
  "town-corner-flower-cart": makeScene(
    "towncornerflowercart",
    "Xe Đẩy Bán Hoa Góc Ngã Tư",
    "🌻",
    "#E9C46A",
    ["#E0F2FE","#FFF1C5","#D8F3DC"],
    `<!-- Góc phố ngập tràn ánh nắng ấm ngày xuân -->
      <circle cx="90" cy="60" r="30" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Ngã tư đường lát gạch cổ điển -->
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chiếc xe đẩy hoa bằng gỗ 2 bánh lớn chở đầy hoa hướng dương và cúc vàng -->
      <g transform="translate(130, 95)">
        <!-- Thùng xe gỗ chở hoa -->
        <rect x="35" y="55" width="150" height="50" rx="8" fill="#8B5A2B" stroke="#2C2016" stroke-width="4"/>
        <!-- Hai bánh xe nan hoa gỗ to tròn -->
        <circle cx="65" cy="125" r="32" fill="none" stroke="#2C2016" stroke-width="4"/>
        <line x1="65" y1="93" x2="65" y2="157" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="33" y1="125" x2="97" y2="125" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="155" cy="125" r="32" fill="none" stroke="#2C2016" stroke-width="4"/>
        <!-- Các xô kẽm cắm đầy hoa hướng dương -->
        <circle cx="70" cy="40" r="22" fill="#E9C46A" stroke="#2C2016" stroke-width="3"/>
        <circle cx="70" cy="40" r="10" fill="#6F4E37"/>
        <circle cx="115" cy="35" r="24" fill="#E9C46A" stroke="#2C2016" stroke-width="3"/>
        <circle cx="115" cy="35" r="11" fill="#6F4E37"/>
        <circle cx="155" cy="45" r="20" fill="#F4ACB7" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Xô tưới nước kẽm đặt cạnh xe hoa -->
      <g transform="translate(80, 260)">
        <polygon points="10,35 30,35 25,10 15,10" fill="#A8DADC" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "town-canal-gondola": makeScene(
    "towncanalgondola",
    "Kênh Đào Nước Trong Xanh Venice",
    "🛶",
    "#0096C7",
    ["#E0F2FE","#BDE0FE","#FDE2E4"],
    `<!-- Cầu đá Venice cong cong bắc qua kênh -->
      <path d="M100,160 Q250,80 400,160" stroke="#6C757D" stroke-width="14" fill="none"/>
      <path d="M100,160 Q250,80 400,160" stroke="#2C2016" stroke-width="4" fill="none"/>`,
    `<!-- Kênh đào Venice nước trong xanh ngọc bích -->
      <rect x="8" y="190" width="484" height="177" fill="#83C5BE" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,220 Q250,205 492,220" stroke="#FFFDF9" stroke-width="3" fill="none" opacity="0.6"/>`,
    `<!-- Chiếc thuyền Gondola mũi cong gắn mỏ sắt sáng bóng buộc bên cọc sọc xanh trắng -->
      <g transform="translate(150, 140)">
        <!-- Thân thuyền Gondola đen tuyền uốn lượn mềm mại -->
        <path d="M10,85 C60,65 140,65 190,85 C140,110 60,110 10,85 Z" fill="#2C2016" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Mũi sắt Ferro nhô cao đặc trưng của Venice -->
        <path d="M185,85 Q210,45 200,35" stroke="#FFE599" stroke-width="5" fill="none"/>
        <!-- Ghế ngồi bọc nhung đỏ sang trọng trong khoang -->
        <rect x="85" y="70" width="35" height="15" rx="3" fill="#E63946"/>
        <!-- Cọc gỗ buộc thuyền sọc trắng đỏ (barber pole) -->
        <rect x="35" y="20" width="14" height="110" rx="3" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="35" y1="40" x2="49" y2="50" stroke="#E63946" stroke-width="3"/>
        <line x1="35" y1="70" x2="49" y2="80" stroke="#E63946" stroke-width="3"/>
      </g>`,
    `<!-- Gợn sóng nước lấp lánh phản chiếu thành phố -->
      <ellipse cx="110" cy="290" rx="35" ry="10" fill="none" stroke="#FFFDF9" stroke-width="2"/>`
  ),
  "town-lamp-post-bench": makeScene(
    "townlamppostbench",
    "Cột Đèn Đồng & Ghế Gỗ Công Viên",
    "🪑",
    "#FFE599",
    ["#14213D","#4A4E69","#F4A261"],
    `<!-- Ánh hoàng hôn buông xuống góc công viên tĩnh lặng -->
      <circle cx="100" cy="60" r="35" fill="#F4A261" opacity="0.7"/>`,
    `<!-- Lối đi lát đá công viên rụng đầy lá vàng thu -->
      <rect x="8" y="240" width="484" height="127" fill="#6C757D" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="180" ry="40" fill="#495057" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Cột đèn đường bằng đồng thau tỏa quầng sáng vàng và ghế gỗ công viên -->
      <g transform="translate(150, 65)">
        <!-- Cột đèn đường cổ điển cao vút -->
        <line x1="60" y1="30" x2="60" y2="200" stroke="#2C2016" stroke-width="6"/>
        <!-- Chao đèn hình lục giác tỏa sáng -->
        <polygon points="50,30 70,30 75,5 45,5" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <!-- Ghế băng gỗ công viên cạnh cột đèn -->
        <rect x="85" y="140" width="115" height="15" rx="4" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="95" y1="105" x2="95" y2="140" stroke="#2C2016" stroke-width="3"/>
        <line x1="190" y1="105" x2="190" y2="140" stroke="#2C2016" stroke-width="3"/>
        <line x1="95" y1="105" x2="190" y2="105" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="100" y1="155" x2="95" y2="195" stroke="#2C2016" stroke-width="3.5"/>
        <line x1="185" y1="155" x2="190" y2="195" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Tờ báo mở trang nằm quên trên ghế và lá vàng rơi -->
      <ellipse cx="320" cy="275" rx="8" ry="5" fill="#FFE599"/>`
  ),
  "fruit-strawberry-basket": makeScene(
    "fruitstrawberrybasket",
    "Giỏ Mây Đựng Đầy Dâu Tây Đỏ",
    "🍓",
    "#E63946",
    ["#FFF0F5","#FFCCD5","#D8F3DC"],
    `<!-- Trang trại dâu tây ngập tràn ánh nắng ấm áp -->
      <circle cx="80" cy="50" r="30" fill="#FFF1C5" opacity="0.7"/>
      <path d="M340,50 Q380,30 420,50 Q450,70 390,75 Z" fill="#FFFDF9" opacity="0.8"/>`,
    `<!-- Bàn gỗ nông trại mộc mạc với khăn trải bàn ca-rô đỏ trắng -->
      <rect x="8" y="210" width="484" height="157" fill="#DDBEA9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="190" ry="48" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="175" ry="42" fill="#E63946" opacity="0.25"/>`,
    `<!-- Giỏ mây đan tròn đầy ắp những quả dâu tây đỏ mọng tươi ngon rải hạt vàng -->
      <g transform="translate(140, 95)">
        <!-- Giỏ mây đan nan tre tự nhiên -->
        <ellipse cx="110" cy="115" rx="90" ry="38" fill="#DDA15E" stroke="#2C2016" stroke-width="4.5"/>
        <line x1="20" y1="115" x2="200" y2="115" stroke="#BC6C25" stroke-width="3"/>
        <!-- Quai giỏ mây vòng cung phía trên -->
        <path d="M25,115 Q110,-10 195,115" stroke="#BC6C25" stroke-width="7" fill="none"/>
        <path d="M25,115 Q110,-10 195,115" stroke="#2C2016" stroke-width="3.5" fill="none"/>
        <!-- Những quả dâu tây đỏ mọng chất đầy giỏ -->
        <!-- Dâu 1 (trái) -->
        <path d="M50,85 C45,65 85,65 80,85 C75,110 65,115 65,115 C65,115 55,110 50,85 Z" fill="#E63946" stroke="#2C2016" stroke-width="3"/>
        <path d="M60,70 Q65,78 65,70 Q70,78 75,70 Z" fill="#74C69D"/>
        <!-- Dâu 2 (ở giữa to nhất) -->
        <path d="M90,75 C85,50 135,50 130,75 C125,105 110,115 110,115 C110,115 95,105 90,75 Z" fill="#E63946" stroke="#2C2016" stroke-width="3.5"/>
        <path d="M100,58 Q110,68 110,58 Q120,68 120,58 Z" fill="#74C69D"/>
        <circle cx="102" cy="80" r="1.5" fill="#FFE599"/>
        <circle cx="118" cy="80" r="1.5" fill="#FFE599"/>
        <circle cx="110" cy="95" r="1.5" fill="#FFE599"/>
        <!-- Dâu 3 (phải) -->
        <path d="M140,85 C135,65 175,65 170,85 C165,110 155,115 155,115 C155,115 145,110 140,85 Z" fill="#E63946" stroke="#2C2016" stroke-width="3"/>
        <path d="M150,70 Q155,78 155,70 Q160,78 165,70 Z" fill="#74C69D"/>
      </g>`,
    `<!-- Hũ mứt dâu tây nắp vải hoa buộc dây gai và dâu rụng trên bàn -->
      <g transform="translate(340, 240)">
        <rect x="10" y="20" width="38" height="35" rx="6" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <ellipse cx="29" cy="20" rx="22" ry="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="2"/>
      </g>
      <circle cx="120" cy="285" r="8" fill="#E63946" stroke="#2C2016" stroke-width="2"/>`
  ),
  "fruit-apple-orchard-ladder": makeScene(
    "fruitappleorchardladder",
    "Thang Gỗ Trong Vườn Táo Chín Vàng",
    "🍎",
    "#E63946",
    ["#E0F2FE","#FFF1C5","#95D5B2"],
    `<!-- Bầu trời vườn táo trong vắt ngày thu hoạch -->
      <circle cx="390" cy="60" r="32" fill="#FFE599" opacity="0.8"/>`,
    `<!-- Bãi cỏ xanh mướt dưới tán cây táo xum xuê -->
      <rect x="8" y="230" width="484" height="137" fill="#74C69D" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây táo trĩu quả chín đỏ và chiếc thang gỗ tựa cành hái táo -->
      <g transform="translate(130, 45)">
        <!-- Tán cây táo xum xuê trĩu quả -->
        <circle cx="120" cy="70" r="75" fill="#52B788" stroke="#2C2016" stroke-width="4.5"/>
        <rect x="105" y="140" width="30" height="85" fill="#8B5A2B" stroke="#2C2016" stroke-width="4"/>
        <!-- Những quả táo đỏ chín mọng treo lủng lẳng -->
        <circle cx="75" cy="50" r="14" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="120" cy="35" r="14" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="165" cy="55" r="14" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="100" cy="95" r="14" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="145" cy="90" r="14" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Chiếc thang gỗ tựa nghiêng vào cành cây -->
        <line x1="50" y1="60" x2="30" y2="215" stroke="#BC6C25" stroke-width="6"/>
        <line x1="50" y1="60" x2="30" y2="215" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="75" y1="60" x2="55" y2="215" stroke="#BC6C25" stroke-width="6"/>
        <line x1="75" y1="60" x2="55" y2="215" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Các bậc thang ngang -->
        <line x1="47" y1="90" x2="72" y2="90" stroke="#2C2016" stroke-width="3"/>
        <line x1="42" y1="130" x2="67" y2="130" stroke="#2C2016" stroke-width="3"/>
        <line x1="37" y1="170" x2="62" y2="170" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Thùng gỗ tròn đựng đầy táo chín dưới gốc -->
      <g transform="translate(290, 250)">
        <rect x="10" y="15" width="55" height="35" rx="6" fill="#8B5A2B" stroke="#2C2016" stroke-width="3"/>
        <circle cx="25" cy="12" r="10" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
        <circle cx="45" cy="10" r="10" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "fruit-lemon-grove-italy": makeScene(
    "fruitlemongroveitaly",
    "Vườn Chanh Vàng Bờ Biển Amalfi",
    "🍋",
    "#FFE599",
    ["#0077B6","#90E0EF","#CAF0F8"],
    `<!-- Vịnh biển Địa Trung Hải xanh ngọc và nắng vàng Địa Trung Hải -->
      <circle cx="390" cy="70" r="35" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Ban công đá vôi Amalfi nhìn xuống biển xanh ngắt -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <line x1="8" y1="240" x2="492" y2="240" stroke="#2C2016" stroke-width="4"/>`,
    `<!-- Cành chanh vàng quả mọng nước lá xanh và bình nước chanh mát lạnh -->
      <g transform="translate(130, 95)">
        <!-- Cành chanh trĩu 3 quả chanh vàng tươi -->
        <path d="M20,30 Q90,50 150,30" stroke="#8B5A2B" stroke-width="5" fill="none"/>
        <!-- Quả chanh 1 -->
        <ellipse cx="55" cy="65" rx="22" ry="16" fill="#FFE599" stroke="#2C2016" stroke-width="3" transform="rotate(30, 55, 65)"/>
        <!-- Quả chanh 2 (ở giữa) -->
        <ellipse cx="105" cy="75" rx="25" ry="18" fill="#FFE599" stroke="#2C2016" stroke-width="3" transform="rotate(-15, 105, 75)"/>
        <!-- Quả chanh 3 -->
        <ellipse cx="155" cy="60" rx="22" ry="16" fill="#FFE599" stroke="#2C2016" stroke-width="3" transform="rotate(20, 155, 60)"/>
        <!-- Bình thủy tinh đựng nước chanh đá và lá bạc hà -->
        <g transform="translate(160, 45)">
          <path d="M15,40 L60,40 L55,95 L20,95 Z" fill="#E0F2FE" stroke="#2C2016" stroke-width="3.5" opacity="0.9"/>
          <ellipse cx="37" cy="40" rx="22" ry="8" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
          <circle cx="37" cy="70" r="10" fill="#FFE599"/>
        </g>
      </g>`,
    `<!-- Lát chanh vàng cắt đôi lộ múi mọng nước -->
      <g transform="translate(100, 260)">
        <circle cx="20" cy="20" r="18" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
        <circle cx="20" cy="20" r="13" fill="#FFFDF9"/>
        <line x1="20" y1="7" x2="20" y2="33" stroke="#FFE599" stroke-width="2"/>
        <line x1="7" y1="20" x2="33" y2="20" stroke="#FFE599" stroke-width="2"/>
      </g>`
  ),
  "fruit-honey-peach-blossom": makeScene(
    "fruithoneypeachblossom",
    "Trái Đào Tiên Má Hồng Cành Cong",
    "🍑",
    "#F4ACB7",
    ["#FFF0F5","#FFCCD5","#FFE5D9"],
    `<!-- Nắng xuân dịu ngọt chiếu qua vườn đào nở rộ -->
      <circle cx="80" cy="60" r="30" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Bàn gốm sân vườn uống trà ngắm hoa đào -->
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="170" ry="40" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Trái đào tiên má hồng mọng nước gắn trên cành hoa đào khoe sắc -->
      <g transform="translate(160, 95)">
        <!-- Cành đào nâu uốn lượn phong trần -->
        <path d="M10,80 Q70,40 160,60" stroke="#8B5A2B" stroke-width="5" fill="none"/>
        <!-- Trái đào tiên to tròn núng nính phớt hồng -->
        <path d="M55,90 C35,60 85,45 95,75 C105,45 155,60 135,90 C115,130 95,135 95,135 C95,135 75,130 55,90 Z" fill="#FFE5D9" stroke="#2C2016" stroke-width="4"/>
        <path d="M95,75 Q95,115 95,130" stroke="#F4ACB7" stroke-width="3" fill="none"/>
        <!-- Má hồng đào loang màu mềm mại -->
        <ellipse cx="75" cy="95" rx="15" ry="18" fill="#FFCAD4" opacity="0.7"/>
        <ellipse cx="115" cy="95" rx="15" ry="18" fill="#FFCAD4" opacity="0.7"/>
        <!-- Bông hoa đào 5 cánh hồng tươi trên cành -->
        <circle cx="40" cy="65" r="14" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>
        <circle cx="40" cy="65" r="5" fill="#FFE599"/>
        <circle cx="150" cy="55" r="14" fill="#F4ACB7" stroke="#2C2016" stroke-width="2"/>
        <circle cx="150" cy="55" r="5" fill="#FFE599"/>
      </g>`,
    `<!-- Chén trà đào mật ong sóng sánh bốc khói -->
      <g transform="translate(100, 260)">
        <ellipse cx="25" cy="15" rx="20" ry="10" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "fruit-pumpkin-patch-autumn": makeScene(
    "fruitpumpkinpatchautumn",
    "Vườn Bí Ngô Cam Rực Sắc Thu",
    "🎃",
    "#E76F51",
    ["#E76F51","#F4A261","#DDA15E"],
    `<!-- Hoàng hôn rực rỡ trên cánh đồng mùa thu hoạch -->
      <circle cx="120" cy="80" r="40" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Ruộng bí ngô đất nâu màu mỡ rải rác rơm vàng -->
      <rect x="8" y="220" width="484" height="147" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,240 Q250,225 492,240" stroke="#BC6C25" stroke-width="5" fill="none"/>`,
    `<!-- Bộ ba quả bí ngô cam khổng lồ nhiều múi tròn căng mọng và bù nhìn rơm -->
      <g transform="translate(140, 110)">
        <!-- Quả bí ngô to nhất ở giữa -->
        <ellipse cx="110" cy="95" rx="55" ry="42" fill="#E76F51" stroke="#2C2016" stroke-width="4.5"/>
        <ellipse cx="110" cy="95" rx="35" ry="42" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="110" cy="95" rx="16" ry="42" fill="#E76F51" stroke="#2C2016" stroke-width="3"/>
        <!-- Cuống bí ngô xanh xoắn ốc -->
        <path d="M110,55 Q105,35 120,30" stroke="#52B788" stroke-width="8" fill="none" stroke-linecap="round"/>
        <path d="M110,55 Q105,35 120,30" stroke="#2C2016" stroke-width="3" fill="none" stroke-linecap="round"/>
        <!-- Quả bí ngô nhỏ bên trái -->
        <ellipse cx="50" cy="115" rx="35" ry="28" fill="#F4A261" stroke="#2C2016" stroke-width="3.5"/>
        <!-- Quả bí ngô trắng (Ghost pumpkin) bên phải -->
        <ellipse cx="170" cy="115" rx="32" ry="26" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Dây bí ngô xoắn lò xo và lá bí xanh hình chân vịt -->
      <path d="M90,270 Q130,290 180,260" stroke="#52B788" stroke-width="4" fill="none"/>`
  ),
  "fruit-grape-vineyard-sunset": makeScene(
    "fruitgrapevineyardsunset",
    "Chùm Nho Mọng Nước Trong Hoàng Hôn",
    "🍇",
    "#7B2CBF",
    ["#E76F51","#7B2CBF","#240046"],
    `<!-- Hoàng hôn đồi nho nước Ý lãng mạn -->
      <circle cx="390" cy="80" r="45" fill="#FFE599" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Thùng rượu gỗ sồi trên sân thượng ngắm đồi nho -->
      <rect x="8" y="240" width="484" height="127" fill="#6F4E37" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="285" rx="170" ry="38" fill="#DDBEA9" stroke="#2C2016" stroke-width="3"/>`,
    `<!-- Chùm nho tím căng mọng nước lá nho răng cưa uốn lượn -->
      <g transform="translate(170, 85)">
        <!-- Cuống chùm nho nâu gỗ -->
        <path d="M80,30 Q60,10 70,-5" stroke="#8B5A2B" stroke-width="6" fill="none"/>
        <!-- Chiếc lá nho răng cưa xanh lục -->
        <polygon points="50,25 30,10 45,-10 70,-5 80,15" fill="#52B788" stroke="#2C2016" stroke-width="3"/>
        <!-- Từng quả nho tím xếp lớp thành chùm hình nón ngược -->
        <circle cx="65" cy="50" r="14" fill="#7B2CBF" stroke="#2C2016" stroke-width="3"/>
        <circle cx="95" cy="50" r="14" fill="#9D4EDD" stroke="#2C2016" stroke-width="3"/>
        <circle cx="50" cy="72" r="14" fill="#5A189A" stroke="#2C2016" stroke-width="3"/>
        <circle cx="80" cy="72" r="14" fill="#7B2CBF" stroke="#2C2016" stroke-width="3"/>
        <circle cx="110" cy="72" r="14" fill="#5A189A" stroke="#2C2016" stroke-width="3"/>
        <circle cx="65" cy="95" r="14" fill="#7B2CBF" stroke="#2C2016" stroke-width="3"/>
        <circle cx="95" cy="95" r="14" fill="#9D4EDD" stroke="#2C2016" stroke-width="3"/>
        <circle cx="80" cy="118" r="14" fill="#5A189A" stroke="#2C2016" stroke-width="3"/>
        <!-- Đốm sáng phản quang bóng bẩy trên quả nho -->
        <circle cx="77" cy="46" r="3" fill="#FFFDF9"/>
        <circle cx="62" cy="68" r="3" fill="#FFFDF9"/>
        <circle cx="92" cy="91" r="3" fill="#FFFDF9"/>
      </g>`,
    `<!-- Ly rượu vang pha lê óng ánh sắc tím hồng -->
      <g transform="translate(100, 250)">
        <polygon points="15,10 35,10 30,35 20,35" fill="#7B2CBF" stroke="#2C2016" stroke-width="2"/>
        <line x1="25" y1="35" x2="25" y2="50" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "zen-white-lotus-pond": makeScene(
    "zenwhitelotuspond",
    "Hoa Sen Trắng Nở Giữa Hồ Tĩnh Lặng",
    "🪷",
    "#E0F2FE",
    ["#E8F8F5","#D8F3DC","#BDE0FE"],
    `<!-- Mặt hồ phẳng lặng tĩnh tại buổi sớm mai -->
      <circle cx="390" cy="70" r="30" fill="#FFF1C5" opacity="0.6"/>`,
    `<!-- Hồ sen thanh tịnh với những phiến đá cuội thiền -->
      <rect x="8" y="190" width="484" height="177" fill="#83C5BE" stroke="#2C2016" stroke-width="3.5"/>
      <!-- Lá sen tròn bản to nổi bập bềnh -->
      <ellipse cx="100" cy="270" rx="65" ry="25" fill="#52B788" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="400" cy="275" rx="70" ry="28" fill="#52B788" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Đóa hoa sen trắng muốt nở bung nhụy vàng và đôi cá koi bơi lội -->
      <g transform="translate(160, 110)">
        <!-- Đóa sen trắng nở 8 cánh tinh khôi -->
        <ellipse cx="90" cy="85" rx="60" ry="25" fill="#FFFDF9" stroke="#2C2016" stroke-width="4"/>
        <path d="M40,75 C30,45 80,25 90,5 C100,25 150,45 140,75 Z" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>
        <circle cx="90" cy="65" r="14" fill="#FFE599" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Chú cá Koi đỏ trắng bơi vòng quanh dưới nước -->
        <g transform="translate(15, 110)">
          <path d="M10,20 Q60,5 90,25 Q50,45 10,20 Z" fill="#E63946" stroke="#2C2016" stroke-width="3"/>
          <ellipse cx="60" cy="20" rx="12" ry="8" fill="#FFFDF9"/>
        </g>
      </g>`,
    `<!-- Vòng sóng nước đồng tâm nhẹ buông -->
      <ellipse cx="250" cy="305" rx="55" ry="16" fill="none" stroke="#FFFDF9" stroke-width="2"/>`
  ),
  "zen-rock-garden-sand": makeScene(
    "zenrockgardensand",
    "Vườn Sỏi Trắng Cào Sóng Nước",
    "🪨",
    "#DDBEA9",
    ["#EBDDD4","#DDBEA9","#BC6C25"],
    `<!-- Khung cảnh vườn thiền Karesansui tĩnh mịch an yên -->
      <line x1="8" y1="120" x2="492" y2="120" stroke="#2C2016" stroke-width="3" opacity="0.4"/>`,
    `<!-- Bãi sỏi trắng được cào thành các đường gợn sóng nước thiền -->
      <rect x="8" y="200" width="484" height="167" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <path d="M8,230 Q250,210 492,230" stroke="#DDBEA9" stroke-width="4" fill="none"/>
      <path d="M8,260 Q250,240 492,260" stroke="#DDBEA9" stroke-width="4" fill="none"/>
      <path d="M8,290 Q250,270 492,290" stroke="#DDBEA9" stroke-width="4" fill="none"/>
      <path d="M8,320 Q250,300 492,320" stroke="#DDBEA9" stroke-width="4" fill="none"/>`,
    `<!-- Cụm đá thiền xếp tầng hài hòa và thảm rêu xanh bao quanh -->
      <g transform="translate(160, 110)">
        <!-- Đảo rêu xanh bao bọc chân đá -->
        <ellipse cx="90" cy="100" rx="85" ry="32" fill="#52B788" stroke="#2C2016" stroke-width="4"/>
        <!-- Hòn đá thiền lớn trung tâm đứng vững chãi -->
        <path d="M60,95 L75,25 L115,25 L130,95 Z" fill="#6C757D" stroke="#2C2016" stroke-width="4.5"/>
        <!-- Hai hòn đá nhỏ hai bên cân bằng âm dương -->
        <ellipse cx="45" cy="85" rx="24" ry="18" fill="#495057" stroke="#2C2016" stroke-width="3.5"/>
        <ellipse cx="145" cy="90" rx="20" ry="15" fill="#495057" stroke="#2C2016" stroke-width="3.5"/>
      </g>`,
    `<!-- Chiếc cào gỗ cào sỏi nghỉ ngơi trên bờ cát -->
      <g transform="translate(340, 260)">
        <line x1="10" y1="40" x2="60" y2="10" stroke="#8B5A2B" stroke-width="4"/>
      </g>`
  ),
  "zen-bamboo-water-fountain": makeScene(
    "zenbamboowaterfountain",
    "Máng Nước Tre Thơ Thẩn Vườn Xanh",
    "🎋",
    "#52B788",
    ["#E8F8F5","#D8F3DC","#95D5B2"],
    `<!-- Rừng trúc thanh mát tiếng chim ca líu lo -->
      <line x1="60" y1="8" x2="60" y2="240" stroke="#74C69D" stroke-width="8"/>
      <line x1="420" y1="8" x2="420" y2="240" stroke="#74C69D" stroke-width="8"/>`,
    `<!-- Góc vườn đá rêu phong rợp bóng trúc -->
      <rect x="8" y="240" width="484" height="127" fill="#2D6A4F" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Máng nước tre Shishi-odoshi gõ nhịp lách cách vào bồn đá chứa nước -->
      <g transform="translate(150, 95)">
        <!-- Bồn chứa nước bằng đá cuội tự nhiên (Tsukubai) -->
        <ellipse cx="100" cy="140" rx="75" ry="30" fill="#6C757D" stroke="#2C2016" stroke-width="4.5"/>
        <ellipse cx="100" cy="135" rx="55" ry="18" fill="#BDE0FE" stroke="#2C2016" stroke-width="3"/>
        <!-- Ống tre nghiêng rót nước trong vắt -->
        <line x1="20" y1="60" x2="90" y2="110" stroke="#74C69D" stroke-width="14" stroke-linecap="round"/>
        <line x1="20" y1="60" x2="90" y2="110" stroke="#2C2016" stroke-width="3.5" stroke-linecap="round"/>
        <!-- Tia nước trong chảy xuống bồn đá -->
        <line x1="90" y1="110" x2="95" y2="135" stroke="#FFFDF9" stroke-width="4"/>
      </g>`,
    `<!-- Gáo múc nước bằng tre cán dài gác ngang mép đá -->
      <g transform="translate(260, 240)">
        <line x1="10" y1="35" x2="55" y2="10" stroke="#8B5A2B" stroke-width="3"/>
        <rect x="50" y="5" width="18" height="14" rx="3" fill="#DDBEA9" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "zen-wind-chime-porch": makeScene(
    "zenwindchimeporch",
    "Chuông Gió Thủy Tinh Khẽ Đung Đưa",
    "🎐",
    "#A2D2FF",
    ["#E0F2FE","#BDE0FE","#FFF1C5"],
    `<!-- Gió hè thổi qua mang theo mây trôi thanh thản -->
      <circle cx="100" cy="70" r="30" fill="#FFF1C5" opacity="0.7"/>`,
    `<!-- Mái hiên gỗ truyền thống Nhật Bản buông rủ -->
      <rect x="8" y="8" width="484" height="60" fill="#8B5A2B" stroke="#2C2016" stroke-width="4"/>
      <rect x="8" y="240" width="484" height="127" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Chiếc chuông gió thủy tinh Furin vẽ sóng nước đung đưa dải giấy thơ -->
      <g transform="translate(190, 55)">
        <line x1="60" y1="10" x2="60" y2="60" stroke="#2C2016" stroke-width="2.5"/>
        <!-- Chuông thủy tinh tròn trong suốt vẽ sóng xanh -->
        <circle cx="60" cy="75" r="32" fill="#E0F2FE" stroke="#2C2016" stroke-width="4" opacity="0.9"/>
        <path d="M40,80 Q60,70 80,80" stroke="#0077B6" stroke-width="3" fill="none"/>
        <!-- Dải giấy Tanzaku bay phấp phới trong gió hạ mang lời chúc an lành -->
        <line x1="60" y1="105" x2="60" y2="125" stroke="#2C2016" stroke-width="2"/>
        <rect x="48" y="125" width="24" height="65" rx="4" fill="#FFFDF9" stroke="#2C2016" stroke-width="2.5"/>
        <line x1="56" y1="135" x2="64" y2="135" stroke="#E63946" stroke-width="2"/>
      </g>`,
    `<!-- Đĩa dưa hấu mát lạnh đặt trên sàn hiên ngắm gió -->
      <g transform="translate(100, 260)">
        <path d="M10,35 Q30,10 50,35 Z" fill="#E63946" stroke="#2C2016" stroke-width="2.5"/>
        <path d="M10,35 Q30,42 50,35" fill="#52B788" stroke="#2C2016" stroke-width="2.5"/>
      </g>`
  ),
  "zen-bonsai-ceramic-pot": makeScene(
    "zenbonsaiceramicpot",
    "Cây Tùng Bonsai Dáng Rồng Thế Núi",
    "🪴",
    "#2D6A4F",
    ["#EBDDD4","#DDBEA9","#BC6C25"],
    `<!-- Phòng trà thiền định tối giản với tranh thủy mặc mờ ảo -->
      <circle cx="120" cy="60" r="3" fill="#DDBEA9"/>`,
    `<!-- Kệ gỗ mun trưng bày cây cảnh quý phái -->
      <rect x="8" y="240" width="484" height="127" fill="#2C2016" stroke="#2C2016" stroke-width="3.5"/>
      <rect x="60" y="225" width="380" height="20" rx="6" fill="#8B5A2B" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Cây tùng bonsai thế rồng uyển chuyển trong chậu gốm cổ màu lam -->
      <g transform="translate(140, 80)">
        <!-- Chậu gốm hình chữ nhật men lam cổ kính -->
        <rect x="35" y="125" width="150" height="35" rx="6" fill="#457B9D" stroke="#2C2016" stroke-width="4"/>
        <rect x="45" y="160" width="18" height="10" fill="#2C2016"/>
        <rect x="157" y="160" width="18" height="10" fill="#2C2016"/>
        <!-- Thân cây tùng xoắn khúc khuỷu hình dáng rồng bay -->
        <path d="M110,125 C100,80 50,70 65,30 C75,5 110,15 135,10" stroke="#6F4E37" stroke-width="12" fill="none" stroke-linecap="round"/>
        <path d="M110,125 C100,80 50,70 65,30 C75,5 110,15 135,10" stroke="#2C2016" stroke-width="4" fill="none" stroke-linecap="round"/>
        <!-- Từng tán lá kim hình mây xanh thẫm bồng bềnh -->
        <ellipse cx="60" cy="25" rx="28" ry="14" fill="#2D6A4F" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="140" cy="15" rx="35" ry="16" fill="#2D6A4F" stroke="#2C2016" stroke-width="3"/>
        <ellipse cx="100" cy="55" rx="28" ry="14" fill="#1B4332" stroke="#2C2016" stroke-width="3"/>
      </g>`,
    `<!-- Tượng chú tiểu gốm mini chắp tay niệm Phật bên gốc bonsai -->
      <g transform="translate(340, 240)">
        <circle cx="20" cy="15" r="10" fill="#EBDDD4" stroke="#2C2016" stroke-width="2"/>
        <rect x="12" y="24" width="16" height="20" rx="4" fill="#E63946" stroke="#2C2016" stroke-width="2"/>
      </g>`
  ),
  "zen-meditation-candle": makeScene(
    "zenmeditationcandle",
    "Nến Thơm Tinh Dầu & Khói Trầm Dịu",
    "🕯️",
    "#F4A261",
    ["#14213D","#2B2D42","#4A4E69"],
    `<!-- Ánh sáng êm dịu thanh tịnh không gian thiền định -->
      <circle cx="100" cy="50" r="3" fill="#FFE599"/>`,
    `<!-- Bàn thiền gỗ phủ vải lanh mộc mạc -->
      <rect x="8" y="220" width="484" height="147" fill="#EBDDD4" stroke="#2C2016" stroke-width="3.5"/>
      <ellipse cx="250" cy="275" rx="180" ry="42" fill="#FFFDF9" stroke="#2C2016" stroke-width="3.5"/>`,
    `<!-- Ngọn nến thơm đậu nành bập bùng ngọn lửa ấm và làn khói trầm uốn lượn -->
      <g transform="translate(170, 95)">
        <!-- Cốc nến thủy tinh mờ màu hổ phách -->
        <rect x="40" y="55" width="80" height="90" rx="10" fill="#E76F51" stroke="#2C2016" stroke-width="4.5"/>
        <ellipse cx="80" cy="55" rx="40" ry="12" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <!-- Ngọn lửa nến ấm áp lung linh -->
        <path d="M80,45 C70,30 72,15 80,-5 C88,15 90,30 80,45 Z" fill="#FFE599" stroke="#2C2016" stroke-width="3"/>
        <path d="M80,40 C75,30 76,20 80,10 C84,20 85,30 80,40 Z" fill="#F4A261"/>
        <!-- Vòng khói trầm hương uốn lượn bay bổng -->
        <path d="M80,-10 Q60,-35 85,-60 Q105,-80 80,-100" stroke="#DDBEA9" stroke-width="3.5" fill="none" stroke-linecap="round" opacity="0.75"/>
      </g>`,
    `<!-- Chuỗi vòng hạt bồ đề 108 hạt và đá thạch anh trắng -->
      <g transform="translate(110, 260)">
        <circle cx="20" cy="15" r="5" fill="#8B5A2B" stroke="#2C2016" stroke-width="1.5"/>
        <circle cx="32" cy="18" r="5" fill="#8B5A2B" stroke="#2C2016" stroke-width="1.5"/>
        <circle cx="44" cy="20" r="5" fill="#8B5A2B" stroke="#2C2016" stroke-width="1.5"/>
      </g>`
  ),
};
