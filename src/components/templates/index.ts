import Card1 from './cards/Simple/Card1';
import Card2 from './cards/Simple/Card2';
import Card3 from './cards/Simple/Card3';
import Card4 from './cards/Simple/Card4';
import Card1High from './cards/High/Card1';
import { Card1 as High1, Card2 as High2, Card3 as High3, Card4 as High4 } from './cards/High/Cards';
import { Card1 as Elite1, Card2 as Elite2, Card3 as Elite3, Card4 as Elite4 } from './cards/3d/Cards';

export const templates: Record<string, React.FC<{ data: any }>> = {
  // Simple (Free) Tier
  'free-simple': Card1, // Light Designer
  'lay-2': Card2,        // Light Emerald
  'lay-3': Card3,        // Dark Cyber
  'lay-4': Card4,        // Dark Obsidian

  // High (Premium) Tier
  'premium-high-1': Card1High,
  'lay-prem-1': High1,
  'lay-prem-2': High2,
  'lay-prem-3': High3,
  'lay-prem-4': High4,

  // 3D (Elite) Tier
  'lay-elite-1': Elite1,
  'lay-elite-2': Elite2,
  'lay-elite-3': Elite3,
  'lay-elite-4': Elite4,
};

export type TemplateId = keyof typeof templates;
