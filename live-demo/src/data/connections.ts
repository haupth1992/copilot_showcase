import type { LocationConnection } from '@/types/travel'

export const CONNECTIONS: LocationConnection[] = [
  // From Hobbiton
  { from: 'hobbiton', to: 'bree', distance: 130, terrain: 'Road', baseDangerLevel: 10, bidirectional: true },

  // From Bree
  { from: 'bree', to: 'rivendell', distance: 180, terrain: 'Road', baseDangerLevel: 25, bidirectional: true },
  { from: 'bree', to: 'moria', distance: 240, terrain: 'Mountain', baseDangerLevel: 60, bidirectional: true },

  // From Rivendell
  { from: 'rivendell', to: 'lothlorien', distance: 200, terrain: 'Forest', baseDangerLevel: 40, bidirectional: true },
  { from: 'rivendell', to: 'moria', distance: 90, terrain: 'Mountain', baseDangerLevel: 50, bidirectional: true },

  // From Moria
  { from: 'moria', to: 'lothlorien', distance: 110, terrain: 'Underground', baseDangerLevel: 75, bidirectional: true },
  { from: 'moria', to: 'rohan-edoras', distance: 280, terrain: 'Plains', baseDangerLevel: 35, bidirectional: true },

  // From Lothlórien
  { from: 'lothlorien', to: 'rohan-edoras', distance: 170, terrain: 'Plains', baseDangerLevel: 30, bidirectional: true },
  { from: 'lothlorien', to: 'minas-tirith', distance: 320, terrain: 'River', baseDangerLevel: 45, bidirectional: true },

  // From Rohan (Edoras)
  { from: 'rohan-edoras', to: 'helms-deep', distance: 55, terrain: 'Plains', baseDangerLevel: 15, bidirectional: true },
  { from: 'rohan-edoras', to: 'minas-tirith', distance: 160, terrain: 'Road', baseDangerLevel: 20, bidirectional: true },

  // From Helm's Deep
  { from: 'helms-deep', to: 'minas-tirith', distance: 210, terrain: 'Mountain', baseDangerLevel: 25, bidirectional: true },

  // From Minas Tirith
  { from: 'minas-tirith', to: 'osgiliath', distance: 35, terrain: 'Road', baseDangerLevel: 40, bidirectional: true },
  { from: 'minas-tirith', to: 'mount-doom', distance: 220, terrain: 'Plains', baseDangerLevel: 85, bidirectional: true },

  // From Osgiliath
  { from: 'osgiliath', to: 'mount-doom', distance: 190, terrain: 'Plains', baseDangerLevel: 90, bidirectional: true },

  // Direct dangerous routes (optional shortcuts)
  { from: 'bree', to: 'rohan-edoras', distance: 420, terrain: 'Plains', baseDangerLevel: 50, bidirectional: true },
  { from: 'rivendell', to: 'helms-deep', distance: 350, terrain: 'Mountain', baseDangerLevel: 55, bidirectional: true },
]
